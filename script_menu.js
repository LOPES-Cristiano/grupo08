// Alterna o menu hamburguer ao clicar
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('menu-esquerda').classList.toggle('active');
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu-esquerda');
    const toggle = document.getElementById('menu-toggle');

    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Função para carregar o conteúdo da página dinamicamente
function carregarPagina(page) {
    const conteudo = document.querySelector('.conteudo');
    
    // Limpa o conteúdo existente
    conteudo.innerHTML = '';

    // Carrega o script correspondente de acordo com a página selecionada
    switch (page) {
        case 'inicio':
            scriptHomeInicio(conteudo);
            break;
        case 'meus-arquivos':
            scriptHomeArquivos(conteudo);
            break;
        case 'meu-perfil':
            scriptHomePerfil(conteudo);
            break;
        case 'configuracoes':
            scriptHomeConfig(conteudo);
            break;
        default:
            conteudo.innerHTML = '<h2>Página não encontrada!</h2>';
    }
}

// Evento de clique no menu
const menuItems = document.querySelectorAll('#menu-list li');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        carregarPagina(page);
    });
});

// Adiciona um listener de clique à seção de perfil
document.getElementById('perfil-link').addEventListener('click', function() {
    carregarPagina('meu-perfil');
});

// Carrega o conteúdo da página inicial ao carregar a página
window.addEventListener('load', function() {
    carregarPagina('inicio');
});