let isLoginVisible = false;

function toggleForm() {
    if (isLoginVisible) {
  
        document.getElementById('form-cadastro').style.display = 'block';
        document.getElementById('legenda-cadastro').style.display = 'block';


        document.getElementById('form-login').style.display = 'none';


        document.getElementById('toggle-text').innerText = 'Já possui uma conta? Faça login';
        document.getElementById('toggle-button').innerText = 'ENTRAR';
    } else {

        document.getElementById('form-cadastro').style.display = 'none';
        document.getElementById('legenda-cadastro').style.display = 'none';


        document.getElementById('form-login').style.display = 'block';


        document.getElementById('toggle-text').innerText = 'Ainda não possui uma conta? Crie agora';
        document.getElementById('toggle-button').innerText = 'CADASTRAR';
    }
    isLoginVisible = !isLoginVisible;
}