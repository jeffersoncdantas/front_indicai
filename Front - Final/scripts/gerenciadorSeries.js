//Variáveis de Tabela e Corpo de Tabela
const tabelaSeries = document.querySelector('#tabelaSeries');
const tabelaFormularioSeries = document.querySelector('#tabelaFormularioSeries');
const corpoTabelaSeries = document.querySelector('#corpoTabelaSeries');
const paragrafoMensagemSeries = document.querySelector('#paragrafoMensagemSeries');
//Variáveis da Série
const txtIdSerie = document.querySelector('#txtIdSerie');
const txtTituloSerie = document.querySelector('#txtTituloSerie');
const txtPaisSerie = document.querySelector('#txtPaisSerie');
const txtAnoSerie = document.querySelector('#txtAnoSerie');
const txtCapaSerie = document.querySelector('#txtCapaSerie');
const txtDiretorSerie = document.querySelector('#txtDiretorSerie');
const txtElencoSerie = document.querySelector('#txtElencoSerie');
const txtNumeroTemporadas = document.querySelector('#txtNumeroTemporadas');
const selectGeneroSerie = document.querySelector('#selectGeneroSerie');
//Variáveis de botão
const btnNovaSerie = document.querySelector('#btnNovaSerie');
const btnSalvarSerie = document.querySelector('#btnSalvarSerie');
const btnApagarSerie = document.querySelector('#btnApagarSerie');
const btnCancelarSerie = document.querySelector('#btnCancelarSerie');
var criandoNovaSerie = false;

const urlPrincipalSerie = "https://indicai.onrender.com";
inicializarSerie();

function inicializarSerie() {
    criandoNovaSerie = false;
    paragrafoMensagemSeries.textContent = 'Pressione o botão Nova ou selecione uma Série da lista:';
    txtIdSerie.value = '';
    txtTituloSerie.value = '';
    txtPaisSerie.value = '';
    txtAnoSerie.value = '';
    txtCapaSerie.value = '';
    txtDiretorSerie.value = '';
    txtElencoSerie.value = '';
    txtNumeroTemporadas.value = '';

    txtIdSerie.disabled = true;
    txtTituloSerie.disabled = true;
    txtPaisSerie.disabled = true;
    txtAnoSerie.disabled = true;
    txtCapaSerie.disabled = true;
    txtDiretorSerie.disabled = true;
    txtElencoSerie.disabled = true;
    txtNumeroTemporadas.disabled = true;

    carregarGenerosSerie();
    selectGeneroSerie.disable = true;

    btnNovaSerie.disabled = false;
    btnSalvarSerie.disabled = true;
    btnApagarSerie.disabled = true;
    btnCancelarSerie.disabled = true;

    tabelaFormularioSeries.style.display = 'none';
    tabelaSeries.style.display = 'inline';

    listarTodasSeries();
}


function listarTodasSeries() {
    const errorHandler = function (error) {
        paragrafoMensagemSeries.textContent = "Erro ao listar Séries (código " + error.message + ")";
    }
    asyncLerSeries(preencherTabelaSerie, errorHandler);
}

function preencherTabelaSerie(series) {
    corpoTabelaSeries.innerHTML = "";
    var n = series.length;
    for (var i = 0; i < n; i++) {
        let s = series[i];
        let linha = corpoTabelaSeries.insertRow();
        let celulaId = linha.insertCell();
        let celulaTitulo = linha.insertCell();
        let celulaPais = linha.insertCell();
        let celulaAno = linha.insertCell();
        //let celulaCapa = linha.insertCell();
        let celulaDiretor = linha.insertCell();
        let celulaElenco = linha.insertCell();
        let celulaNumeroTemporadas = linha.insertCell();
        let celulaGenero = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = s.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarSerie(s.id); };
        celulaId.appendChild(alink);
        celulaTitulo.textContent = s.titulo;
        celulaPais.textContent = s.pais;
        celulaAno.textContent = s.anoLancamento;
        //celulaCapa.textContent = s.urlCapa;
        celulaDiretor.textContent = s.diretor;
        celulaElenco.textContent = s.elencoPrincipal;
        celulaNumeroTemporadas.textContent = s.numeroTemporadas;
        celulaGenero.textContent = s.genero.name;
    }
}

function selecionarSerie(id) {
    criandoNovaSerie = false;
    const errorHandler = function (error) {
        paragrafoMensagemSeries.textContent = "Erro ao selecionar Série (código " + error.message + ")";
    }
    asyncLerSerieById(id, preencherFormularioSerie, errorHandler);
}

function preencherFormularioSerie(serie) {
    paragrafoMensagemSeries.textContent = 'Altere e salve os dados da Série, ou então apague o registro da Série.'
    txtIdSerie.value = serie.id;
    txtTituloSerie.value = serie.titulo;
    txtPaisSerie.value = serie.pais;
    txtAnoSerie.value = serie.anoLancamento;
    txtCapaSerie.value = serie.urlCapa;
    txtDiretorSerie.value = serie.diretor;
    txtElencoSerie.value = serie.elencoPrincipal;
    txtNumeroTemporadas.value = serie.numeroTemporadas;
    selectGeneroSerie.value = serie.genero.id;

    txtIdSerie.disabled = true;
    txtTituloSerie.disabled = false;
    txtPaisSerie.disabled = false;
    txtAnoSerie.disabled = false;
    txtCapaSerie.disabled = false;
    txtDiretorSerie.disabled = false;
    txtElencoSerie.disabled = false;
    txtNumeroTemporadas.disabled = false;
    selectGeneroSerie.disabled = false;

    btnNovaSerie.disabled = true;
    btnSalvarSerie.disabled = false;
    btnApagarSerie.disabled = false;
    btnCancelarSerie.disabled = false;

    tabelaFormularioSeries.style.display = 'inline';
    tabelaSeries.style.display = 'none';
}

