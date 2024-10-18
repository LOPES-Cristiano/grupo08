# Aplicação Web: Sistema de Compartilhamento de Arquivos

## 1. Visão Geral
O Sistema de Compartilhamento de Arquivos é uma aplicação web que tem como objetivo permitir aos usuários realizar operações relacionadas ao gerenciamento de arquivos, como cadastramento de usuários, upload, download e compartilhamento de arquivos por meio de links gerados pelo sistema. A aplicação é desenvolvida com uma arquitetura frontend e backend integrada, visando oferecer uma experiência otimizada e segura para os usuários.

### 1.1. Funcionalidades Principais
- Cadastro de novos usuários.
- Login e autenticação de usuários.
- Upload de arquivos.
- Compartilhamento de arquivos por links únicos.
- Download e gerenciamento de arquivos enviados.

## 2. Requisitos Funcionais

### 2.1. Cadastro de Usuários
- O sistema deve permitir o cadastro de novos usuários com e-mail, nome de usuário e senha.
- O sistema deve validar o e-mail para garantir que seja único no banco de dados.
- A senha do usuário deve ser criptografada antes de ser armazenada no banco de dados.

### 2.2. Login e Autenticação de Usuários
- O sistema deve permitir que usuários façam login com e-mail e senha.
- A autenticação deve ser feita utilizando JSON Web Tokens (JWT).
- O sistema deve retornar mensagens de erro adequadas caso o login falhe (e.g., "E-mail ou senha incorretos").

### 2.3. Upload de Arquivos
- O usuário deve poder fazer upload de arquivos.
- O sistema deve suportar múltiplos tipos de arquivos (com extensões e tamanhos permitidos previamente definidos).
- O sistema deve renomear arquivos duplicados de forma automática, adicionando um número incremental.
- O arquivo deve ser armazenado na pasta específica do usuário.

### 2.4. Download de Arquivos
- O sistema deve permitir que o usuário baixe seus próprios arquivos.
- Links únicos devem ser gerados para que arquivos possam ser baixados por terceiros (somente para arquivos compartilhados).

### 2.5. Compartilhamento de Arquivos
- O sistema deve permitir que o usuário compartilhe arquivos através de um link único gerado pelo sistema.
- Esses links devem ser únicos e armazenados no banco de dados junto com a data de compartilhamento.

### 2.6. Gerenciamento de Conta
- O sistema deve permitir que o usuário atualize suas informações pessoais (nome, e-mail, senha).
- O sistema deve solicitar a senha atual antes de permitir alterações de senha.

### 2.7. Gerenciamento de Arquivos
- O usuário deve poder visualizar uma lista de seus arquivos enviados, incluindo nome, tamanho, data de envio e links de compartilhamento.
- O usuário deve poder excluir arquivos.

### 2.8. Logout
- O sistema deve permitir que o usuário faça logout, invalidando o token JWT.

## 3. Requisitos Não Funcionais

### 3.1. Segurança
- As senhas dos usuários devem ser armazenadas de forma segura utilizando hashing (e.g., bcrypt ou hashlib).
- Todas as rotas que lidam com dados sensíveis (cadastro, login, upload, download) devem usar HTTPS para garantir a criptografia dos dados.
- Tokens JWT devem ser utilizados para autenticar usuários, e esses tokens devem expirar após um período de inatividade.
- O sistema deve evitar vulnerabilidades comuns como SQL Injection, XSS e CSRF.

### 3.2. Desempenho
- O sistema deve ser capaz de processar uploads e downloads de arquivos de até 100 MB sem degradação significativa de performance.
- As respostas às requisições de API devem ser retornadas em menos de 1 segundo para operações simples (como login ou consulta de arquivos).
- O sistema deve ser escalável, permitindo adição de servidores ou armazenamento conforme o número de usuários crescer.

### 3.3. Usabilidade
- A interface deve ser amigável e fácil de usar, com layouts responsivos que funcionem em dispositivos móveis e desktops.
- O sistema deve oferecer feedback imediato ao usuário em ações como upload de arquivos, compartilhamento e login (e.g., usando pop-ups de sucesso ou erro).
- O processo de navegação entre telas e funcionalidades deve ser fluido, sem carregamentos excessivos.

### 3.4. Manutenibilidade
- O código do sistema deve ser modular, permitindo fácil atualização e correção de bugs.
- O sistema deve utilizar boas práticas de desenvolvimento (e.g., separação clara entre frontend e backend, uso de ORM como SQLAlchemy).
- Devem existir logs para auditoria e solução de problemas, registrando operações como login, upload e download de arquivos.

### 3.5. Escalabilidade
- O sistema deve ser projetado para suportar centenas de usuários simultâneos, com a capacidade de expansão para milhares de usuários.
- O armazenamento de arquivos deve ser flexível e escalável, usando estrutura de diretórios organizados por usuário.

