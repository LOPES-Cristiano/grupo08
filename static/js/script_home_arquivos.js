
function scriptHomeArquivos(conteudo) {
    console.log("Executando scriptHomeArquivos");
    conteudo.innerHTML = `
        <button id="toggle-view" data-view="grid" title="Alternar visualização">Alternar Visualização</button>
        <div class="arquivos view-grid"></div>
    `;
    console.log("HTML injetado no container", conteudo);

    document.getElementById('toggle-view').addEventListener('click', function() {
        const arquivosContainer = document.querySelector('.arquivos');
        const currentView = this.getAttribute('data-view');
        if (currentView === 'grid') {
            arquivosContainer.classList.remove('view-grid');
            arquivosContainer.classList.add('view-list');
            this.setAttribute('data-view', 'list');
            this.textContent = 'Exibir em Grade';
        } else {
            arquivosContainer.classList.remove('view-list');
            arquivosContainer.classList.add('view-grid');
            this.setAttribute('data-view', 'grid');
            this.textContent = 'Exibir em Lista';
        }
    });

    fetch('/api/arquivos')
        .then(response => response.json())
        .then(data => adicionarArquivos(data))
        .catch(error => console.error('Erro ao buscar arquivos:', error));
}

function bytesParaMegabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2); 
}

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); 
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${horas}:${minutos} ${dia}/${mes}/${ano}`;
}

function obterIcone(extensao) {
    const icones = {
        'aac': 'aac.png',
        'flac': 'flac.png',
        'mp3': 'mp3.png',
        'ogg': 'ogg.png',
        'wav': 'wav.png',
        'avi': 'avi.png',
        'flv': 'flv.png',
        'mkv': 'mkv.png',
        'mov': 'mov.png',
        'mp4': 'mp4.png',
        'webm': 'webm.png',
        'wmv': 'wmv.png',
        'gif': 'gif.png',
        'jpeg': 'jpeg.png',
        'jpg': 'jpg.png',
        'png': 'png.png',
        'rar': 'rar.png',
        'zip': 'zip.png',
        'css': 'css.png',
        'csv': 'csv.png',
        'doc': 'doc.png',
        'docx': 'docx.png',
        'html': 'html.png',
        'js': 'js.png',
        'pdf': 'pdf.png',
        'ppt': 'ppt.png',
        'pptx': 'pptx.png',
        'py': 'py.png',
        'sql': 'sql.png',
        'txt': 'txt.png',
        'xls': 'xls.png',
        'xlsx': 'xlsx.png',
        'xml': 'xml.png',
        'exe': 'exe.png'
    };

    return icones[extensao.toLowerCase()] || 'arquivo.png';  
}

function adicionarEventosGerarLink() {
    const botoesGerarLink = document.querySelectorAll('.gerar-link');
    botoesGerarLink.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            const arquivoId = botao.getAttribute('data-id');
            console.log('ID do arquivo para gerar link:', arquivoId);
            if (arquivoId) {
                fetch(`/api/gerar-link/${arquivoId}`, { method: 'POST' })  
                .then(response => response.json())
                .then(data => {
                    console.log('Resposta do servidor:', data);
                    if (data.link) {
                        const tempInput = document.createElement('input');
                        tempInput.value = data.link;
                        document.body.appendChild(tempInput);
                        tempInput.select();
                        document.execCommand('copy');
                        document.body.removeChild(tempInput);
                        alert(`Link gerado e copiado para a área de transferência: 
