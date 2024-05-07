const tabelaAvaliacaoFilmes = document.querySelector('#tabelaAvaliacaoFilmes');
const tabelaFormularioAvaliacao = document.querySelector('#tabelaFormularioAvaliacao');
const corpoTabelaAvaliacaoFilme = document.querySelector('#corpoTabelaAvaliacaoFilme');
const paragrafoMensagemAvaliacao = document.querySelector('#paragrafoMensagemAvaliacao');
const txtIdAvaliacao = document.querySelector('#txtIdAvaliacao');
const txtNotaFilme = document.querySelector('#txtNotaFilme');
const txtComentarioFilme = document.querySelector('#txtComentarioFilme');
const txtIdUsuarioA = document.querySelector('#txtIdUsuarioA');
const txtIdFilme = document.querySelector('#txtIdFilme');

const btnNovaAvaliacao = document.querySelector('#btnNovoFilme');
const btnSalvarAvaliacao = document.querySelector('#btnSalvarAvaliacao');
const btnApagarAvaliacao = document.querySelector('#btnApagarAvaliacao');
const btnCancelarAvaliacao = document.querySelector('#btnCancelarAvaliacao');
var criandoNovaAvaliacao = false;


inicializarAvaliacao();

function inicializarAvaliacao() {
    criandoNovaAvaliacao = false;
    paragrafoMensagemAvaliacao.textContent = 'Pressione novo botão Novo ou selecione uma Avaliação da lista:';
    txtIdAvaliacao.value = '';
    txtNotaFilme.value = '';
    txtComentarioFilme.value = '';
    txtIdUsuarioA.value = '';
    txtIdFilme.value = '';

    txtIdAvaliacao.disabled = true;
    txtNotaFilme.disabled = true;
    txtComentarioFilme.disabled = true;
    txtIdUsuarioA.disabled = true;
    txtIdFilme.disabled = true;

    btnNovaAvaliacao.disabled = false;
    btnSalvarAvaliacao.disabled = true;
    btnApagarAvaliacao.disabled = true;
    btnCancelarAvaliacao.disabled = true;

    tabelaAvaliacaoFilmes.style.display = 'none';
    tabelaFormularioAvaliacao.style.display = 'inline';

    listarTodasAvaliacoes();
}

function listarTodasAvaliacoes() {
    asyncLerAvaliacoes(preencherTabelaAvaliacoes, errorHandler);
}

function preencherTabelaAvaliacoes(avaliacoes) {
    corpoTabelaAvaliacaoFilme.innerHTML = "";
    var n = avaliacoes.length;
    for (var i = 0; i < n; i++) {
        let avaliacao = avaliacoes[i];
        let linha = corpoTabelaAvaliacaoFilme.insertRow();
        let celulaId = linha.insertCell();
        let celulaNotaFilme = linha.insertCell();
        let celulaComentario = linha.insertCell();
        let celulaIdUsuario = linha.insertCell();
        let celulaIdFilme = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = avaliacao.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarAvaliacao(avaliacao.id); };
        celulaId.appendChild(alink);
        celulaNotaFilme.textContent = avaliacao.notaFilme;
        celulaComentario.textContent = avaliacao.comentario;
        celulaIdUsuario.textContent = avaliacao.usuario;
        celulaIdFilme.textContent = avaliacao.item;
    };
}

function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Filmes (código " + error.message + ")";
}

function selecionarAvaliacao(id) {
    criandoNovaAvaliacao = false;
    asyncLerAvaliacaoById(id, preencherFormularioAvaliacao, errorHandler);
}


function preencherFormularioAvaliacao(avaliacao) { // Aqui era filme, corrigido para avaliacao
    paragrafoMensagemAvaliacao.textContent = 'Altere e salve os dados do Filme, ou então apague o registro do Filme.'
    txtIdAvaliacao.value = avaliacao.id; // Aqui era filme, corrigido para avaliacao
    txtNotaFilme.value = avaliacao.notaFilme; // Aqui era filme, corrigido para avaliacao
    txtComentarioFilme.value = avaliacao.comentario; // Aqui era filme, corrigido para avaliacao
    txtIdUsuarioA.value = avaliacao.usuario; // Aqui era filme, corrigido para avaliacao
    txtIdFilme.value = avaliacao.item; // Aqui era filme, corrigido para avaliacao

    txtIdAvaliacao.disabled = true;
    txtNotaFilme.disabled = true;
    txtComentarioFilme.disabled = true;
    txtIdUsuarioA.disabled = true;
    txtIdFilme.disabled = true;

    btnNovaAvaliacao.disabled = false;
    btnSalvarAvaliacao.disabled = true;
    btnApagarAvaliacao.disabled = true;
    btnCancelarAvaliacao.disabled = true;

    tabelaAvaliacaoFilmes.style.display = 'none';
    tabelaFormularioAvaliacao.style.display = 'inline';
}

function salvarAvaliacao() {
    if (criandoNovaAvaliacao) {
        criarAvaliacao();
    } else {
        alterarAvaliacao();
    }
}

function criarAvaliacao() {
    const dadosAvaliacao = { // Aqui era dadosFilme, corrigido para dadosAvaliacao
        'notaFilme': txtNotaFilme.value, // Aqui era nota, corrigido para notaFilme
        'comentario': txtComentarioFilme.value,
        'usuario': txtIdUsuarioA.value,
        'item': txtIdFilme.value,
    };
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao criar nova Avaliação (código ' + error.message + ')';
    }
    asyncCriarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler); // Aqui era dadosFilme, corrigido para dadosAvaliacao
}

function alterarAvaliacao() {
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao alterar Avaliação (código ' + error.message + ')';
    }
    const dadosAvaliacao = {
        'id': txtIdAvaliacao.value, // Adicionado para capturar o ID da avaliação a ser alterada
        'notaFilme': txtNotaFilme.value,
        'comentario': txtComentarioFilme.value,
        'usuario': txtIdUsuarioA.value,
        'item': txtIdFilme.value,
    };
    asyncAlterarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler);
}

function cancelarEdicaoAvaliacao() {
    inicializarAvaliacao();
}

function apagarAvaliacao() {
    const id = txtIdAvaliacao.value;
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao apagar Avaliação (código ' + error.message + ')';
    }
    asyncApagarAvaliacao(id, inicializarAvaliacao, errorHandler);
}

//Funções REST
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

async function asyncLerAvaliacoes(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerAvaliacaoById(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes/${id}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncAlterarAvaliacao(dadosAvaliacao, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes/${dadosAvaliacao.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosAvaliacao),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncApagarAvaliacao(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => proxsucesso())
        .catch(proxerro);
}
