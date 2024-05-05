const tabelaFilmes = document.querySelector('#tabelaFilmes');
const tabelaFormularioFilmes = document.querySelector('#tabelaFormularioFilmes');
const corpoTabelaFilmes = document.querySelector('#corpoTabelaFilmes');
const paragrafoMensagemFilmes = document.querySelector('#paragrafoMensagemFilmes');
const txtIdFilme = document.querySelector('#txtIdFilme');
const txtTituloFilme = document.querySelector('#txtTituloFilme');
const txtPaisFilme = document.querySelector('#txtPaisFilme');
const txtAnoLancamentoFilme = document.querySelector('#txtAnoLancamentoFilme');
const txtUrlCapa = document.querySelector('#txtUrlCapa');
const txtDiretorFilme = document.querySelector('#txtDiretorFilme');
const txtElencoPrincipalFilme = document.querySelector('#txtElencoFilme');
const txtNotaFilme = document.querySelector('#txtNotaFilme');
var sectionFilmes = document.querySelector("#sectionFilmes");

const btnNovoFilme = document.querySelector('#btnNovoFilme');
const btnSalvarFilme = document.querySelector('#btnSalvarFilme');
const btnApagarFilme = document.querySelector('#btnApagarFilme');
const btnCancelarFilme = document.querySelector('#btnCancelarFilme');
var criandoNovoFilme = false;


inicializarFilme();

function inicializarFilme() {
    criandoNovoFilme = false;
    paragrafoMensagemFilmes.textContent = 'Pressione o botão Novo ou selecione um Filme da lista:';
    txtIdFilme.value = '';
    txtTituloFilme.value = '';
    txtPaisFilme.value = '';
    txtAnoLancamentoFilme.value = '';
    txtUrlCapa.value = '';
    txtDiretorFilme.value = '';
    txtElencoPrincipalFilme.value = '';  
    txtNotaFilme.value = '';

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = true;
    txtPaisFilme.disabled = true;
    txtAnoLancamentoFilme.disabled = true;
    txtUrlCapa.disabled = true;
    txtDiretorFilme.disabled = true;
    txtElencoPrincipalFilme.disabled = true;
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
    asyncLerFilmes(preencherTabelaFilme, errorHandler);
}

function preencherTabelaFilme(filmes) {
    corpoTabelaFilmes.innerHTML = "";
    exibirFilmes(filmes);
    var n = filmes.length;
    for (var i = 0; i < n; i++) {
        let filme = filmes[i];
        let linha = corpoTabelaFilmes.insertRow();
        let celulaId = linha.insertCell();
        let celulaTitulo = linha.insertCell();
        let celulaPais = linha.insertCell();
        let celulaAnoLancamento = linha.insertCell();
        let celulaUrlCapa = linha.insertCell();
        let celulaDiretor = linha.insertCell();
        let celulaElencoPrincipal = linha.insertCell();
        let celulaNota = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = filme.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarFilme(filme.id); };
        celulaId.appendChild(alink);
        celulaTitulo.textContent = filme.titulo;
        celulaPais.textContent = filme.pais;
        celulaAnoLancamento.textContent = filme.anoLancamento;
        celulaUrlCapa.textContent = filme.urlCapa;
        celulaDiretor.textContent = filme.diretor;
        celulaElencoPrincipal.textContent = filme.elencoPrincipal;
        celulaNota.textContent = filme.nota;
    };
}

function errorHandler(error) {
    paragrafoMensagemFilmes.textContent = "Erro ao listar Filmes (código " + error.message + ")";
}

function selecionarFilme(id) {
    criandoNovoFilme = false;
    asyncLerFilmeById(id, preencherFormularioFilme, errorHandler);
}


function preencherFormularioFilme(filme) {
    paragrafoMensagemFilmes.textContent = 'Altere e salve os dados do Filme, ou então apague o registro do Filme.'
    txtIdFilme.value = filme.id;
    txtTituloFilme.value = filme.titulo;
    txtPaisFilme.value = filme.pais;
    txtAnoLancamentoFilme.value = filme.anoLancamento;
    txtUrlCapa.value = filme.txtUrlCapa;
    txtDiretorFilme.value = filme.diretor;
    txtElencoPrincipalFilme.value = filme.elencoPrincipal;
    txtNotaFilme.value = filme.nota;

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = false;
    txtPaisFilme.disabled = false;
    txtAnoLancamentoFilme.disabled = false;
    txtUrlCapa.disabled = true;
    txtDiretorFilme.disabled = false;
    txtElencoPrincipalFilme.disabled = false;
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
    txtPaisFilme.value = '';
    txtAnoLancamentoFilme.value = '';
    txtUrlCapa.value = '';
    txtDiretorFilme.value = '';
    txtElencoPrincipalFilme.value = '';
    txtNotaFilme.value = '';

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = false;
    txtPaisFilme.disabled = false;
    txtAnoLancamentoFilme.disabled = false;
    txtUrlCapa.disabled = false;
    txtDiretorFilme.disabled = false;
    txtElencoPrincipalFilme.disabled = false;
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
        'pais': txtPaisFilme.value,
        'anoLancamento': txtAnoLancamentoFilme.value,
        'urlCapa' : txtUrlCapa.value,
        'diretor': txtDiretorFilme.value,
        'elencoPrincipal': txtElencoFilme.value,
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
        'titulo': txtTituloFilme.value,
        'pais': txtPaisFilme.value,
        'anoLancamento': txtAnoLancamentoFilme.value,
        'urlCapa' : txtUrlCapa.value,
        'diretor': txtDiretorFilme.value,
        'elencoPrincipal': txtElencoFilme.value,
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

function exibirFilmes(filmes) {
    const filmesContainer = document.getElementById('filmes-container');
    filmesContainer.innerHTML = ""; // Limpa o conteúdo anterior

    filmes.forEach(filme => {
        // Cria um elemento card para cada filme
        const card = document.createElement('div');
        card.classList.add('card');

        // Adiciona a imagem do filme ao card
        const imagem = document.createElement('img');
        imagem.src = filme.urlCapa;
        imagem.alt = filme.titulo;
        card.appendChild(imagem);

        // Adiciona o título do filme ao card
        const titulo = document.createElement('h2');
        titulo.textContent = filme.titulo;
        card.appendChild(titulo);

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
