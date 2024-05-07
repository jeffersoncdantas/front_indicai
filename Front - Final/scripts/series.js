const tabelaSeries = document.querySelector('tabelaSeries');
const tabelaFormularioSeries = document.querySelector('#tabelaFormularioSeries');
const corpoTabelaSeries = document.querySelector('#corpoTabelaSeries');
const paragrafoMensagemSeries = document.querySelector('#paragrafoMensagemSeries');
const txtIdSerie = document.querySelector('#txtIdSerie');
const txtTituloSerie = document.querySelector('#txtTituloSerie');
const txtPaisSerie = document.querySelector('#txtPaisSerie');
const txtAnoLancamentoSerie = document.querySelector('#txtAnoLancamentoSerie');
const txtUrlCapaSerie = document.querySelector('txtUrlCapaSerie');
const txtDiretorSerie = document.querySelector('#txtDiretorSerie');
const txtElencoSerie = document.querySelector('#txtElencoSerie')
const txtNumTemp = document.querySelector('#txtNumTemp');
const txtNotaSerie = document.querySelector('#txtNotaSerie');
var sectionSeries = document.querySelector('#sectionSeries');

const tabelaAvaliacaoSeries = document.querySelector('#tabelaAvaliacaoSeries');
const tabelaFormularioAvaliacao = document.querySelector('#tabelaFormularioAvaliacao');
const corpoTabelaAvaliacaoSerie = document.querySelector('#corpoTabelaAvaliacaoSerie');
const paragrafoMensagemAvaliacao = document.querySelector('#paragrafoMensagemAvaliacao');
const txtIdAvaliacao = document.querySelector('#txtIdAvaliacao');
const txtNotaSerieAvaliacao = document.querySelector('#txtNotaSerieAvaliacao');
const txtComentarioSerie = document.querySelector('#txtComentarioSerie');
const txtIdUsuarioA = document.querySelector('#txtIdUsuarioA');

const btnSalvarAvaliacao = document.querySelector('#btnSalvarAvaliacao');
var criandoNovaAvaliacao = false;

const btnNovoSerie = document.querySelector('#btnNovoSerie');
const btnSalvarSerie = document.querySelector('#btnSalvarSerie');
const btnApagarSerie = document.querySelector('#btnApagarSerie');
const btnCancelarSerie = document.querySelector('#btnCancelarSerie');
var criandoNovaSerie = false;

incializarSerie();

function incializarSerie(){
    criandoNovaSerie = false;
    paragrafoMensagemSeries.textContent = 'Pressione o botão Novo ou selecione uma Série da lista:';

    txtIdSerie.value = '';
    txtTituloSerie = '';
    txtPaisSerie = '';
    txtAnoLancamentoSerie = '';
    txtUrlCapaSerie = '';
    txtDiretorSerie = '';
    txtElencoSerie = '';
    txtNumTemp = '';
    txtNotaSerie = '';

    txtIdSerie.disabled = true;
    txtTituloSerie.disabled = true;
    txtPaisSerie.disabled = true;
    txtAnoLancamentoSerie.disabled = true;
    txtUrlCapaSerie.disabled = true;
    txtDiretorSerie.disabled = true;
    txtElencoSerie.disabled = true;
    txtNumTemp.disabled = true;
    txtNotaSerie.disabled = true;

    btnNovoSerie.disabled = false;
    btnSalvarSerie.disabled = true;
    btnApagarSerie.disabled = true;
    btnCancelarSerie.disabled = true;

    tabelaFormularioSeries.style.display = 'none';
    tabelaSeries.style.display = 'inline';

    listarTodasSeries();
}

function listarTodasSeries(){
    asyncLerSeries(preencherTabelaSeries, errorHandler);
}

function preencherTabelaSeries(series){
    corpoTabelaSeries.innerHTML = "";
    exibirSeries(series);
    var n = series.length;
    for (var i = 0; i < n; i++){
        let serie = series[i];
        let linha = corpoTabelaSeries.insertRow();
        let celulaId = linha.insertCell();
        let celulaTitulo = linha.insertCell();
        let celulaPais = linha.insertCell();
        let celulaAnoLancamento = linha.insertCell();
        let celulaUrlCapa = linha.insertCell();
        let celulaDiretor = linha.insertCell();
        let celulaElencoPrincipal = linha.insertCell();
        let celulaNumTemp = linha.insertCell();
        let celulaNota = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = serie.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarSerie(serie.id); };
        celulaId.appendChild(alink);
        celulaTitulo.textContent = serie.titulo;
        celulaPais.textContent = serie.pais;
        celulaAnoLancamento.textContent = serie.anoLancamento;
        celulaUrlCapa.textContent = serie.urlCapa;
        celulaDiretor.textContent = serie.diretor;
        celulaElencoPrincipal.textContent = serie.elencoPrincipal;
        celulaNumTemp.textContent = serie.numeroTemporadas;
        celulaNota.textContent = serie.nota;
    }
}

