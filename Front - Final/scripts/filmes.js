const tabelaFilmes = document.querySelector('#tabelaFilmes');
const tabelaFormularioFilmes = document.querySelector('#tabelaFormularioFilmes');
const corpoTabelaFilmes = document.querySelector('#corpoTabelaFilmes');
const paragrafoMensagemFilmes = document.querySelector('#paragrafoMensagemFilmes');
const txtIdFilme = document.querySelector('#txtIdFilme');
const txtTituloFilme = document.querySelector('#txtTituloFilme');
const txtDiretorFilme = document.querySelector('#txtDiretorFilme');
const txtElencoPrincipalFilme = document.querySelector('#txtElencoFilme');
const txtPaisFilme = document.querySelector('#txtPaisFilme');
const txtAnoLancamentoFilme = document.querySelector('#txtAnoLancamentoFilme');
const txtNotaFilme = document.querySelector('#txtNotaFilme');

const btnNovoFilme = document.querySelector('#btnNovoFilme');
const btnSalvarFilme = document.querySelector('#btnSalvarFilme');
const btnApagarFilme = document.querySelector('#btnApagarFilme');
const btnCancelarFilme = document.querySelector('#btnCancelarFilme');
var criandoNovoFilme = false;

inicializarFilme();

function voltarPagInicial(){
    landing.style.display = "block";
    sectionFilmes.style.display = "none";
}

function inicializarFilme() {
    criandoNovoFilme = false;
    paragrafoMensagemFilmes.textContent = 'Pressione o botão Novo ou selecione um Filme da lista:';
    txtIdFilme.value = '';
    txtTituloFilme.value = '';
    txtDiretorFilme.value = '';
    txtElencoPrincipalFilme.value = '';
    txtPaisFilme.value = '';
    txtAnoLancamentoFilme.value = '';
    txtNotaFilme.value = '';

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = true;
    txtDiretorFilme.disabled = true;
    txtElencoPrincipalFilme.disabled = true;
    txtPaisFilme.disabled = true;
    txtAnoLancamentoFilme.disabled = true;
    txtNotaFilme.disabled = true;

    btnNovoFilme.disabled = false;
    btnSalvarFilme.disabled = true;
    btnApagarFilme.disabled = true;
    btnCancelarFilme.disabled = true;

    tabelaFormularioFilmes.style.display = 'none';
    tabelaFilmes.style.display = 'inline';

    listarTodosFilmes();
}

function listarTodosFilmes() {
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = "Erro ao listar Filmes (código " + error.message + ")";
    }
    asyncLerFilmes(preencherTabelaFilme, errorHandler);
}

function preencherTabelaFilme(filmes) {
    corpoTabelaFilmes.innerHTML = "";
    var n = filmes.length;
    for (var i = 0; i < n; i++) {
        let filme = filmes[i];
        let linha = corpoTabelaFilmes.insertRow();
        let celulaId = linha.insertCell();
        let celulaTitulo = linha.insertCell();
        let celulaDiretor = linha.insertCell();
        let celulaElencoPrincipal = linha.insertCell();
        let celulaPais = linha.insertCell();
        let celulaAnoLancamento = linha.insertCell();
        let celulaNota = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = filme.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarFilme(filme.id); };
        celulaId.appendChild(alink);
        celulaTitulo.textContent = filme.titulo;
        celulaDiretor.textContent = filme.diretor;
        celulaElencoPrincipal.textContent = filme.elencoPrincipal;
        celulaPais.textContent = filme.pais;
        celulaAnoLancamento.textContent = filme.anoLancamento;
        celulaNota.textContent = filme.nota;
    }
}

function selecionarFilme(id) {
    criandoNovoFilme = false;
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = "Erro ao selecionar Filme (código " + error.message + ")";
    }
    asyncLerFilmeById(id, preencherFormularioFilme, errorHandler);
}

