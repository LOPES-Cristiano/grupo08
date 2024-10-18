document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    let formData = new FormData(this);
    
    fetch('/login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect; // Redireciona se o login for bem-sucedido
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: data.message,
            });
        }
    });
});

document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    let formData = new FormData(this);
    
    fetch('/cadastro', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect; // Redireciona após cadastro bem-sucedido
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: data.message,
            });
        }
    });
});