function errorHandler(error) {
    paragrafoMensagemSeries.textContent = "Erro ao listar Séries (código " + error.message + ")";
}

function selecionarSerie(id) {
    criandoNovaSerie = false;
    asyncLerSerieById(id, preencherFormularioSerie, errorHandler);
}

function preencherFormularioSerie(serie) {
    paragrafoMensagemSeries.textContent = 'Altere e salve os dados do Série, ou então apague o registro do Série.'
    txtIdSerie.value = serie.id;
    txtTituloSerie.value = serie.titulo;
    txtPaisSerie.value = serie.pais;
    txtAnoLancamentoSerie.value = serie.anoLancamento;
    txtUrlCapaSerie.value = serie.txtUrlCapa;
    txtDiretorSerie.value = serie.diretor;
    txtElencoSerie.value = serie.elencoPrincipal;
    txtNumTemp.value = serie.numeroTemporadas;
    txtNotaSerie.value = serie.nota;

    txtIdSerie.disabled = true;
    txtTituloSerie.disabled = true;
    txtPaisSerie.disabled = true;
    txtAnoLancamentoSerie.disabled = true;
    txtUrlCapaSerie.disabled = true;
    txtDiretorSerie.disabled = true;
    txtElencoSerie.disabled = true;
    txtNumTemp.disabled = true;
    txtNotaSerie.disabled = true;

    btnNovoSerie.disabled = true;
    btnSalvarSerie.disabled = false;
    btnApagarSerie.disabled = false;
    btnCancelarSerie.disabled = false;

    tabelaFormularioSeries.style.display = 'inline';
    tabelaSeries.style.display = 'none';
}

function novaSerie() {
    paragrafoMensagemSeries.textContent = 'Preencha os dados da nova Série...';
    criandoNovaSerie = true;

    txtIdSerie.value = '';
    txtTituloSerie = '';
    txtPaisSerie = '';
    txtAnoLancamentoSerie = '';
    txtUrlCapaSerie = '';
    txtDiretorSerie = '';
    txtElencoSerie = '';
    txtNumTemp = '';
    txtNotaSerie = '';

    txtIdSerie.disabled = true;
    txtTituloSerie.disabled = false;
    txtPaisSerie.disabled = false;
    txtAnoLancamentoSerie.disabled = false;
    txtUrlCapaSerie.disabled = false;
    txtDiretorSerie.disabled = false;
    txtElencoSerie.disabled = false;
    txtNumTemp.disabled = false;
    txtNotaSerie.disabled = false;

    btnNovoSerie.disabled = true;
    btnSalvarSerie.disabled = false;
    btnApagarSerie.disabled = false;
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
        'anoLancamento': txtAnoLancamentoSerie.value,
        'urlCapa' : txtUrlCapaSerie.value,
        'diretor': txtDiretorSerie.value,
        'elencoPrincipal': txtElencoSerie.value,
        'nota': txtNotaSerie.value
    };
    const errorHandler = function (error) {
        paragrafoMensagemSeries.textContent = 'Erro ao criar nova Série (código ' + error.message + ')';
    }
    asyncCriarSerie(dadosSerie, inicializarSerie, errorHandler);
}

