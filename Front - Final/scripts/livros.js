const tabelaLivros = document.querySelector('#tabelaLivros');
const tabelaFormularioLivros = document.querySelector('#tabelaFormularioLivros');
const corpoTabelaLivros = document.querySelector('#corpoTabelaLivros');

const tabelaAvaliacaoLivros = document.querySelector('#tabelaAvaliacaoLivros');
const tabelaFormularioAvaliacao = document.querySelector('#tabelaFormularioAvaliacao');
const corpoTabelaAvaliacaoLivro = document.querySelector('#corpoTabelaAvaliacaoLivro');
const paragrafoMensagemAvaliacao = document.querySelector('#paragrafoMensagemAvaliacao');
const txtIdAvaliacao = document.querySelector('#txtIdAvaliacao');
const txtNotaLivroAvaliacao = document.querySelector('#txtNotaLivroAvaliacao');
const txtComentarioLivro = document.querySelector('#txtComentarioLivro');
const txtIdUsuarioA = document.querySelector('#txtIdUsuarioA');
const txtIdLivro = document.querySelector('#txtIdLivro');

const btnSalvarAvaliacao = document.querySelector('#btnSalvarAvaliacao');
const btnApagarAvaliacao = document.querySelector('#btnApagarAvaliacao');
const btnCancelarAvaliacao = document.querySelector('#btnCancelarAvaliacao');
var criandoNovaAvaliacao = false;

const btnNovoLivro = document.querySelector('#btnNovoLivro');
const btnSalvarLivro = document.querySelector('#btnSalvarLivro');
const btnApagarLivro = document.querySelector('#btnApagarLivro');
const btnCancelarLivro = document.querySelector('#btnCancelarLivro');
var criandoNovoLivro = false;

var token = localStorage.getItem("token");

inicializarLivro();

function inicializarLivro() {
    criandoNovoLivro = false;
    listarTodosLivros();
}

function listarTodosLivros() {
    asyncLerLivros(preencherTabelaLivro, errorHandler);
}

function preencherTabelaLivro(livros) {
    exibirLivros(livros);
}

function errorHandler(error) {
    paragrafoMensagemLivros.textContent = "Erro ao listar Livros (código " + error.message + ")";
}

let livroClicadoId = null;
let livroClicadoUrl = null;
let livroClicadoTitulo = null;

function exibirLivros(livros) {
    const livrosContainer = document.getElementById('livros-container');
    livrosContainer.innerHTML = "";

    livros.forEach(livro => {
        // Cria um elemento card para cada livro
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.idLivro = livro.id;

        // Adiciona a imagem do livro ao card
        const imagem = document.createElement('img');
        imagem.src = livro.urlCapa;
        imagem.alt = livro.titulo;
        card.appendChild(imagem);

        // Adiciona o título do livro ao card
        const linkTitulo = document.createElement('a');
        linkTitulo.textContent = livro.titulo;
        linkTitulo.href = `#`;
        linkTitulo.classList.add('linkTitulo');

        card.appendChild(linkTitulo);

        linkTitulo.addEventListener('click', function (event) {
            // Impede o comportamento padrão do link
            event.preventDefault();
            livroClicadoId = livro.id;
            livroClicadoUrl = livro.urlCapa;
            livroClicadoTitulo = livro.titulo;

            txtIdLivro.value = livroClicadoId;

            document.getElementById('recomendacoesLivros').style.display = 'none';
            document.getElementById('sectionAvaliação').style.display = 'block';
            exibirDetalhesLivroAvaliacao();

        });

        // Adiciona outras informações do livro ao card
        const autor = document.createElement('p');
        autor.textContent = `Autor: ${livro.autores}`;
        card.appendChild(autor);

        const ano = document.createElement('p');
        ano.textContent = `Ano: ${livro.anoLancamento}`;
        card.appendChild(ano);

        // Adiciona o card ao container de livros
        livrosContainer.appendChild(card);
    });
}

function exibirDetalhesLivroAvaliacao() {
    document.getElementById('livroClicadoId').textContent = `ID do Livro: ${livroClicadoId}`;
    document.getElementById('imagemLivroAvaliacao').src = livroClicadoUrl;
    document.getElementById('tituloLivroAvaliacao').textContent = livroClicadoTitulo;
    document.getElementById('livroClicadoId').value = livroClicadoId;
    document.getElementById('livroClicadoId').disabled = true;

    // Listar avaliações específicas para este livro
    listarTodasAvaliacoes(livroClicadoId);
}

//AVALIAÇÃO DE LIVRO
inicializarAvaliacao();

function inicializarAvaliacao() {
    paragrafoMensagemAvaliacao.textContent = 'Preencha as informações de avaliação:';
    txtIdAvaliacao.value = '';
    txtNotaLivroAvaliacao.value = '';
    txtComentarioLivro.value = '';
    txtIdUsuarioA.value = '';
    txtIdLivro.value = '';

    txtIdAvaliacao.disabled = true;
    txtNotaLivroAvaliacao.enabled = true;
    txtComentarioLivro.enabled = true;
    txtIdUsuarioA.disabled = true;
    txtIdLivro.disabled = true;

    btnSalvarAvaliacao.disabled = false;

    listarTodasAvaliacoes();
}

function listarTodasAvaliacoes(idLivro) {
    asyncLerAvaliacoes(idLivro, preencherTabelaAvaliacoes, errorHandler);
}

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o usuário está logado
    const idUsuario = localStorage.getItem("idUsuario");
    const nomeUsuario = localStorage.getItem("username");
    if (idUsuario) {
        // Se estiver logado, defina o valor do campo txtIdUsuarioA como ID do usuário
        document.getElementById('txtIdUsuarioA').value = idUsuario;
    }
});

