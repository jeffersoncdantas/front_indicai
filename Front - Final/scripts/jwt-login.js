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
                const token = data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);

                // Defina o HTML do elemento para incluir a tag de imagem com a URL do GIF
                messageElement.innerHTML = '<img src="./assets/await.gif" alt="GIF animado" style="width: 100px; height: 90px;">';

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
                        const idUsuario = data.id;
                        localStorage.setItem('idUsuario', idUsuario);

                        document.getElementById('username').value = '';
                        document.getElementById('password').value = '';

                        console.log(localStorage.getItem("idUsuario"));
                        console.log(localStorage.getItem("username"));

                        txtNomeUsuario.textContent = `Nome de Usuário: ${username}`;
                        txtIdUsuario.textContent = `ID do Usuário: ${idUsuario}`;

                        inicializarItens();

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
                                sectionLoginSignUp.style.display = 'none';
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
                                sectionLoginSignUp.style.display = 'none';
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

//JavaScript dentro da pasta Teste

var token = localStorage.getItem("token");

function inicializarItens() {
    listarAvaliacoesDoUsuario();
}

function listarAvaliacoesDoUsuario() {
    asyncLerAvaliacoesDoUsuario(preencherTabelaFilme);
}

function preencherTabelaFilme(avaliacoes) {
    exibirAvaliacoesDoUsuario(avaliacoes);
}

function exibirAvaliacoesDoUsuario(avaliacoes) {
    const filmesContainer = document.getElementById('filmes-container');
    filmesContainer.innerHTML = ""; 


    avaliacoes.forEach(avaliacao => {
        // Verifica se a avaliação foi feita pelo usuário logado
        // if (avaliacao.usuario.id === idUsuario) {
            // Cria um elemento card para cada filme
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.idItem = avaliacao.item.id;

            // Adiciona outras informações do filme ao card
            const nota = document.createElement('p');
            nota.textContent = `Nota: ${avaliacao.nota}`;
            card.appendChild(nota);

            const comentario = document.createElement('p');
            comentario.textContent = `Comentário: ${avaliacao.comentario}`;
            card.appendChild(comentario);

            const usuario = document.createElement('p');
            usuario.textContent = `Usuário: ${avaliacao.usuario.id}`
            card.appendChild(usuario);
            
            // Adiciona o card ao container de filmes
            filmesContainer.appendChild(card);
    });
}

async function asyncLerAvaliacoesDoUsuario(proxsucesso, proxerro) {
    var idUsuario = localStorage.getItem("idUsuario");
    const URL = `https://indicai.onrender.com/api/avaliacoes/usuario/${idUsuario}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta.json(); })
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}