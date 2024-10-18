document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('menu-esquerda').classList.toggle('active');
});

document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu-esquerda');
    const toggle = document.getElementById('menu-toggle');

    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

function carregarPagina(page) {
    const conteudo = document.querySelector('.conteudo');
    
    conteudo.innerHTML = '';

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
        default:
            conteudo.innerHTML = '';
    }
}

const menuItems = document.querySelectorAll('#menu-list li');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        carregarPagina(page);
    });
});

document.getElementById('perfil-link').addEventListener('click', function() {
    carregarPagina('meu-perfil');
});

window.addEventListener('load', function() {
    carregarPagina('inicio');
});