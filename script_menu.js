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
