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
        linkTitulo.addEventListener('click', function(event) {
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
    paragrafoMensagemAvaliacao.textContent = 'Preencha as informações de avaliação:';
    txtIdAvaliacao.value = '';
    txtNotaFilmeAvaliacao.value = '';
    txtComentarioFilme.value = '';
    txtIdUsuarioA.value = '';
    txtIdFilme.value = '';

    txtIdAvaliacao.disabled =true;
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

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    const idUsuario = localStorage.getItem("idUsuario");
    if (idUsuario) {
        // Define o valor do campo txtIdUsuarioA como ID do usuário
        document.getElementById('txtIdUsuarioA').value = idUsuario;
    }
});

function preencherTabelaAvaliacoes(avaliacoes) {
    corpoTabelaAvaliacaoFilme.innerHTML = "";
    var n = avaliacoes.length;
    for (var i = 0; i < n; i++) {
        let avaliacao = avaliacoes[i];

        if (avaliacao.item.id === filmeClicadoId) {
            let linha = corpoTabelaAvaliacaoFilme.insertRow();
            let celulaNotaFilme = linha.insertCell();
            let celulaComentario = linha.insertCell();
            let celulaIdUsuario = linha.insertCell();
            let celulaIdFilme = linha.insertCell();

            celulaNotaFilme.textContent = avaliacao.nota;
            celulaComentario.textContent = avaliacao.comentario;
            celulaIdUsuario.textContent = avaliacao.usuario.id;
            celulaIdFilme.textContent = avaliacao.item.id;
        }
    };
}

function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Filmes (código " + error.message + ")";
}

function salvarAvaliacao() {
    const dadosAvaliacao = { 
        'nota': txtNotaFilmeAvaliacao.value, 
        'comentario': txtComentarioFilme.value,
        'usuario': {"id": txtIdUsuarioA.value},
        'item': {"id": filmeClicadoId},
    };
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao criar nova Avaliação (código ' + error.message + ')';
    }
    asyncCriarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler); 
}

//Funcoes Rest
async function asyncLerFilmes(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro)
}

async function asyncLerFilmeById(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes/${id}`;
    fetch(URL)
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
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerAvaliacoes(idFilme, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idFilme}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}
