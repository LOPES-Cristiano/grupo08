window.addEventListener('resize', function() {
    const dropdownContent = document.querySelector('.dropdown-content');
    const conteudoMovel = document.querySelector('.conteudo-movel');
    const originalContainer = document.querySelector('.dropdown-container');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 450) {
        // Move o conteúdo para a classe 'conteudo-movel'
        if (!conteudoMovel.contains(dropdownContent)) {
            conteudoMovel.appendChild(dropdownContent);
        }
    } else {
        // Move de volta para o container original (dropdown-container)
        if (!originalContainer.contains(dropdownContent)) {
            originalContainer.appendChild(dropdownContent);
        }
    }
});

// Executa imediatamente ao carregar a página
window.dispatchEvent(new Event('resize'));
