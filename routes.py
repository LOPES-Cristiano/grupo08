from flask import render_template, request, redirect, url_for, flash, session, jsonify, send_from_directory, send_file
from datetime import datetime
import os
from werkzeug.utils import secure_filename
import pytz
from models import User, File
from database import db
from itsdangerous import URLSafeTimedSerializer as Serializer, BadSignature
import mimetypes

def init_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/login', methods=['POST'])
    def login():
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email, password=password).first()

        if user:
            session['user_id'] = user.id
            session['username'] = user.username
            return jsonify({'success': True, 'message': 'Login bem-sucedido', 'redirect': url_for('home')})
        else:
            return jsonify({'success': False, 'message': 'E-mail ou senha inválidos.'})

    @app.route('/cadastro', methods=['POST'])
    def cadastro():
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'success': False, 'message': 'O e-mail já está cadastrado.'})

        if len(password) < 8:
            return jsonify({'success': False, 'message': 'A senha deve ter pelo menos 8 caracteres.'})

        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Cadastro realizado com sucesso!', 'redirect': url_for('index')})

    @app.route('/check_email', methods=['POST'])
    def check_email():
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()

        return jsonify({"exists": bool(user)})

    @app.route('/home')
    def home():
        if 'user_id' not in session:
            return redirect(url_for('index'))

        user = User.query.get(session['user_id'])
        files = File.query.filter_by(user_id=user.id).all()

        timezone = pytz.timezone('America/Sao_Paulo')
        for file in files:
            file.upload_date = file.upload_date.astimezone(timezone)

        return render_template('home.html', username=user.username, files=files)

    @app.route('/upload', methods=['POST'])
    def upload_file():
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])

        if 'user_id' not in session:
            return redirect(url_for('index'))

        if 'file' not in request.files:
            flash('Nenhum arquivo selecionado.')
            return redirect(request.url)

        files = request.files.getlist('file')  

        if not files or all(file.filename == '' for file in files):
            flash('Nenhum arquivo selecionado.')
            return redirect(request.url)

        user_folder = os.path.join(app.config['UPLOAD_FOLDER'], str(session['user_id']))
        if not os.path.exists(user_folder):
            os.makedirs(user_folder)

        timezone = pytz.timezone('America/Sao_Paulo')
        local_time = datetime.now(timezone)
        user = User.query.get(session['user_id'])

        for file in files:
            if file.filename == '':
                continue  

            if not allowed_file(file.filename):
                flash('Tipo de arquivo não permitido para: ' + file.filename)
                continue 

            filename = secure_filename(file.filename)
            file_path = os.path.join(user_folder, filename)
            base, extension = os.path.splitext(filename)
            counter = 1

            
            while os.path.exists(file_path):
                filename = f"{base}({counter}){extension}"
                file_path = os.path.join(user_folder, filename)
                counter += 1

            file.save(file_path)

            
            new_file = File(
                filename=filename,
                extension=extension[1:],
                size=os.path.getsize(file_path),
                user_id=user.id,
                upload_date=local_time
            )
            db.session.add(new_file)

        
        db.session.commit()

        flash('Arquivos enviados com sucesso!')
        return redirect(url_for('home'))

    @app.route('/api/deletar-arquivo/<int:arquivo_id>', methods=['DELETE'])
    def deletar_arquivo(arquivo_id):
        arquivo = File.query.get(arquivo_id)
        if arquivo:
            try:
               
                pasta_usuario = os.path.join(app.config['UPLOAD_FOLDER'], str(arquivo.user_id))
                caminho_arquivo = os.path.join(pasta_usuario, arquivo.filename)
  
                os.remove(caminho_arquivo)
                db.session.delete(arquivo)
                db.session.commit()

                return jsonify({'success': True, 'message': 'Arquivo excluído com sucesso.'})
            except Exception as e:
                return jsonify({'success': False, 'message': f'Erro ao excluir o arquivo: {str(e)}'})
        else:
            return jsonify({'success': False, 'message': 'Arquivo não encontrado.'})

    @app.route('/download/<int:arquivo_id>')
    def download_arquivo(arquivo_id):
        arquivo = File.query.get(arquivo_id)

        if arquivo:
            user_folder = os.path.join(app.config['UPLOAD_FOLDER'], str(arquivo.user_id))
            file_path = os.path.join(user_folder, arquivo.filename)

            if os.path.isfile(file_path):
                return send_from_directory(
                    directory=user_folder,
                    path=arquivo.filename,
                    as_attachment=True
                )
            else:
                return "Arquivo não encontrado no servidor", 404
        else:
            return "Arquivo não encontrado", 404
    
    @app.route('/atualizar-nome', methods=['POST'])
    def atualizar_nome():
        if 'user_id' not in session:
            return jsonify({'success': False, 'message': 'Usuário não está logado.'})

        data = request.get_json()
        nome = data.get('nome')
        user = User.query.get(session['user_id'])
        user.username = nome
        db.session.commit()

        session['username'] = nome

        return jsonify({'success': True})

    @app.route('/atualizar-email', methods=['POST'])
    def atualizar_email():
        if 'user_id' not in session:
            return jsonify({'success': False, 'message': 'Usuário não está logado.'})

        data = request.get_json()
        email = data.get('email')
        user = User.query.get(session['user_id'])
        user.email = email
        db.session.commit()

        return jsonify({'success': True})

    @app.route('/atualizar-senha', methods=['POST'])
    def atualizar_senha():
        if 'user_id' not in session:
            return jsonify({'success': False, 'message': 'Usuário não está logado.'})

        data = request.get_json()
        senha_atual = data.get('senhaAtual')
        nova_senha = data.get('novaSenha')
        user = User.query.get(session['user_id'])

        if user.password != senha_atual:
            return jsonify({'success': False, 'message': 'Senha atual incorreta.'})

        user.password = nova_senha
        db.session.commit()

        return jsonify({'success': True})

    @app.route('/obter-perfil')
    def obter_perfil():
        if 'user_id' not in session:
            return jsonify({'username': 'Não logado'})

        user = User.query.get(session['user_id'])
        return jsonify({'username': user.username})

    @app.route('/logout')
    def logout():
        session.pop('user_id', None)
        flash('Você foi deslogado com sucesso!')
        return redirect(url_for('index'))

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']
    
    @app.route('/abrir-arquivo/<int:arquivo_id>')
    def abrir_arquivo(arquivo_id):
       
        arquivo = File.query.get(arquivo_id)

        if arquivo:
            user_folder = os.path.join(app.config['UPLOAD_FOLDER'], str(arquivo.user_id))
            file_path = os.path.join(user_folder, arquivo.filename)

            if os.path.exists(file_path):
                mime_type, _ = mimetypes.guess_type(file_path)

                if mime_type:
                    
                    if mime_type.startswith('image/') or mime_type == 'application/pdf':
                        return send_file(file_path, mimetype=mime_type)  

                    
                    elif mime_type.startswith('text/'):
                        with open(file_path, 'r', encoding='utf-8') as file:
                            content = file.read()
                        return content  

                    
                    else:
                        return send_file(file_path, mimetype=mime_type)

                else:
                    return jsonify({'error': 'Tipo de arquivo não suportado.'}), 415

            else:
                return jsonify({'error': 'Arquivo não encontrado no servidor'}), 404
        else:
            return jsonify({'error': 'Arquivo não encontrado'}), 404



    @app.route('/api/gerar-link/<int:file_id>', methods=['POST'])
    def gerar_link(file_id):
        if 'user_id' not in session:
            return jsonify({'error': 'Usuário não autenticado'}), 401

        user_id = session['user_id']
        arquivo = File.query.filter_by(id=file_id, user_id=user_id).first()

        if not arquivo:
            return jsonify({'error': 'Arquivo não encontrado'}), 404

        s = Serializer(app.config['SECRET_KEY'])
        token = s.dumps({'file_id': arquivo.id})

        arquivo.link_token = token
        db.session.commit()

        link = f"{request.host_url}compartilhar/{token}"
        return jsonify({'link': link})    

    @app.route('/compartilhar/<token>', methods=['GET'])
    def compartilhar(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token, max_age=3600)
        except BadSignature:
            return "Link inválido ou expirado", 404

        file_id = data['file_id']
        arquivo = File.query.get(file_id)

        if not arquivo:
            return "Arquivo não encontrado", 404

        return send_from_directory(
            directory=os.path.join(app.config['UPLOAD_FOLDER'], str(arquivo.user_id)),
            path=arquivo.filename,
            as_attachment=True
        )

    @app.route('/api/arquivos')
    def get_arquivos():
        if 'user_id' not in session:
            return jsonify({'error': 'Usuário não autenticado'}), 401

        user_id = session['user_id']
        arquivos = File.query.filter_by(user_id=user_id).all()

        arquivos_list = [{
            'id': arquivo.id,
            'filename': arquivo.filename,
            'extension': arquivo.extension,
            'size': arquivo.size,
            'upload_date': arquivo.upload_date.strftime('%Y-%m-%d %H:%M:%S')
        } for arquivo in arquivos]

        return jsonify(arquivos_list)

    return app
