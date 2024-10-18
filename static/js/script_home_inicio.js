function scriptHomeInicio(conteudo, uploadUrl) {
    console.log('URL de upload inicial:', uploadUrl);

    conteudo.innerHTML = `
       <form id="upload-form" action="{{ url_for('upload_file') }}" method="POST" enctype="multipart/form-data">
            <label for="file-input" class="drop-container">
            <span class="drop-title">Arraste seus arquivos até aqui</span>
            ou
            <input type="file" name="file" id="file-input" multiple required>
            </label>

            <button class="button" type="submit" id="upload-btn">
            <span class="button_lg">
                <span class="button_sl"></span>
                <span class="button_text">ENVIAR ARQUIVOS</span>
            </span>
            </button>
        </form>
        <div id="progress-container" style="display: none;">
            <div id="progress-bar"></div>
        </div>
        <div id="extensoes-container">
        <h1 id="extensoes-title">FORMATOS DE ARQUIVOS COMPATÍVEIS</h1>
        <div id="extensoes">
                <div class="category">
                    <h3>TEXTO</h3>
                    <ul>
                        <li>txt</li>
                        <li>css</li>
                        <li>pdf</li>
                        <li>doc</li>
                        <li>xml</li>
                        <li>sql</li>
                        <li>html</li>
                        <li>docx</li>
                        <li>csv</li>
                    </ul>
                </div>

                <div class="category">
                    <h3>IMAGEM</h3>
                    <ul>
                        <li>png</li>
                        <li>jpg</li>
                        <li>jpeg</li>
                        <li>gif</li>
                        
                    </ul>
                </div>

                <div class="category">
                    <h3>VÍDEO</h3>
                    <ul>
                        <li>mp4</li>
                        <li>avi</li>
                        <li>mov</li>
                        <li>mkv</li>
                        <li>webm</li>
                        <li>flv</li>
                        <li>wmv</li>
                    </ul>
                </div>

                <div class="category">
                    <h3>COMPACTADOS</h3>
                    <ul>
                        <li>zip</li>
                        <li>rar</li>
                    </ul>
                </div>

                <div class="category">
                    <h3>ÁUDIO</h3>
                    <ul>
                        <li>mp3</li>
                        <li>wav</li>
                        <li>aac</li>
                        <li>ogg</li>
                        <li>flac</li>
                    </ul>
                </div>
        </div>
        </div>
    `; 

    setupFileUpload('upload-form', uploadUrl);
}