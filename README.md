Aplicação Web: Sistema de Compartilhamento de Arquivos

Visão Geral

O sistema de compartilhamento de arquivos é uma aplicação web que permite aos usuários se cadastrarem, fazerem o upload e o download de arquivos, além de compartilharem esses arquivos com outros usuários através de links gerados pelo sistema.

Tecnologias Utilizadas

Frontend

HTML: Estrutura da página, incluindo cabeçalho, conteúdo principal e rodapé.
CSS: Estilização e layout responsivo, usando Flexbox para organização.
JavaScript: Funcionalidades dinâmicas como o carrossel de seções.

Backend

Flask: Framework para desenvolvimento de aplicações web em Python.

MySQL: Banco de dados relacional para armazenar dados de usuários e arquivos.
Biblioteca hashlib: Utilizado para hashing de senhas e segurança.

PyJWT (JSON Web Tokens): Sistema de autenticação e autorização para gerenciar sessões de usuários.

Ferramentas e Bibliotecas

Google Fonts: Para estilização de texto.
Flexbox: Layout responsivo e flexível.
Keyframes: Animações de efeito de pulsação em botões.
Flask-SQLAlchemy: ORM para comunicação com o MySQL.
Flask-Uploads: Gerenciamento de upload de arquivos.

Funcionalidades de Backend

Banco de Dados MySQL

Estrutura das Tabelas:

Usuários:
id: INT, AUTO_INCREMENT, PRIMARY KEY
nome: VARCHAR(255)
email: VARCHAR(255), UNIQUE
senha: VARCHAR(255) (criptografada com Gunicorn)

Arquivos:
id: INT, AUTO_INCREMENT, PRIMARY KEY
nome: VARCHAR(255)
tipo: VARCHAR(50)
caminho: VARCHAR(255)
usuario_id: INT, FOREIGN KEY (referência ao id de Usuários)

Compartilhamentos:
id: INT, AUTO_INCREMENT, PRIMARY KEY
arquivo_id: INT, FOREIGN KEY (referência ao id de Arquivos)
usuario_id: INT, FOREIGN KEY (referência ao id de Usuários)
link: VARCHAR(255)
data_compartilhamento: DATETIME
Conexão com o MySQL
Utilizar Flask-SQLAlchemy para gerenciar a conexão ao banco de dados MySQL. 

Autenticação e Autorização

Cadastro de Usuário:
Rota para registro de novos usuários.
Senha criptografada usando a biblioteca hashlib.
JWT (JSON Web Tokens): Sistema de autenticação e autorização para gerenciar sessões de usuários, usando biblioteca PyJWT.
Login de Usuário:
Rota para autenticação e geração de JWT para sessões.

Gerenciamento de Arquivos

Upload de Arquivos: Utilizar Flask-Uploads para gerenciar uploads de arquivos.

Download de Arquivos: Rota para servir arquivos armazenados no servidor.

Compartilhamento de Arquivos: Geração de links para compartilhamento e armazenamento no banco de dados.

Notas
O design é responsivo e adaptável a dispositivos móveis e desktops.
