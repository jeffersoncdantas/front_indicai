// Variáveis de Tabela e Corpo de Tabela
const tabelaGeneros = document.querySelector('#tabelaGeneros');
const tabelaFormularioGenero = document.querySelector('#tabelaFormularioGeneros');
const corpoTabelaGeneros = document.querySelector('#corpoTabelaGeneros');
const paragrafoMensagemGeneros = document.querySelector('#paragrafoMensagemGeneros');
// Variáveis do Gênero
const txtIdGenero = document.querySelector('#txtIdGenero');
const txtNomeGenero = document.querySelector('#txtNomeGenero');
// Variáveis de botão
const btnNovoGenero = document.querySelector('#btnNovoGenero');
const btnSalvarGenero = document.querySelector('#btnSalvarGenero');
const btnApagarGenero = document.querySelector('#btnApagarGenero');
const btnCancelarGenero = document.querySelector('#btnCancelarGenero');
let criandoNovoGenero = false;

const urlPrincipalGenero = "https://indicai.onrender.com";

inicializarGenero();

function inicializarGenero() {
    criandoNovoGenero = false;
    paragrafoMensagemGeneros.textContent = 'Pressione o botão Novo ou selecione um Gênero da lista:';
    txtIdGenero.value = '';
    txtNomeGenero.value = '';

    txtIdGenero.disabled = true;
    txtNomeGenero.disabled = true;

    btnNovoGenero.disabled = false;
    btnSalvarGenero.disabled = true;
    btnApagarGenero.disabled = true;
    btnCancelarGenero.disabled = true;

    tabelaFormularioGenero.style.display = 'none';
    tabelaGeneros.style.display = 'inline';

    listarTodosGeneros();
}

function listarTodosGeneros() {
    const errorHandler = function (error) {
        paragrafoMensagemGeneros.textContent = "Erro ao listar Gêneros (código " + error.message + ")";
    }
    asyncLerGeneros(preencherTabelaGenero, errorHandler);
}

function preencherTabelaGenero(generos) {
    corpoTabelaGeneros.innerHTML = "";
    const n = generos.length;
    for (let i = 0; i < n; i++) {
        const genero = generos[i];
        const linha = corpoTabelaGeneros.insertRow();
        const celulaId = linha.insertCell();
        const celulaNome = linha.insertCell();

        const alink = document.createElement('a');
        alink.textContent = genero.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarGenero(genero.id); };
        celulaId.appendChild(alink);
        celulaNome.textContent = genero.name;
    }
}

function selecionarGenero(id) {
    criandoNovoGenero = false;
    const errorHandler = function (error) {
        paragrafoMensagemGeneros.textContent = "Erro ao selecionar Gênero (código " + error.message + ")";
    }
    asyncLerGeneroById(id, preencherFormularioGenero, errorHandler);
}

function preencherFormularioGenero(genero) {
    paragrafoMensagemGeneros.textContent = 'Altere e salve os dados do Gênero, ou então apague o registro do Gênero.'
    txtIdGenero.value = genero.id;
    txtNomeGenero.value = genero.name;

    txtIdGenero.disabled = true;
    txtNomeGenero.disabled = false;

    btnNovoGenero.disabled = true;
    btnSalvarGenero.disabled = false;
    btnApagarGenero.disabled = false;
    btnCancelarGenero.disabled = false;

    tabelaFormularioGenero.style.display = 'inline';
    tabelaGeneros.style.display = 'none';
}

function novoGenero() {
    paragrafoMensagemGeneros.textContent = 'Preencha os dados do novo Gênero...';
    criandoNovoGenero = true;

    txtIdGenero.value = '';
    txtNomeGenero.value = '';

    txtIdGenero.disabled = true;
    txtNomeGenero.disabled = false;

    btnNovoGenero.disabled = true;
    btnSalvarGenero.disabled = false;
    btnApagarGenero.disabled = true;
    btnCancelarGenero.disabled = false;

    tabelaFormularioGenero.style.display = 'inline';
    tabelaGeneros.style.display = 'none';
}

function salvarGenero() {
    if (criandoNovoGenero) {
        criarGenero();
    } else {
        alterarGenero();
    }
}

function criarGenero() {
    const dadosGenero = {
        'name': txtNomeGenero.value
    };
    const errorHandler = function (error) {
        paragrafoMensagemGeneros.textContent = 'Erro ao criar novo Gênero (código ' + error.message + ')';
    }
    asyncCriarGenero(dadosGenero, inicializarGenero, errorHandler);
}

function alterarGenero() {
    const errorHandler = function (error) {
        paragrafoMensagemGeneros.textContent = 'Erro ao alterar Gênero (código ' + error.message + ')';
    }
    const dadosGenero = {
        'id': txtIdGenero.value,
        'name': txtNomeGenero.value
    };
    asyncAlterarGenero(dadosGenero, inicializarGenero, errorHandler);
}

function cancelarEdicaoGenero() {
    inicializarGenero();
}

function apagarGenero() {
    const id = txtIdGenero.value;
    const errorHandler = function (error) {
        paragrafoMensagemGeneros.textContent = 'Erro ao apagar Gênero (código ' + error.message + ')';
    }
    asyncApagarGenero(id, inicializarGenero, errorHandler);
}

// Funções REST para Gêneros
async function asyncCriarGenero(dadosGenero, proxsucesso, proxerro) {
    try {
        const URL = `${urlPrincipalGenero}/api/generos`;
        const postRequest = {
            method: 'POST',
            body: JSON.stringify(dadosGenero),
            headers: { 'Content-type': 'application/json' }
        };
        const resposta = await fetch(URL, postRequest);
        if (!resposta.ok) {
            throw new Error(resposta.status);
        }
        const jsonResponse = await resposta.json();
        proxsucesso(jsonResponse);
    } catch (error) {
        proxerro(error);
    }
}

async function asyncLerGeneros(proxsucesso, proxerro) {
    try {
        const URL = `${urlPrincipalGenero}/api/generos`;
        const resposta = await fetch(URL);
        if (!resposta.ok) {
            throw new Error(resposta.status);
        }
        const jsonResponse = await resposta.json();
        proxsucesso(jsonResponse);
    } catch (error) {
        proxerro(error);
    }
}

async function asyncLerGeneroById(id, proxsucesso, proxerro) {
    try {
        const URL = `${urlPrincipalGenero}/api/generos/${id}`;
        const resposta = await fetch(URL);
        if (!resposta.ok) {
            throw new Error(resposta.status);
        }
        const jsonResponse = await resposta.json();
        proxsucesso(jsonResponse);
    } catch (error) {
        proxerro(error);
    }
}

async function asyncAlterarGenero(dadosGenero, proxsucesso, proxerro) {
    try {
        const URL = `${urlPrincipalGenero}/api/generos/${dadosGenero.id}`;
        const putRequest = {
            method: 'PUT',
            body: JSON.stringify(dadosGenero),
            headers: { 'Content-type': 'application/json' }
        };
        const resposta = await fetch(URL, putRequest);
        if (!resposta.ok) {
            throw new Error(resposta.status);
        }
        const jsonResponse = await resposta.json();
        proxsucesso(jsonResponse);
    } catch (error) {
        proxerro(error);
    }
}

async function asyncApagarGenero(id, proxsucesso, proxerro) {
    try {
        const URL = `${urlPrincipalGenero}/api/generos/${id}`;
        const deleteRequest = {
            method: 'DELETE'
        };
        const resposta = await fetch(URL, deleteRequest);
        if (!resposta.ok) {
            throw new Error(resposta.status);
        }
        proxsucesso();
    } catch (error) {
        proxerro(error);
    }
}