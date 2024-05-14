document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    var messageElement = document.getElementById('message-login');
    const txtNomeUsuario = document.getElementById('txtNomeUsuario');
    const txtIdUsuario = document.getElementById('txtIdUsuario');

    loginForm.addEventListener('submit', function (event) {
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

                        document.getElementById('username').value = '';
                        document.getElementById('password').value = '';

                        console.log(localStorage.getItem("idUsuario"));
                        console.log(localStorage.getItem("username"));

                        txtNomeUsuario.textContent = `Nome de Usuário: ${username}`;
                        txtIdUsuario.textContent = `ID do Usuário: ${idUsuario}`;

                        const roleUsuario = data.role;

                        const painelNavBtn = document.getElementById('painel-nav-btn');
                        // const homeNavBtn = document.getElementById('home-nav-btn');
                        const filmesNavBtn = document.getElementById('filmes-nav-btn');
                        const seriesNavBtn = document.getElementById('series-nav-btn');
                        const livrosNavBtn = document.getElementById('livros-nav-btn')
                        const loginNavBtn = document.getElementById('login-nav-btn');
                        const sectionLoginSignUp = document.getElementById('sectionLoginSignUp');
                        const containerPerfil = document.getElementById('containerPerfil');

                        if (painelNavBtn) {
                            if (roleUsuario === 'ADMIN') {
                                // Se o papel for ADMIN, redireciona para painelGerenciador.html
                                window.location.href = 'painelGerenciador.html';

                                painelNavBtn.style.display = 'block';
                                // homeNavBtn.style.display = 'block';
                                filmesNavBtn.style.display = 'block';
                                seriesNavBtn.style.display = 'block';
                                livrosNavBtn.style.display = 'block';
                                loginNavBtn.style.display = 'block';
                                sectionLoginSignUp.style.display='none';
                                containerPerfil.style.display = 'block';

                            } else {
                                // Se não, redireciona para index.html
                                //window.location.href = 'filmes.html';
                                painelNavBtn.style.display = 'none';
                                // homeNavBtn.style.display = 'block';
                                filmesNavBtn.style.display = 'block';
                                seriesNavBtn.style.display = 'block';
                                livrosNavBtn.style.display = 'block';
                                loginNavBtn.style.display = 'block';
                                sectionLoginSignUp.style.display='none';
                                containerPerfil.style.display = 'block';

                            }
                        } else {
                            console.error('Elemento com ID "painel-nav-btn" não encontrado.');
                        }

                    })
                    .catch(error => {
                        console.error('Failed to fetch user information:', error);
                    });

            })
            .catch(error => {
                console.error('Login failed:', error);
                messageElement.innerHTML = "Usuário ou senha inválidos!";
            });

    });
});

document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    var messageElement = document.getElementById('message-cadastro');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username-cd').value;
        const cidade = document.getElementById('cidade-cd').value;
        const password = document.getElementById('password-cd').value;
        const estado = document.getElementById('estado-cd').value;
        const anoNascimento = document.getElementById('nascimento-cd').value;

        // Requisição para a API de cadastro
        fetch('https://indicai.onrender.com/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, cidade, anoNascimento, estado })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to signup');
                }
                return response.json();
            })
            .then(data => {
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

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o usuário está logado
    const idUsuario = localStorage.getItem("idUsuario");

    // if (idUsuario !== null) {
    //     // Se houver um usuário logado, exibe a seção de itens avaliados
    //     document.getElementById('itensAvaliados').style.display = 'none';
    // } 

    // Adiciona o evento de clique ao botão de logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            deslogar();
        });
    } else {
        console.error('Botão de logout não encontrado.');
    }
});

function deslogar() {
    // Limpa todos os dados do localStorage
    localStorage.clear();
    // Recarrega a página para efetuar o logout
    window.location.reload();
}
