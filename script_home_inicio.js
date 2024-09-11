function scriptHomeInicio(conteudo) {
    conteudo.innerHTML = `
        <h2>ENVIE SEUS ARQUIVOS</h2>
        <button id="upload-btn">ENVIAR ARQUIVOS</button>
    `;

    document.getElementById('upload-btn').addEventListener('click', function() {
        alert('Função de upload não implementada ainda.');
    });
}