function alterarSerie() {
    const errorHandler = function (error) {
        paragrafoMensagemSeries.textContent = 'Erro ao alterar Série (código ' + error.message + ')';
    }
    const dadosSerie = {
        'titulo': txtTituloSerie.value,
        'pais': txtPaisSerie.value,
        'anoLancamento': txtAnoLancamentoSerie.value,
        'urlCapa' : txtUrlCapaSerie.value,
        'diretor': txtDiretorSerie.value,
        'elencoPrincipal': txtElencoSerie.value,
        'nota': txtNotaSerie.value
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

let serieClicadoId = null;
let serieClicadoUrl = null;
let serieClicadoTitulo = null;

function exibirSeries(series) {
    const seriesContainer = document.getElementById('series-container');
    seriesContainer.innerHTML = ""; // Limpa o conteúdo anterior

    series.forEach(serie => {
        // Cria um elemento card para cada serie
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.idSerie = serie.id;

        // Adiciona a imagem do serie ao card
        const imagem = document.createElement('img');
        imagem.src = serie.urlCapa;
        imagem.alt = serie.titulo;
        card.appendChild(imagem);

        // Adiciona o título do serie ao card
        const linkTitulo = document.createElement('a');
        linkTitulo.textContent = serie.titulo;
        linkTitulo.href = `#`;
        linkTitulo.addEventListener('click', function(event) {
            // Impede o comportamento padrão do link para evitar a navegação
            event.preventDefault();
            serieClicadoId = serie.id;
            serieClicadoUrl = serie.urlCapa;
            serieClicadoTitulo = serie.titulo;
            // Altera a visibilidade das seções para mostrar a seção de avaliação
            document.getElementById('recomendacoesSeries').style.display = 'none';
            document.getElementById('sectionAvaliação').style.display = 'block';
            exibirDetalhesSerieAvaliacao();

        });
        card.appendChild(linkTitulo);

        // Adiciona outrass informações do serie ao card
        const diretor = document.createElement('p');
        diretor.textContent = `Diretor: ${serie.diretor}`;
        card.appendChild(diretor);

        const ano = document.createElement('p');
        ano.textContent = `Ano: ${serie.anoLancamento}`;
        card.appendChild(ano);

        // Adiciona o card ao container de series
        seriesContainer.appendChild(card);
    });
}

function exibirDetalhesSerieAvaliacao() {
    // Exibe a imagem e o título do serie na seção de avaliação
    document.getElementById('serieClicadoId').textContent = `ID da Série: ${serieClicadoId}`;
    document.getElementById('imagemSerieAvaliacao').src = serieClicadoUrl;
    document.getElementById('tituloSerieAvaliacao').textContent = serieClicadoTitulo;
    document.getElementById('serieClicadoId').value = serieClicadoId;
    document.getElementById('serieClicadoId').disabled = true;
}

inicializarAvaliacao();

function inicializarAvaliacao() {
    paragrafoMensagemAvaliacao.textContent = 'Preencha as informações de avaliação:';
    txtIdAvaliacao.value = '';
    txtNotaSerie.value = '';
    txtComentarioSerie.value = '';
    txtIdUsuarioA.value = '';
    txtIdSerie.value = '';

    txtIdAvaliacao.disabled =true;
    txtNotaSerie.enabled = true;
    txtComentarioSerie.enabled = true;
    txtIdUsuarioA.enabled = true;
    txtIdSerie.disabled = true;

    btnSalvarAvaliacao.disabled = false;
    btnApagarAvaliacao.disabled = false;
    btnCancelarAvaliacao.disabled = false;

    listarTodasAvaliacoes();
}

function listarTodasAvaliacoes() {
    asyncLerAvaliacoes(preencherTabelaAvaliacoes, errorHandler);
}

function preencherTabelaAvaliacoes(avaliacoes) {
    corpoTabelaAvaliacaoSerie.innerHTML = "";
    var n = avaliacoes.length;
    for (var i = 0; i < n; i++) {
        let avaliacao = avaliacoes[i];
        let linha = corpoTabelaAvaliacaoSerie.insertRow();
	let celulaNotaSerie = linha.insertCell();
	let celulaComentario = linha.insertCell();
	let celulaIdUsuario = linha.insertCell();
	let celulaIdSerie = linha.insertCell();
        //let celulaId = linha.insertCell();
        
        //celulaId.textContent = avaliacao.id;
        celulaNotaSerie.textContent = avaliacao.nota;
        celulaComentario.textContent = avaliacao.comentario;
        celulaIdUsuario.textContent = avaliacao.usuario.id;
        celulaIdSerie.textContent = avaliacao.item.id;
    };
}

function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Séries (código " + error.message + ")";
}

function salvarAvaliacao() {
    const dadosAvaliacao = { // Aqui era dadosFilme, corrigido para dadosAvaliacao
        'nota': txtNotaSerieAvaliacao.value, // Aqui era nota, corrigido para notaFilme
        'comentario': txtComentarioSerie.value,
        'usuario': {"id": txtIdUsuarioA.value},
        'item': {"id": serieClicadoId},
    };
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao criar nova Avaliação (código ' + error.message + ')';
    }
    asyncCriarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler); // Aqui era dadosFilme, corrigido para dadosAvaliacao
}

//Funcoes Rest
async function asyncCriarSerie(dadosSerie, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/series`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosSerie),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerSeries(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/series`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro)
}

async function asyncLerSerieById(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/series/${id}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncAlterarSerie(dadosSerie, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/series/${dadosSerie.id}`;
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
    const URL = `https://indicai.onrender.com/api/series/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => proxsucesso())
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

async function asyncLerAvaliacoes(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}
