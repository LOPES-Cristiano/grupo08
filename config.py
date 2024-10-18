from flask import Flask, current_app

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'sua_chave_secreta'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://usuario:senha@localhost/databasename?charset=utf8'
    app.config['UPLOAD_FOLDER'] = 'upload/'
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.config['ALLOWED_EXTENSIONS'] = {
        'txt', 'sql', 'html', 'xml', 'css', 'py', 'js', 'pdf', 
        'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx', 'xls', 'xlsx', 
        'csv', 'ppt', 'pptx', 'zip', 'rar', 'mp3', 'wav', 
        'aac', 'ogg', 'flac', 'mp4', 'avi', 'mov', 'mkv', 
        'webm', 'flv', 'wmv', 'exe', 'cfg', 'ini', 'jar',
    }
    app.config['ALLOWED_OPEN_EXTENSIONS'] = {
        'txt', 'sql', 'html', 'xml', 'css', 'py', 'js', 'pdf', 
        'png', 'jpg', 'jpeg', 'gif', 'csv', 'mp3', 'wav', 
        'aac', 'ogg', 'flac', 'mp4', 'avi', 'mov', 'mkv', 
        'webm', 'flv', 'wmv', 'cfg', 'ini', 'jar', 
    }
    return app

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']
