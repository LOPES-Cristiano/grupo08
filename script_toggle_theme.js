// Função para aplicar o tema armazenado
function applySavedTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Função para alternar o tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    // Salva a preferência do tema
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Função para configurar o botão de alternância de tema
function setupThemeToggleButton() {
    const toggleButton = document.getElementById('toggle-theme');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }
}

// Aplica o tema salvo ao carregar a página
applySavedTheme();

// Configura o botão de alternância de tema quando o conteúdo é carregado
document.addEventListener('DOMContentLoaded', setupThemeToggleButton);
