function scriptHomeArquivos(conteudo) {
    conteudo.innerHTML = `
        <div class="navegacao">
            <p>EXIBIÇÃO</p>
            <button id="view-column" class="view-button">DETALHES</button>
            <button id="view-row" class="view-button">GRADE</button>
        </div>
        <h2>ARQUIVOS</h2>
        <div class="legenda-arquivos">
        <p>NOME<p>
        <p>TIPO<p>
        <p>TAMANHO<p>
        </div>
        <div class="arquivos coluna">
            <div class="arquivo-item">Arquivo 1</div>
            <div class="arquivo-item">Arquivo 2</div>
            <div class="arquivo-item">Arquivo 3</div>
        </div>
    `;

    // Adiciona a lógica para alternar entre os modos de visualização
    document.getElementById('view-column').addEventListener('click', function() {
        document.querySelector('.arquivos').classList.add('coluna');
        document.querySelector('.arquivos').classList.remove('linha');
    });

    document.getElementById('view-row').addEventListener('click', function() {
        document.querySelector('.arquivos').classList.add('linha');
        document.querySelector('.arquivos').classList.remove('coluna');
    });
}
