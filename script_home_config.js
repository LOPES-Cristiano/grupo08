function scriptHomeConfig(conteudo) {
    conteudo.innerHTML = `
        <h2>CONFIGURAÇÕES</h2>

        <div class="home-configs">
            <label for="tema">Tema Escuro:</label>
            <button id="toggle-theme">ALTERNAR TEMA</button>
        </div>

    `;

    // Reconfigura o botão de alternância de tema
    setupThemeToggleButton();
}
