const tabelaFilmes = document.querySelector('#tabelaFilmes');
const tabelaFormularioFilmes = document.querySelector('#tabelaFormularioFilmes');
const corpoTabelaFilmes = document.querySelector('#corpoTabelaFilmes');
const paragrafoMensagemFilmes = document.querySelector('#paragrafoMensagemFilmes');

const tabelaAvaliacaoFilmes = document.querySelector('#tabelaAvaliacaoFilmes');
const tabelaFormularioAvaliacao = document.querySelector('#tabelaFormularioAvaliacao');
const corpoTabelaAvaliacaoFilme = document.querySelector('#corpoTabelaAvaliacaoFilme');
const paragrafoMensagemAvaliacao = document.querySelector('#paragrafoMensagemAvaliacao');
const txtIdAvaliacao = document.querySelector('#txtIdAvaliacao');
const txtNotaFilmeAvaliacao = document.querySelector('#txtNotaFilmeAvaliacao');
const txtComentarioFilme = document.querySelector('#txtComentarioFilme');
const txtIdUsuarioA = document.querySelector('#txtIdUsuarioA');
const txtIdFilme = document.querySelector('#txtIdFilme');

const btnNovaAvaliacao = document.querySelector('#btnNovoFilme');
const btnSalvarAvaliacao = document.querySelector('#btnSalvarAvaliacao');
const btnApagarAvaliacao = document.querySelector('#btnApagarAvaliacao');
const btnCancelarAvaliacao = document.querySelector('#btnCancelarAvaliacao');
var criandoNovaAvaliacao = false;

var criandoNovoFilme = false;

var token = localStorage.getItem("token");


inicializarFilme();

function inicializarFilme() {
    criandoNovoFilme = false;
    listarTodosFilmes();
}

function listarTodosFilmes() {
    asyncLerFilmes(preencherTabelaFilme, errorHandler);
}

function preencherTabelaFilme(filmes) {
    exibirFilmes(filmes);
}

function errorHandler(error) {
    paragrafoMensagemFilmes.textContent = "Erro ao listar Filmes (código " + error.message + ")";
}

let filmeClicadoId = null;
let filmeClicadoUrl = null;
let filmeClicadoTitulo = null;

function exibirFilmes(filmes) {
    const filmesContainer = document.getElementById('filmes-container');
    filmesContainer.innerHTML = "";

    filmes.forEach(filme => {
        // Cria um elemento card para cada filme
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.idFilme = filme.id;

        // Adiciona a imagem do filme ao card
        const imagem = document.createElement('img');
        imagem.src = filme.urlCapa;
        imagem.alt = filme.titulo;
        card.appendChild(imagem);

        // Adiciona o título do filme ao card
        const linkTitulo = document.createElement('a');
        linkTitulo.textContent = filme.titulo;
        linkTitulo.href = `#`;
        linkTitulo.classList.add('linkTitulo');
        linkTitulo.addEventListener('click', function (event) {
            // Impede o comportamento padrão do link 
            event.preventDefault();
            filmeClicadoId = filme.id;
            filmeClicadoUrl = filme.urlCapa;
            filmeClicadoTitulo = filme.titulo;

            txtIdFilme.value = filmeClicadoId;

            document.getElementById('recomendacoesFilmes').style.display = 'none';
            document.getElementById('sectionAvaliação').style.display = 'block';
            exibirDetalhesFilmeAvaliacao();

        });
        card.appendChild(linkTitulo);

        // Adiciona outras informações do filme ao card
        const diretor = document.createElement('p');
        diretor.textContent = `Diretor: ${filme.diretor}`;
        card.appendChild(diretor);

        const ano = document.createElement('p');
        ano.textContent = `Ano: ${filme.anoLancamento}`;
        card.appendChild(ano);

        // Adiciona o card ao container de filmes
        filmesContainer.appendChild(card);
    });
}

