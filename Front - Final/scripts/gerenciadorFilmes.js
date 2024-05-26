//Variáveis de Tabela e Corpo de Tabela
const tabelaFilmes = document.querySelector('#tabelaFilmes');
const tabelaFormularioFilmes = document.querySelector('#tabelaFormularioFilmes');
const corpoTabelaFilmes = document.querySelector('#corpoTabelaFilmes');
const paragrafoMensagemFilmes = document.querySelector('#paragrafoMensagemFilmes');
//Variáveis do Filme
const txtIdFilme = document.querySelector('#txtIdFilme');
const txtTituloFilme = document.querySelector('#txtTituloFilme');
const txtPaisFilme = document.querySelector('#txtPaisFilme');
const txtAnoFilme = document.querySelector('#txtAnoFilme');
const txtUrlCapaFilme = document.querySelector('#txtCapaFilme');
const txtDiretorFilme = document.querySelector('#txtDiretorFilme');
const txtElencoFilme = document.querySelector('#txtElencoFilme');
const selectGeneroFilme = document.querySelector('#selectGeneroFilme');
//Variáveis de botão
const btnNovoFilme = document.querySelector('#btnNovoFilme');
const btnSalvarFilme = document.querySelector('#btnSalvarFilme');
const btnApagarFilme = document.querySelector('#btnApagarFilme');
const btnCancelarFilme = document.querySelector('#btnCancelarFilme');
var criandoNovoFilme = false;
var token = localStorage.getItem("token");

const urlPrincipalFilme = "https://indicai.onrender.com";

inicializarFilme();



function inicializarFilme() {
    criandoNovoFilme = false;
    paragrafoMensagemFilmes.textContent = 'Pressione o botão Novo ou selecione um Filme da lista:';
    txtIdFilme.value = '';
    txtTituloFilme.value = '';
    txtPaisFilme.value = '';
    txtAnoFilme.value = '';
    txtUrlCapaFilme.value = '';
    txtDiretorFilme.value = '';
    txtElencoFilme.value = '';

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = true;
    txtPaisFilme.disabled = true;
    txtAnoFilme.disabled = true;
    txtUrlCapaFilme.disabled = true;
    txtDiretorFilme.disabled = true;
    txtElencoFilme.disabled = true;

    carregarGenerosFilme();
    selectGeneroFilme.disable = true;

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

var generoFilme;

function preencherTabelaFilme(Filmes) {
    corpoTabelaFilmes.innerHTML = "";
    var n = Filmes.length;
    for (var i = 0; i < n; i++) {
        let c = Filmes[i];
        let linha = corpoTabelaFilmes.insertRow();
        let celulaId = linha.insertCell();
        let celulaTitulo = linha.insertCell();
        let celulaPais = linha.insertCell();
        let celulaAno = linha.insertCell();
        // let celulaUrlCapa = linha.insertCell();
        let celulaDiretor = linha.insertCell();
        let celulaElenco = linha.insertCell();
        let celulaGenero = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = c.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarFilme(c.id); };
        celulaId.appendChild(alink);
        celulaTitulo.textContent = c.titulo;
        celulaPais.textContent = c.pais;
        celulaAno.textContent = c.anoLancamento;
        // celulaUrlCapa.textContent = c.urlCapa;
        celulaDiretor.textContent = c.diretor;
        celulaElenco.textContent = c.elencoPrincipal;
        celulaGenero.textContent = c.genero.name;
        generoFilme = c.genero.name;
    }
}

function selecionarFilme(id) {
    criandoNovoFilme = false;
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = "Erro ao selecionar Filme (código " + error.message + ")";
    }
    asyncLerFilmeById(id, preencherFormularioFilme, errorHandler);
}

function preencherFormularioFilme(Filme) {
    paragrafoMensagemFilmes.textContent = 'Altere e salve os dados do Filme, ou então apague o registro do Filme.'
    txtIdFilme.value = Filme.id;
    txtTituloFilme.value = Filme.titulo;
    txtPaisFilme.value = Filme.pais;
    txtAnoFilme.value = Filme.anoLancamento;
    txtUrlCapaFilme.value = Filme.urlCapa;
    txtDiretorFilme.value = Filme.diretor;
    txtElencoFilme.value = Filme.elencoPrincipal;
    selectGeneroFilme.value = Filme.genero.id;

    console.log(Filme.genero.id);

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = false;
    txtPaisFilme.disabled = false;
    txtAnoFilme.disabled = false;
    txtUrlCapaFilme.disabled = false;
    txtDiretorFilme.disabled = false;
    txtElencoFilme.disabled = false;
    selectGeneroFilme.disabled = false;

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
    carregarGenerosFilme();

    txtIdFilme.value = '';
    txtTituloFilme.value = '';
    txtPaisFilme.value = '';
    txtAnoFilme.value = '';
    txtUrlCapaFilme.value = '';
    txtDiretorFilme.value = '';
    txtElencoFilme.value = '';
    selectGeneroFilme.selectedIndex = -1;

    txtIdFilme.disabled = true;
    txtTituloFilme.disabled = false;
    txtPaisFilme.disabled = false;
    txtAnoFilme.disabled = false;
    txtUrlCapaFilme.disabled = false;
    txtDiretorFilme.disabled = false;
    txtElencoFilme.disabled = false;
    selectGeneroFilme.disable = false;



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
        'anoLancamento': txtAnoFilme.value,
        'urlCapa': txtUrlCapaFilme.value,
        'diretor': txtDiretorFilme.value,
        'elencoPrincipal': txtElencoFilme.value,
        'genero': { 'id': selectGeneroFilme.value }
    };
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = 'Erro ao criar novo Filme (código ' + error.message + ')';
    }
    asyncCriarFilmes(dadosFilme, inicializarFilme, errorHandler);
}

