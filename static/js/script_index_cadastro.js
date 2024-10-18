document.addEventListener('DOMContentLoaded', function() {
    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('email-error');
    var passwordInput = document.getElementById('password');
    var passwordError = document.getElementById('password-error');

    passwordInput.addEventListener('input', function() {
        var password = passwordInput.value;

        if (password.length > 0 && password.length < 8) {
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

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