function preencherFormularioFilme(filme) {
    paragrafoMensagemFilmes.textContent = 'Altere e salve os dados do Filme, ou então apague o registro do Filme.'
    txtIdFilme.value = filme.id;
    txtTituloFilme.value = filme.titulo;
    txtDiretorFilme.value = filme.diretor;
    txtElencoPrincipalFilme.value = filme.elencoPrincipal;
    txtPaisFilme.value = filme.pais;
    txtAnoLancamentoFilme.value = filme.anoLancamento;
    txtNotaFilme.value = filme.nota;

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = false;
    txtDiretorFilme.disabled = false;
    txtElencoPrincipalFilme.disabled = false;
    txtPaisFilme.disabled = false;
    txtAnoLancamentoFilme.disabled = false;
    txtNotaFilme.disabled = false;

    btnNovoFilme.disabled = true;
    btnSalvarFilme.disabled = false;
    btnApagarFilme.disabled = false;
    btnCancelarFilme.disabled = false;

    tabelaFormularioFilmes.style.display = 'inline';
    tabelaFilmes.style.display = 'none';
}

function novoFilme() {
    paragrafoMensagemFilmes.textContent = 'Preencha os dados do novo Filme...';
    criandoNovoFilme = true;

    txtIdFilme.value = '';
    txtTituloFilme.value = '';
    txtDiretorFilme.value = '';
    txtElencoPrincipalFilme.value = '';
    txtPaisFilme.value = '';
    txtAnoLancamentoFilme.value = '';
    txtNotaFilme.value = '';

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = false;
    txtDiretorFilme.disabled = false;
    txtElencoPrincipalFilme.disabled = false;
    txtPaisFilme.disabled = false;
    txtAnoLancamentoFilme.disabled = false;
    txtNotaFilme.disabled = false;

    btnNovoFilme.disabled = true;
    btnSalvarFilme.disabled = false;
    btnApagarFilme.disabled = true;
    btnCancelarFilme.disabled = false;

    tabelaFormularioFilmes.style.display = 'inline';
    tabelaFilmes.style.display = 'none';
}

function salvarFilme() {
    if (criandoNovoFilme) {
        criarFilme();
    } else {
        alterarFilme();
    }
}

function criarFilme() {
    const dadosFilme = {
        'titulo': txtTituloFilme.value,
        'diretor': txtDiretorFilme.value,
        'elencoPrincipal': txtElencoFilme.value,
        'pais': txtPaisFilme.value,
        'anoLancamento': txtAnoLancamentoFilme.value,
        'nota': txtNotaFilme.value
    };
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = 'Erro ao criar novo Filme (código ' + error.message + ')';
    }
    asyncCriarFilme(dadosFilme, inicializarFilme, errorHandler);
}

function alterarFilme() {
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = 'Erro ao alterar Filme (código ' + error.message + ')';
    }
    const dadosFilme = {
        'id': txtIdFilme.value,
        'titulo': txtTituloFilme.value,
        'diretor': txtDiretorFilme.value,
        'elencoPrincipal': txtElencoFilme.value,
        'pais': txtPaisFilme.value,
        'anoLancamento': txtAnoLancamentoFilme.value,
        'nota': txtNotaFilme.value
    };
    asyncAlterarFilme(dadosFilme, inicializarFilme, errorHandler);
}

function cancelarEdicaoFilme() {
    inicializarFilme();
}

function apagarFilme() {
    const id = txtIdFilme.value;
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = 'Erro ao apagar Filme (código ' + error.message + ')';
    }
    asyncApagarFilme(id, inicializarFilme, errorHandler);
}

//Funcoes Rest
async function asyncCriarFilme(dadosFilme, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosFilme),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerFilmes(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerFilmeById(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes/${id}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncAlterarFilme(dadosFilme, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes/${dadosFilme.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosFilme),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncApagarFilme(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/filmes/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => proxsucesso())
        .catch(proxerro);
}
