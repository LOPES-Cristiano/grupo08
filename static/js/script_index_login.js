document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.getElementById('menu-toggle');
    var dropdownContent = document.getElementById('dropdown-content');
    var loginLink = document.getElementById('login-link');
    var cadastroLink = document.getElementById('cadastro-link');
    var loginForm = document.getElementById('login-form');
    var cadastroForm = document.getElementById('cadastro-form');
    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('email-error');

    // Toggle de dropdown
    menuToggle.addEventListener('click', function(event) {
        event.preventDefault();
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });

    // Inicialmente, apenas o formulário de login deve estar visível
    loginForm.classList.add('slide-down-active');
    cadastroForm.classList.add('slide-down');

    // Função para adicionar a animação de cortina
    function switchForm(showForm, hideForm) {
        hideForm.classList.remove('slide-down-active');
        hideForm.classList.add('slide-down');
        setTimeout(function() {
            hideForm.style.display = 'none';
            showForm.style.display = 'block';
            showForm.classList.remove('slide-down');
            showForm.classList.add('slide-down-active');
        }, 600);  // Tempo da transição (0.5s)
    }

    // Troca de formulário para login
    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        switchForm(loginForm, cadastroForm);
    });

    // Troca de formulário para cadastro
    cadastroLink.addEventListener('click', function(event) {
        event.preventDefault();
        switchForm(cadastroForm, loginForm);
    });

    // Mensagem de erro ao informar e-mail ou senha incorretos
    emailInput.addEventListener('input', function() {
        var email = emailInput.value;

        if (email.length > 0) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/check_email', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.exists) {
                        emailError.style.display = 'block';
                    } else {
                        emailError.style.display = 'none';
                    }
                }
            };
            xhr.send('email=' + encodeURIComponent(email));
        } else {
            emailError.style.display = 'none';
        }
    });
});