${data.link}`);  
                    } else {
                        alert('Erro ao gerar link');
                    }
                })
                .catch(error => console.error('Erro ao gerar link:', error));
            } else {
                console.error('ID do arquivo está indefinido.');
            }
        });
    });
}
function adicionarEventosMenu() {
    const menus = document.querySelectorAll('.arquivo-menu');
    menus.forEach(menu => {
        menu.addEventListener('click', (event) => {
            event.stopPropagation(); 
            fecharTodosMenus();
            const menuOpcoes = menu.nextElementSibling;
            if (menuOpcoes.style.display === "none") {
                menuOpcoes.style.display = "block";
            } else {
                menuOpcoes.style.display = "none";
            }
            document.addEventListener('click', fecharMenusExterno);
        });
    });
}


function fecharMenusExterno(event) {
    const menus = document.querySelectorAll('.menu-opcoes');
    menus.forEach(menu => {
        if (!menu.contains(event.target)) {
            menu.style.display = "none";
        }
    });
}


function fecharTodosMenus() {
    const menus = document.querySelectorAll('.menu-opcoes');
    menus.forEach(menu => {
        menu.style.display = "none";
    });
}

function adicionarArquivos(arquivos) {
    console.log("Adicionando arquivos", arquivos);
    const container = document.querySelector('.arquivos');
    if (!container) {
        console.error("Container '.arquivos' não encontrado.");
        return;
    }
    container.innerHTML = ''; 
    arquivos.forEach(file => {
        const extensao = file.filename.split('.').pop(); 
        const item = document.createElement('div');
        item.className = 'arquivo-item';
        item.innerHTML = `
        <img src='/static/images/icones/${obterIcone(extensao)}' title="Arquivo com extensão .${file.extension}"alt="Formato do ícone">
        <p class="arquivo-nome" title="${file.filename}">${file.filename}</p>
        <p class="arquivo-legenda2">Tamanho: ${bytesParaMegabytes(file.size)} MB</p>
        <p class="arquivo-legenda2">Data de envio: ${formatarData(file.upload_date)}</p>
        <p class="arquivo-legenda3"> ${bytesParaMegabytes(file.size)} MB</p>
        <p class="arquivo-legenda3"> ${formatarData(file.upload_date)}</p>
        <button type="button" class="arquivo-menu">
            <span></span>
        </button>
        <div class="menu-opcoes" style="display: none;">
            <ul>
                <li><a href="#" class="abrir-arquivo" data-id="${file.id}" data-filename="${file.filename}">Visualizar</a></li>  
                <li><a href="#" class="download-arquivo" data-id="${file.id}">Baixar</a></li>
                <li><a href="#" class="gerar-link" data-id="${file.id}">Gerar Link</a></li>
                <li><a href="#" class="deletar-arquivo" data-id="${file.id}">Excluir</a></li>
            </ul>
        </div> 
        <div class="arquivo-card">
            <div id="arquivo-legenda">
                <p>Tamanho: ${bytesParaMegabytes(file.size)} MB</p>
                <p>Data de envio: ${formatarData(file.upload_date)}</p>
            </div>
        </div>
         <div id="modal" class="modal">
                <div class="modal-conteudo">
                <span class="fechar" title="Fechar">X</span>
                    <div class="menu-modal">
                    <p>${file.filename}</p>
                    </div> 
                    <iframe id="iframe-arquivo" src="" frameborder="0" style="display:none;"></iframe>
                </div>
        </div>
    `;
        container.appendChild(item);
    });
    adicionarEventosMenu();
    adicionarEventosDownload();
    adicionarEventosGerarLink(); 
    adicionarEventosDeletar(); 
    adicionarEventosAbrirArquivo();
}
function adicionarEventosDeletar() {
    const botoesDeletar = document.querySelectorAll('.deletar-arquivo');
    botoesDeletar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            const arquivoId = botao.getAttribute('data-id');
            console.log('Botão de excluir clicado para o arquivo ID:', arquivoId);
            if (confirm('Você tem certeza que deseja excluir este arquivo?')) {
                fetch(`/api/deletar-arquivo/${arquivoId}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            alert('Arquivo excluído com sucesso!');
                            fetch('/api/arquivos')
                                .then(response => response.json())
                                .then(data => adicionarArquivos(data))
                                .catch(error => console.error('Erro ao buscar arquivos:', error));
                        } else {
                            alert('Erro ao excluir o arquivo.');
                        }
                    })
                    .catch(error => console.error('Erro ao fazer a requisição de exclusão:', error));
            }
        });
    });
}
function adicionarEventosDownload() {
    const botoesDownload = document.querySelectorAll('.download-arquivo');
    console.log('Botões de download encontrados:', botoesDownload.length);
    botoesDownload.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            const arquivoId = botao.getAttribute('data-id');
            console.log('Botão de download clicado');
            console.log('Conteúdo do botão:', botao.outerHTML);
            console.log('ID do arquivo:', arquivoId); 
            if (arquivoId) {
                const urlDownload = `/download/${arquivoId}`;
                console.log('URL de download gerada:', urlDownload);
                window.location.href = urlDownload;
            } else {
                console.error('ID do arquivo está indefinido.');
            }
        });
    });
}
function adicionarEventosAbrirArquivo() {
    const botoesAbrirArquivo = document.querySelectorAll('.abrir-arquivo');
    const modal = document.getElementById('modal');
    const iframe = document.getElementById('iframe-arquivo');
    const btnFechar = document.querySelector('.fechar');
    const nomeArquivo = modal.querySelector('.menu-modal p'); 
    botoesAbrirArquivo.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            const arquivoId = botao.getAttribute('data-id');
            if (arquivoId) {
                fecharTodosMenus(); 
                const urlAbrir = `/abrir-arquivo/${arquivoId}`;
                fetch(urlAbrir, { method: 'GET' })
                    .then(response => {
                        const contentType = response.headers.get('Content-Type');
                        nomeArquivo.textContent = ''; 
                        const imgExistente = modal.querySelector('img');
                        if (imgExistente) {
                            imgExistente.remove();
                        }
                        const audioExistente = modal.querySelector('audio');
                        if (audioExistente) {
                            audioExistente.remove();
                        }
                        const videoExistente = modal.querySelector('video');
                        if (videoExistente) {
                            videoExistente.remove();
                        }
                        if (contentType.startsWith('image/')) {
                            iframe.style.display = 'none'; 
                            const img = document.createElement('img');
                            img.src = urlAbrir;
                            img.alt = 'Imagem do arquivo';
                            img.style.maxWidth = '96%';
                            img.style.maxHeight = '96%';
                            iframe.parentNode.insertBefore(img, iframe);
                        } else if (contentType === 'application/pdf') {
                            iframe.src = urlAbrir;
                            iframe.style.display = 'block'; 
                        } else if (contentType.startsWith('text/')) {
                            iframe.style.display = 'block';
                            response.text().then(text => {
                                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                                iframeDoc.open(); 
                                iframeDoc.write(`
                                    <html>
                                    <head>
                                        <style>
                                            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');
                                            * {
                                                margin: 0;
                                                padding: 0;
                                                box-sizing: border-box;
                                                font-family: "Montserrat", sans-serif;
                                                user-select: none;
                                                -webkit-user-select: none; 
                                                -moz-user-select: none; 
                                                -ms-user-select: none; 
                                                scroll-behavior: smooth;
                                                scrollbar-width: none;
                                            }
                                            body {
                                                background-color: transparent;
                                                color: white;
                                                margin: 5px 15px;
                                            }
                                            pre {
                                               
                                                font-size: 13pt;
                                                color: white;
                                                white-space: pre-wrap; 
                                                word-wrap: break-word; 
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <pre>${text}</pre>
                                    </body>
                                    </html>
                                `);
                                iframeDoc.close(); 
                            }).catch(error => {
                                console.error('Erro ao processar o arquivo de texto:', error);
                            });
                        } else if (contentType.startsWith('audio/')) {
                            const audio = document.createElement('audio');
                            audio.controls = true;
                            audio.src = urlAbrir;
                            modal.appendChild(audio); 
                        } else if (contentType.startsWith('video/')) {
                            iframe.style.display = 'none';  
                            const videoExistente = modal.querySelector('video');
                            if (videoExistente) {
                                videoExistente.remove();
                            }
                            const video = document.createElement('video');
                            video.controls = true;
                            video.src = urlAbrir;
                            video.style.maxWidth = '100%';  
                            video.style.maxHeight = '100%';  
                            video.classList.add('video-modal');
                            const modalConteudo = document.querySelector('.modal-conteudo');
                            modalConteudo.appendChild(video);  
                        }
                         else {
                            console.error('Formato de arquivo não suportado para visualização.');
                        }
                        nomeArquivo.textContent = botao.getAttribute('data-filename'); 
                        modal.style.display = 'block'; 
                    })
                    .catch(error => console.error('Erro ao abrir o arquivo:', error));
            } else {
                console.error('ID do arquivo está indefinido.');
            }
        });
    });
    function limparConteudoModal() {
        modal.style.display = 'none';
        iframe.src = ''; 
        iframe.style.display = 'none';
        const imgExistente = modal.querySelector('img');
        if (imgExistente) {
            imgExistente.remove();
        }
        const audioExistente = modal.querySelector('audio');
        if (audioExistente) {
            audioExistente.remove();
        }
        const videoExistente = modal.querySelector('video');
        if (videoExistente) {
            videoExistente.remove();
        }
        nomeArquivo.textContent = '';
    }
    btnFechar.addEventListener('click', limparConteudoModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            limparConteudoModal();
        }
    });
}
