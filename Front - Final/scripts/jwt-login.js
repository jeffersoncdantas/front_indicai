document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    var messageElement = document.getElementById('message-login');
    const txtNomeUsuario = document.getElementById('txtNomeUsuario');
    const txtIdUsuario = document.getElementById('txtIdUsuario');
    const sectionLoginSignUp = document.getElementById('sectionLoginSignUp');
    const containerPerfil = document.getElementById('containerPerfil');
    const usuariosCadastrados = document.getElementById('usuariosCadastrados');

    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const idUsuario = localStorage.getItem('idUsuario');

    if (token && username && idUsuario) {
        sectionLoginSignUp.style.display = 'none';
        containerPerfil.style.display = 'block';

        txtNomeUsuario.textContent = `Nome de Usuário: ${username}`;
        txtIdUsuario.textContent = `ID do Usuário: ${idUsuario}`;

        inicializarItens();

        // Verifica o papel do usuário e ajusta a navegação
        fetch(`https://indicai.onrender.com/api/usuarios/username/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user information');
                }
                return response.json();
            })
            .then(data => {
                const roleUsuario = data.role;
                const painelNavBtn = document.getElementById('painel-nav-btn');
                const filmesNavBtn = document.getElementById('filmes-nav-btn');
                const seriesNavBtn = document.getElementById('series-nav-btn');
                const livrosNavBtn = document.getElementById('livros-nav-btn');
                const loginNavBtn = document.getElementById('login-nav-btn');

                if (painelNavBtn) {
                    if (roleUsuario === 'ADMIN') {
                        painelNavBtn.style.display = 'block';
                        usuariosCadastrados.style.display = 'block';
                    } else {
                        painelNavBtn.style.display = 'none';
                        usuariosCadastrados.style.display = 'none';
                    }
                    filmesNavBtn.style.display = 'block';
                    seriesNavBtn.style.display = 'block';
                    livrosNavBtn.style.display = 'block';
                    loginNavBtn.style.display = 'block';
                } else {
                    console.error('Elemento com ID "painel-nav-btn" não encontrado.');
                }
            })
            .catch(error => {
                console.error('Failed to fetch user information:', error);
            });
    } else {
        // Usuário não está logado, exibe a tela de login/cadastro
        sectionLoginSignUp.style.display = 'block';
        containerPerfil.style.display = 'none';
    }

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

                // Recuperar os dados do usuário pelo username
                fetch(`https://indicai.onrender.com/api/usuarios/username/${username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
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
                        const filmesNavBtn = document.getElementById('filmes-nav-btn');
                        const seriesNavBtn = document.getElementById('series-nav-btn');
                        const livrosNavBtn = document.getElementById('livros-nav-btn');
                        const loginNavBtn = document.getElementById('login-nav-btn');

                        if (painelNavBtn) {
                            if (roleUsuario === 'ADMIN') {
                                // Se o papel for ADMIN, redireciona para painelGerenciador.html
                                window.location.href = 'painelGerenciador.html';
                                painelNavBtn.style.display = 'block';
                                loginNavBtn.style.display = 'block';
                                filmesNavBtn.style.display = 'none'; // Oculta os botões de filmes, séries e livros
                                seriesNavBtn.style.display = 'none';
                                livrosNavBtn.style.display = 'none';
                                usuariosCadastrados.style.display = 'block';
                                containerPerfil.style.display = 'none';
                            } else {
                                painelNavBtn.style.display = 'none';
                                filmesNavBtn.style.display = 'block';
                                seriesNavBtn.style.display = 'block';
                                livrosNavBtn.style.display = 'block';
                                loginNavBtn.style.display = 'block';
                                usuariosCadastrados.style.display = 'none';
                                containerPerfil.style.display = 'block';
                            }
                        }
                        sectionLoginSignUp.style.display = 'none';

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

// JavaScript dentro da pasta Teste

function inicializarItens() {
    listarAvaliacoesDoUsuario();
}

function listarAvaliacoesDoUsuario() {
    asyncLerAvaliacoesDoUsuario(preencherTabelaFilme);
}

function preencherTabelaFilme(avaliacoes) {
    exibirAvaliacoesDoUsuario(avaliacoes);
}

let itemClicadoId = null;
let itemClicadoUrl = null;
let itemClicadoTitulo = null;

function exibirAvaliacoesDoUsuario(avaliacoes) {
    const itensContainer = document.getElementById('items-container');
    itensContainer.innerHTML = "";

    avaliacoes.forEach(avaliacao => {
        // Cria um elemento card para cada filme
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.idItem = avaliacao.item.id;

        // Adiciona a imagem do item ao card
        const imagem = document.createElement('img');
        imagem.src = avaliacao.item.urlCapa;
        imagem.alt = avaliacao.item.titulo;
        card.appendChild(imagem);

        const linkTitulo = document.createElement('a');
        linkTitulo.textContent = avaliacao.item.titulo;
        linkTitulo.href = `#`;
        linkTitulo.classList.add('linkTitulo');
        linkTitulo.addEventListener('click', function (event) {
            // Impede o comportamento padrão do link
            event.preventDefault();
            itemClicadoId = avaliacao.item.id;
            itemClicadoUrl = avaliacao.item.urlCapa;
            itemClicadoTitulo = avaliacao.item.titulo;

            document.getElementById('recomendacoesItens').style.display = 'none';
            document.getElementById('avalicaoItem').style.display = 'block';
            exibirDetalhesItemAvaliacao();

        });
        card.appendChild(linkTitulo);

        // Adiciona outras informações do filme ao card
        const nota = document.createElement('p');
        nota.textContent = `Nota: ${avaliacao.nota}`;
        card.appendChild(nota);

        const comentario = document.createElement('p');
        comentario.textContent = `Comentário: ${avaliacao.comentario}`;
        card.appendChild(comentario);

        const usuario = document.createElement('p');
        usuario.textContent = `Usuário: ${avaliacao.usuario.username} (${avaliacao.usuario.id})`;
        card.appendChild(usuario);

        // Adiciona o card ao container de itens
        itensContainer.appendChild(card);
    });
}

function exibirDetalhesItemAvaliacao() {
    listarTodasAvaliacoes(itemClicadoId);
}

function listarTodasAvaliacoes(idItem) {
    asyncLerAvaliacoes(idItem, preencherTabelaAvaliacoes);
}

function preencherTabelaAvaliacoes(avaliacoes) {
    const corpoTabelaAvaliacao = document.getElementById('corpoTabelaAvaliacao');
    corpoTabelaAvaliacao.innerHTML = ""; // Limpa o conteúdo atual da tabela

    const nomeUsuario = localStorage.getItem("username");

    avaliacoes.forEach(avaliacao => {
        if (avaliacao.item.id === itemClicadoId) {
            // Cria um novo elemento <div> para representar a avaliação como um comentário
            const comentario = document.createElement('div');
            comentario.classList.add('avaliacao-comentario');

            const imgItem = document.createElement('img');
            imgItem.src = itemClicadoUrl;
            imgItem.alt = itemClicadoTitulo;
            comentario.appendChild(imgItem);

            const conteudo = document.createElement('div'); // Novo elemento para o conteúdo
            conteudo.classList.add('conteudo');

            const tituloItem = document.createElement('h3');
            tituloItem.textContent = `${itemClicadoTitulo}`;
            conteudo.appendChild(tituloItem);

            // Adiciona a nota da avaliação ao conteúdo
            const nota = document.createElement('p');
            nota.textContent = `Nota: ${avaliacao.nota}`;
            conteudo.appendChild(nota);

            // Adiciona o comentário ao conteúdo
            const textoComentario = document.createElement('p');
            textoComentario.textContent = `Comentário: ${avaliacao.comentario}`;
            conteudo.appendChild(textoComentario);

            // Adiciona o nome do usuário ao conteúdo
            const nomeUsuarioTexto = document.createElement('p');
            nomeUsuarioTexto.textContent = `Avaliação feita por: ${avaliacao.usuario.username} (${avaliacao.usuario.id})`;
            conteudo.appendChild(nomeUsuarioTexto);

            // Adiciona o conteúdo ao comentário
            comentario.appendChild(conteudo);

            // Adiciona o comentário ao corpo da tabela
            corpoTabelaAvaliacao.appendChild(comentario);
        }
    });
}

function errorHandler(error) {
    console.error("Erro ao listar Itens (código " + error.message + ")");
}

function voltarRecomendacoes() {
    document.getElementById('recomendacoesItens').style.display = 'block';
    document.getElementById('avalicaoItem').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const containerUsuarios= document.getElementById('usuarios-container');

    // Verifica se o usuário está logado como ADMIN
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const idUsuario = localStorage.getItem('idUsuario');

    if (token && username && idUsuario) {
        fetch('https://indicai.onrender.com/api/usuarios', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(data => {
            // Limpa o conteúdo atual da seção de usuários cadastrados
            containerUsuarios.innerHTML = "";

            // Itera sobre cada usuário e cria um card para exibi-lo
            data.forEach(usuario => {
                const usuarioCard = criarUsuarioCard(usuario);
                containerUsuarios.appendChild(usuarioCard);
            });
        })
        .catch(error => {
            console.error('Failed to fetch users:', error);
        });
    } else {
        console.error('Usuário não autorizado.');
    }
});

function criarUsuarioCard(usuario) {
    // Cria um elemento card para representar o usuário
    const card = document.createElement('div');
    card.classList.add('card');

    // Adiciona o nome do usuário ao card
    const nomeUsuario = document.createElement('p');
    nomeUsuario.textContent = `Nome de Usuário: ${usuario.username}`;
    card.appendChild(nomeUsuario);

    // Adiciona a cidade do usuário ao card
    const cidadeUsuario = document.createElement('p');
    cidadeUsuario.textContent = `Cidade: ${usuario.cidade}`;
    card.appendChild(cidadeUsuario);

    // Adiciona o estado do usuário ao card
    const estadoUsuario = document.createElement('p');
    estadoUsuario.textContent = `Estado: ${usuario.estado}`;
    card.appendChild(estadoUsuario);

    // Adiciona o ano de nascimento do usuário ao card
    const anoNascimentoUsuario = document.createElement('p');
    anoNascimentoUsuario.textContent = `Ano de Nascimento: ${usuario.anoNascimento}`;
    card.appendChild(anoNascimentoUsuario);

    return card;
}

async function asyncLerAvaliacoesDoUsuario(proxsucesso, proxerro) {
    var idUsuario = localStorage.getItem("idUsuario");
    const URL = `https://indicai.onrender.com/api/avaliacoes/usuario/${idUsuario}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta.json(); })
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerAvaliacoes(idItem, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idItem}`;
    fetch(URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta.json(); })
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}