function exibirDetalhesFilmeAvaliacao() {
    document.getElementById('filmeClicadoId').textContent = '';
    document.getElementById('imagemFilmeAvaliacao').src = filmeClicadoUrl;
    document.getElementById('tituloFilmeAvaliacao').textContent = filmeClicadoTitulo;
    document.getElementById('filmeClicadoId').value = filmeClicadoId;
    document.getElementById('filmeClicadoId').disabled = true;

    listarTodasAvaliacoes(filmeClicadoId);
}

inicializarAvaliacao();

function inicializarAvaliacao() {
    criandoNovaAvaliacao = false;
    paragrafoMensagemAvaliacao.textContent = 'Preencha as informações de avaliação:';
    txtIdAvaliacao.value = '';
    txtNotaFilmeAvaliacao.value = '';
    txtComentarioFilme.value = '';
    txtIdUsuarioA.value = '';
    txtIdFilme.value = '';

    txtIdAvaliacao.disabled = true;
    txtNotaFilmeAvaliacao.enabled = true;
    txtComentarioFilme.enabled = true;
    txtIdUsuarioA.disabled = true;
    txtIdFilme.disabled = true;

    btnSalvarAvaliacao.disabled = false;

    listarTodasAvaliacoes();
}

function listarTodasAvaliacoes(idFilme) {
    asyncLerAvaliacoes(idFilme, preencherTabelaAvaliacoes, errorHandler);
}

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o usuário está logado
    const idUsuario = localStorage.getItem("idUsuario");
    if (idUsuario) {
        // Define o valor do campo txtIdUsuarioA como ID do usuário
        document.getElementById('txtIdUsuarioA').value = idUsuario;
    }
});

function preencherTabelaAvaliacoes(avaliacoes) {
    const corpoTabelaAvaliacaoFilme = document.getElementById('corpoTabelaAvaliacaoFilme');
    corpoTabelaAvaliacaoFilme.innerHTML = ""; // Limpa o conteúdo atual da tabela

    const nomeUsuario = localStorage.getItem("username");

    avaliacoes.forEach(avaliacao => {
        if (avaliacao.item.id === filmeClicadoId) {
            // Cria um novo elemento <div> para representar a avaliação como um comentário
            const comentario = document.createElement('div');
            comentario.classList.add('avaliacao-comentario');

            const imagemFilme = document.createElement('img');
            imagemFilme.src = filmeClicadoUrl;
            imagemFilme.alt = filmeClicadoTitulo;
            comentario.appendChild(imagemFilme);

            const conteudo = document.createElement('div'); // Novo elemento para o conteúdo
            conteudo.classList.add('conteudo');

            const tituloFilme = document.createElement('h3');
            tituloFilme.textContent = `${filmeClicadoTitulo}`;
            conteudo.appendChild(tituloFilme);

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
            corpoTabelaAvaliacaoFilme.appendChild(comentario);
        }
    });
}

function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Filmes (código " + error.message + ")";
}

function salvarAvaliacao() {
    const dadosAvaliacao = {
        'nota': txtNotaFilmeAvaliacao.value,
        'comentario': txtComentarioFilme.value,
        'usuario': { "id": txtIdUsuarioA.value },
        'item': { "id": filmeClicadoId },
    };
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao criar nova Avaliação (código ' + error.message + ')';
    }
    asyncCriarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler);
}

//Funcoes Rest

async function asyncLerAvaliacoes(idFilme, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idFilme}`;
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

async function asyncLerFilmes(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes`;
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

async function asyncLerFilmeById(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes/${id}`;
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

// async function asyncLerAvaliacoes(idFilme, proxsucesso, proxerro) {
//     const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idFilme}`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro);
// }

// async function asyncLerFilmes(proxsucesso, proxerro) {
//     const URL = `https://indicai.onrender.com/api/filmes`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro)
// }

// async function asyncLerFilmeById(id, proxsucesso, proxerro) {
//     const URL = `https://indicai.onrender.com/api/filmes/${id}`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro);
// }