function novaSerie() {
    paragrafoMensagemSeries.textContent = 'Preencha os dados da nova Série...';
    criandoNovaSerie = true;
    carregarGenerosSerie();

    txtIdSerie.value = '';
    txtTituloSerie.value = '';
    txtPaisSerie.value = '';
    txtAnoSerie.value = '';
    txtCapaSerie.value = '';
    txtDiretorSerie.value = '';
    txtElencoSerie.value = '';
    txtNumeroTemporadas.value = '';
    selectGeneroSerie.selectedIndex = -1;

    txtIdSerie.disabled = true;
    txtTituloSerie.disabled = false;
    txtPaisSerie.disabled = false;
    txtAnoSerie.disabled = false;
    txtCapaSerie.disabled = false;
    txtDiretorSerie.disabled = false;
    txtElencoSerie.disabled = false;
    txtNumeroTemporadas.disabled = false;
    selectGeneroSerie.disable = false;


    btnNovaSerie.disabled = true;
    btnSalvarSerie.disabled = false;
    btnApagarSerie.disabled = true;
    btnCancelarSerie.disabled = false;

    tabelaFormularioSeries.style.display = 'inline';
    tabelaSeries.style.display = 'none';
}

function salvarSerie() {
    if (criandoNovaSerie) {
        criarSerie();
    } else {
        alterarSerie();
    }
}

function criarSerie() {
    const dadosSerie = {
        'titulo': txtTituloSerie.value,
        'pais': txtPaisSerie.value,
        'anoLancamento': txtAnoSerie.value,
        'urlCapa': txtCapaSerie.value,
        'diretor': txtDiretorSerie.value,
        'elencoPrincipal': txtElencoSerie.value,
        'numeroTemporadas': txtNumeroTemporadas.value,
        'genero': {'id': selectGeneroSerie.value}
    };
    const errorHandler = function (error) {
        paragrafoMensagemSeries.textContent = 'Erro ao criar nova Série (código ' + error.message + ')';
    }
    asyncCriarSeries(dadosSerie, inicializarSerie, errorHandler);
}

function alterarSerie() {
    const errorHandler = function (error) {
        paragrafoMensagemSeries.textContent = 'Erro ao alterar Série (código ' + error.message + ')';
    }
    const dadosSerie = {
        'id': txtIdSerie.value,
        'titulo': txtTituloSerie.value,
        'pais': txtPaisSerie.value,
        'anoLancamento': txtAnoSerie.value,
        'urlCapa': txtCapaSerie.value,
        'diretor': txtDiretorSerie.value,
        'elencoPrincipal': txtElencoSerie.value,
        'numeroTemporadas': txtNumeroTemporadas.value,
        'genero': {'id': selectGeneroSerie.value}
    };
    asyncAlterarSerie(dadosSerie, inicializarSerie, errorHandler);
}

function cancelarEdicaoSerie() {
    inicializarSerie();
}

function apagarSerie() {
    const id = txtIdSerie.value;
    const errorHandler = function (error) {
        paragrafoMensagemSeries.textContent = 'Erro ao apagar Série (código ' + error.message + ')';
    }
    asyncApagarSerie(id, inicializarSerie, errorHandler);
}

function carregarGenerosSerie(){
    const errorHandler = function(error){
        paragrafoMensagemSeries.textContent = "Erro ao carregar Gêneros (código " + error.message + ")";
    }
    asyncLerGenerosSerie(preencherSelectGenerosSerie, errorHandler);
}

function preencherSelectGenerosSerie(generosSerie){
    var opcoes = '<option disable select value> Selecione um Gênero </option>'
    var n = generosSerie.length;
    for (var i = 0; i < n; i++){
        var e = generosSerie[i];
        opcoes += `<option value="${e.id}">${e.name}</option>`;
    }
    selectGeneroSerie.innerHTML = opcoes;
}

//Funcoes Rest
async function asyncCriarSeries(dadosSeries, proxsucesso, proxerro) {
    const URL = `${urlPrincipalSerie}/api/series`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosSeries),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerSeries(proxsucesso, proxerro) {
    const URL = `${urlPrincipalSerie}/api/series`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerSerieById(id, proxsucesso, proxerro) {
    const URL = `${urlPrincipalSerie}/api/series/${id}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncAlterarSerie(dadosSerie, proxsucesso, proxerro) {
    const URL = `${urlPrincipalSerie}/api/series/${dadosSerie.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosSerie),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncApagarSerie(id, proxsucesso, proxerro) {
    const URL = `${urlPrincipalSerie}/api/series/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => proxsucesso())
        .catch(proxerro);
}

async function asyncLerGenerosSerie(proxsucesso, proxerro) {
    const URL = `${urlPrincipalSerie}/api/generos`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}