function alterarFilme() {
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = 'Erro ao alterar Filme (código ' + error.message + ')';
    }
    const dadosFilme = {
        'id': txtIdFilme.value,
        'titulo': txtTituloFilme.value,
        'pais': txtPaisFilme.value,
        'anoLancamento': txtAnoFilme.value,
        'urlCapa': txtUrlCapaFilme.value,
        'diretor': txtDiretorFilme.value,
        'elencoPrincipal': txtElencoFilme.value,
        'genero': { 'id': selectGeneroFilme.value }

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

function carregarGenerosFilme() {
    const errorHandler = function (error) {
        paragrafoMensagemFilmes.textContent = "Erro ao carregar Generos (código " + error.message + ")";
    }
    asyncLerGenerosFilme(preencherSelectGenerosFilme, errorHandler);
}

function preencherSelectGenerosFilme(generosFilme) {
    var opcoes = '<option disable select value> Selecione um Genero </option>'
    var n = generosFilme.length;
    for (var i = 0; i < n; i++) {
        var e = generosFilme[i];
        opcoes += `<option value="${e.id}">${e.name}</option>`;
    }
    selectGeneroFilme.innerHTML = opcoes;
}

//Funcoes Rest

async function asyncCriarFilmes(dadosFilmes, proxsucesso, proxerro) {
    const URL = `${urlPrincipalFilme}/api/filmes`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosFilmes),
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

async function asyncLerFilmes(proxsucesso, proxerro) {
    const URL = `${urlPrincipalFilme}/api/filmes`;
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

async function asyncLerFilmeById(id, proxsucesso, proxerro) {
    const URL = `${urlPrincipalFilme}/api/filmes/${id}`;
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

async function asyncAlterarFilme(dadosFilme, proxsucesso, proxerro) {
    const URL = `${urlPrincipalFilme}/api/filmes/${dadosFilme.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosFilme),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncApagarFilme(id, proxsucesso, proxerro) {
    const URL = `${urlPrincipalFilme}/api/filmes/${id}`;
    const deleteRequest = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => proxsucesso())
        .catch(proxerro);
}

async function asyncLerGenerosFilme(proxsucesso, proxerro) {
    const URL = `${urlPrincipalFilme}/api/generos`;
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

// async function asyncCriarFilmes(dadosFilmes, proxsucesso, proxerro) {
//     const URL = `${urlPrincipalFilme}/api/filmes`;
//     const postRequest = {
//         method: 'POST',
//         body: JSON.stringify(dadosFilmes),
//         headers: { 'Content-type': 'application/json' }
//     };
//     fetch(URL, postRequest)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso())
//         .catch(proxerro);
// }

// async function asyncLerFilmes(proxsucesso, proxerro) {
//     const URL = `${urlPrincipalFilme}/api/filmes`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro);
// }

// async function asyncLerFilmeById(id, proxsucesso, proxerro) {
//     const URL = `${urlPrincipalFilme}/api/filmes/${id}`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro);
// }

// async function asyncAlterarFilme(dadosFilme, proxsucesso, proxerro) {
//     const URL = `${urlPrincipalFilme}/api/filmes/${dadosFilme.id}`;
//     const putRequest = {
//         method: 'PUT',
//         body: JSON.stringify(dadosFilme),
//         headers: { 'Content-type': 'application/json' }
//     };
//     fetch(URL, putRequest)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso())
//         .catch(proxerro);
// }

// async function asyncApagarFilme(id, proxsucesso, proxerro) {
//     const URL = `${urlPrincipalFilme}/api/filmes/${id}`;
//     const deleteRequest = {
//         method: 'DELETE'
//     };
//     fetch(URL, deleteRequest)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => proxsucesso())
//         .catch(proxerro);
// }

// async function asyncLerGenerosFilme(proxsucesso, proxerro) {
//     const URL = `${urlPrincipalFilme}/api/generos`;
//     fetch(URL)
//         .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
//         .then(resposta => resposta.json())
//         .then(jsonResponse => proxsucesso(jsonResponse))
//         .catch(proxerro);
// }

//Generos Avaliacoes

