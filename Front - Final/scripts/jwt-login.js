document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    var messageElement = document.getElementById('message-login');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Requisição para a API de login
        fetch('https://indicai.onrender.com/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
            
        })
        .then(data => {
            messageElement.innerHTML = "Usuário logado";
            // Aqui recebe o token JWT da resposta da API
            const token = data.token;

            // Salva o token JWT em localStorage para uso localStorage.getItem("token")
            localStorage.setItem('token', token);

            //Salva o username em localStorage para uso localStorage.getItem("username")
            localStorage.setItem('username', username);

            // Redirecione o usuário para a página desejada após o login
            //window.location.href = 'index.html';

        })
        .catch(error => {
            console.error('Login failed:', error);
            messageElement.innerHTML = "Usuário ou senha inválidos!";
        });

        //Recuperar os dados do usuário pelo username
        fetch(`https://indicai.onrender.com/api/usuarios/username/${username}`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }
            return response.json();
        })
        .then(data => {
            //Aqui recebe o ID do usuário
            const idUsuario = data.id;

            //Salva o ID do usuário em localStorage para uso localStorage.getItem("idUsuario")
            localStorage.setItem('idUsuario', idUsuario);

            document.getElementById('username').value='';
            document.getElementById('password').value='';

            console.log(localStorage.getItem("idUsuario"))


        })
        .catch(error => {
            console.error('Failed to fetch user information:', error);
        });

    });
});

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    var messageElement = document.getElementById('message-cadastro');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

    
         const username = document.getElementById('username-cd').value;
         const cidade = document.getElementById('cidade-cd').value;
         const password = document.getElementById('password-cd').value;
         const estado = document.getElementById('estado-cd').value;
         const anoNascimento= document.getElementById('nascimento-cd').value;
        

        // Requisição para a API de cadastro
        fetch('https://indicai.onrender.com/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, cidade, anoNascimento, estado})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to signup');
            }
            return response.json();
        })
        .then(data =>{
            messageElement.innerHTML = "Cadastro Realizado com Sucesso";
            document.getElementById('username-cd').value = '';
            document.getElementById('cidade-cd').value = '';
            document.getElementById('password-cd').value = '';
            document.getElementById('estado-cd').value = '';
            document.getElementById('nascimento-cd').value = '';
        })
        .catch(error => {
            console.error('Signup failed:', error);
            messageElement.innerHTML = "Usuário já cadastrado!";
        });
    });
});