function preencherTabelaAvaliacoes(avaliacoes) {
    const corpoTabelaAvaliacaoLivro = document.getElementById('corpoTabelaAvaliacaoLivro');
    corpoTabelaAvaliacaoLivro.innerHTML = ""; // Limpa o conteúdo atual da tabela

    const nomeUsuario = localStorage.getItem("username");

    avaliacoes.forEach(avaliacao => {
        if (avaliacao.item.id === livroClicadoId) {
            // Cria um novo elemento <div> para representar a avaliação como um comentário
            const comentario = document.createElement('div');
            comentario.classList.add('avaliacao-comentario');

            const imagemLivro = document.createElement('img');
            imagemLivro.src = livroClicadoUrl;
            imagemLivro.alt = livroClicadoTitulo;
            comentario.appendChild(imagemLivro);

            const conteudo = document.createElement('div'); // Novo elemento para o conteúdo
            conteudo.classList.add('conteudo');

            const tituloLivro = document.createElement('h3');
            tituloLivro.textContent = `${livroClicadoTitulo}`;
            conteudo.appendChild(tituloLivro);

            // Adiciona a nota da avaliação ao conteúdo
            const nota = document.createElement('p');
            nota.textContent = `Nota: ${avaliacao.nota}`;
            conteudo.appendChild(nota);

            // Adiciona o comentário ao conteúdo
            const textoComentario = document.createElement('p');
            textoComentario.textContent = `Comentário: ${avaliacao.comentario}`;
            conteudo.appendChild(textoComentario);

            // Adiciona o nome do usuário ao conteúdo
            // const idUsuario = document.createElement('p');
            // idUsuario.textContent = `Avaliação feita por: ${avaliacao.usuario.id}`;
            // conteudo.appendChild(idUsuario);

            // Adiciona o nome do usuário ao conteúdo
            const nomeUsuarioTexto = document.createElement('p');
            nomeUsuarioTexto.textContent = `Avaliação feita por: ${avaliacao.usuario.username} (${avaliacao.usuario.id})`;
            conteudo.appendChild(nomeUsuarioTexto);

            // Adiciona o conteúdo ao comentário
            comentario.appendChild(conteudo);

            // Adiciona o comentário ao corpo da tabela
            corpoTabelaAvaliacaoLivro.appendChild(comentario);
        }
    });
}

function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Livros (código " + error.message + ")";
}

function salvarAvaliacao() {
    const dadosAvaliacao = {
        'nota': txtNotaLivroAvaliacao.value,
        'comentario': txtComentarioLivro.value,
        'usuario': { "id": txtIdUsuarioA.value },
        'item': { "id": livroClicadoId },
    };
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao criar nova Avaliação (código ' + error.message + ')';
    }
    asyncCriarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler); // Aqui era dadosFilme, corrigido para dadosAvaliacao
}

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o usuário está logado
    const idUsuario = localStorage.getItem("idUsuario");
    if (idUsuario) {
        // Define o valor do campo txtIdUsuarioA como ID do usuário
        document.getElementById('txtIdUsuarioA').value = idUsuario;

        // Verifica o tipo de usuário
        fetch(`https://indicai.onrender.com/api/usuarios/${idUsuario}`, {
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

                if (painelNavBtn) {
                    if (roleUsuario === 'ADMIN') {
                        painelNavBtn.style.display = 'block';
                    } else {
                        painelNavBtn.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Failed to fetch user information:', error);
            });
    }
});

//Funcoes Rest

async function asyncLerLivros(proxsucesso, proxerro) {
        const URL = `https://indicai.onrender.com/api/livros`;
        fetch(URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
            .then(resposta => resposta.json())
            .then(jsonResponse => proxsucesso(jsonResponse))
            .catch(proxerro)
    }
    
    async function asyncLerLivroById(id, proxsucesso, proxerro) {
        const URL = `https://indicai.onrender.com/api/livros/${id}`;
        fetch(URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
            .then(resposta => resposta.json())
            .then(jsonResponse => proxsucesso(jsonResponse))
            .catch(proxerro);
    }
    
    async function asyncCriarAvaliacao(dadosAvaliacao, proxsucesso, proxerro) {
        const URL = `https://indicai.onrender.com/api/avaliacoes`;
        const postRequest = {
            method: 'POST',
            body: JSON.stringify(dadosAvaliacao),
            headers: { 
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        fetch(URL, postRequest)
            .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
            .then(resposta => resposta.json())
            .then(jsonResponse => proxsucesso())
            .catch(proxerro);
    }
    
    async function asyncLerAvaliacoes(idLivro, proxsucesso, proxerro) {
        const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idLivro}`;
        fetch(URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
            .then(resposta => resposta.json())
            .then(jsonResponse => proxsucesso(jsonResponse))
            .catch(proxerro);
    }

// async function asyncLerLivros(proxsucesso, proxerro) {
//     const URL = `https://indicai.onrender.com/api/livros`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro)
// }

// async function asyncLerLivroById(id, proxsucesso, proxerro) {
//     const URL = `https://indicai.onrender.com/api/livros/${id}`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro);
// }

// async function asyncCriarAvaliacao(dadosAvaliacao, proxsucesso, proxerro) {
//     const URL = `https://indicai.onrender.com/api/avaliacoes`;
//     const postRequest = {
//         method: 'POST',
//         body: JSON.stringify(dadosAvaliacao),
//         headers: { 'Content-type': 'application/json' }
//     };
//     fetch(URL, postRequest)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso())
//         .catch(proxerro);
// }

// async function asyncLerAvaliacoes(idLivro, proxsucesso, proxerro) {
//     const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idLivro}`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro);
// }