### 3.6. Disponibilidade
- O sistema deve ser altamente disponível, com um tempo de inatividade (downtime) mínimo durante manutenções ou atualizações.
- Devem ser realizados backups automáticos periódicos do banco de dados e arquivos.

### 3.7. Compatibilidade
- O sistema deve funcionar corretamente nos principais navegadores modernos (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
- O layout e a responsividade devem ser compatíveis com telas de diferentes tamanhos, incluindo dispositivos móveis e tablets.

### 3.8. Experiência do Usuário (UX)
- A aplicação deve fornecer uma experiência de usuário rápida e sem complicações, com ações que requerem poucos cliques.
- Animações leves e transições suaves devem ser usadas para melhorar a interação com o sistema, sem comprometer o desempenho.

## 4. Tecnologias Utilizadas

### 4.1. Frontend
- **HTML**: Estrutura da página, com cabeçalhos, conteúdos principais e rodapés.
- **CSS**: Estilização e layout responsivo, utilizando Flexbox para organização.
- **Javascript**: Funcionalidades dinâmicas, como manipulação de DOM e carrossel de seções.

### 4.2. Backend
- **Flask**: Framework para o desenvolvimento de aplicações web utilizando a linguagem Python.
- **MySQL**: Banco de dados relacional para armazenamento de informações dos usuários e arquivos.
- **Hashlib**: Biblioteca utilizada para hashing de senhas, garantindo segurança dos dados dos usuários.
- **PyJWT**: Sistema de autenticação baseado em JSON Web Tokens (JWT) para gerenciar as sessões dos usuários.

### 4.3. Ferramentas e Bibliotecas Auxiliares
- **Google Fonts**: Para estilização tipográfica.
- **Flask-SQLAlchemy**: Mapeamento objeto-relacional (ORM) para o MySQL.
- **Flask-Uploads**: Gerenciamento e manipulação de arquivos enviados pelos usuários.
- **Flexbox**: Utilizado para o desenvolvimento de layouts flexíveis e responsivos.
- **Keyframes**: Animações aplicadas a botões para melhorar a experiência do usuário.

## 5. Funcionalidades de Backend

### 5.1. Banco de Dados MySQL
O sistema utiliza um banco de dados MySQL para armazenar informações relacionadas aos usuários e arquivos.

#### 5.1.1. Tabela de Usuários (Users)
- `id`: Identificador único do usuário (INT, AUTO_INCREMENT, PRIMARY KEY).
- `username`: Nome de usuário único (VARCHAR(150), UNIQUE, NOT NULL).
- `email`: Endereço de e-mail único do usuário (VARCHAR(150), UNIQUE, NOT NULL).
- `password`: Senha criptografada do usuário (VARCHAR(150), NOT NULL).

#### 5.1.2. Tabela de Arquivos (Files)
- `id`: Identificador único do arquivo (INT, AUTO_INCREMENT, PRIMARY KEY).
- `filename`: Nome do arquivo (VARCHAR(255), NOT NULL).
- `extension`: Extensão do arquivo (VARCHAR(10), NOT NULL).
- `size`: Tamanho do arquivo em bytes (INT, NOT NULL).
- `upload_date`: Data e hora do envio do arquivo (DATETIME, DEFAULT CURRENT_TIMESTAMP).
- `user_id`: Referência ao id do usuário que fez o upload (INT, FOREIGN KEY).
- `link_token`: Token único gerado para compartilhamento do arquivo (VARCHAR(255), UNIQUE, NULL).

#### 5.1.3. Tabela de Compartilhamentos (Shares)
- `id`: Identificador único do compartilhamento (INT, AUTO_INCREMENT, PRIMARY KEY).
- `arquivo_id`: Referência ao id do arquivo compartilhado (INT, FOREIGN KEY).
- `usuario_id`: Referência ao id do usuário que compartilhou o arquivo (INT, FOREIGN KEY).
- `link`: Link único gerado para o compartilhamento do arquivo (VARCHAR(255), UNIQUE).
- `data_compartilhamento`: Data e hora do compartilhamento (DATETIME, DEFAULT CURRENT_TIMESTAMP).

### 5.2. Funcionalidades de Conta
- **Cadastro de Usuários**: A rota `/cadastro` permite que novos usuários se registrem no sistema.
- **Login de Usuários**: A rota `/login` permite a autenticação de usuários existentes.
- **Upload e Download de Arquivos**: A rota `/upload` permite o envio de arquivos, e a rota `/download/<int:arquivo_id>` permite o download de arquivos.
- **Compartilhamento de Arquivos**: A rota `/api/gerar-link/<int:arquivo_id>` gera um link único para compartilhamento.

## 6. Considerações Finais
O sistema de compartilhamento de arquivos foi projetado com foco em segurança e performance, utilizando as melhores práticas de desenvolvimento para garantir uma experiência de usuário satisfatória e fluida. O uso de JWT, criptografia de senhas, links únicos para compartilhamento de arquivos e banco de dados escalável garantem uma plataforma robusta para o gerenciamento de arquivos pessoais.
