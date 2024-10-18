// Função para aplicar o tema armazenado
function applySavedTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('switch').checked = true;
    } else if (theme === 'light') {
        document.body.classList.remove('dark-theme');
        document.getElementById('switch').checked = false;
    } else {
        // Se não houver tema salvo, verifica a preferência do sistema
        applySystemThemePreference();
    }
}

// Função para aplicar a preferência de tema do sistema
function applySystemThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
        document.getElementById('switch').checked = true;
        localStorage.setItem('theme', 'dark'); // Armazenar a preferência
    } else {
        document.body.classList.remove('dark-theme');
        document.getElementById('switch').checked = false;
        localStorage.setItem('theme', 'light'); // Armazenar a preferência
    }
}

// Função para alternar o tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Configuração do botão de alternância de tema
function setupThemeToggleButton() {
    const toggleButton = document.getElementById('switch');
    if (toggleButton) {
        toggleButton.addEventListener('change', toggleTheme);
    }
}

// Adiciona um listener para mudanças na preferência de tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (event.matches) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        document.getElementById('switch').checked = true;
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        document.getElementById('switch').checked = false;
    }
});

// Aplicar o tema salvo e configurar o botão ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    applySavedTheme();
    setupThemeToggleButton();
});
