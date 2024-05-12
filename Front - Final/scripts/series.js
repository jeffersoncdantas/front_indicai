const tabelaSeries = document.querySelector('#tabelaSeries');
const tabelaFormularioSeries = document.querySelector('#tabelaFormularioSeries');
const corpoTabelaSeries = document.querySelector('#corpoTabelaSeries');
const paragrafoMensagemSeries = document.querySelector('#paragrafoMensagemSeries');

const tabelaAvaliacaoSeries = document.querySelector('#tabelaAvaliacaoSeries');
const tabelaFormularioAvaliacao = document.querySelector('#tabelaFormularioAvaliacao');
const corpoTabelaAvaliacaoSerie = document.querySelector('#corpoTabelaAvaliacaoSerie');
const paragrafoMensagemAvaliacao = document.querySelector('#paragrafoMensagemAvaliacao');
const txtIdAvaliacao = document.querySelector('#txtIdAvaliacao');
const txtNotaSerieAvaliacao = document.querySelector('#txtNotaSerieAvaliacao');
const txtComentarioSerie = document.querySelector('#txtComentarioSerie');
const txtIdUsuarioA = document.querySelector('#txtIdUsuarioA');
const txtIdSerie = document.querySelector('#txtIdSerie');

const btnSalvarAvaliacao = document.querySelector('#btnSalvarAvaliacao');
var criandoNovaAvaliacao = false;

const btnNovoSerie = document.querySelector('#btnNovoSerie');
const btnSalvarSerie = document.querySelector('#btnSalvarSerie');
const btnApagarSerie = document.querySelector('#btnApagarSerie');
const btnCancelarSerie = document.querySelector('#btnCancelarSerie');
var criandoNovaSerie = false;

inicializarSerie();

function inicializarSerie(){
    criandoNovaSerie = false;
    listarTodasSeries();
}

function listarTodasSeries(){
    asyncLerSeries(preencherTabelaSeries, errorHandler);
}

function preencherTabelaSeries(series){
    exibirSeries(series);
}

function errorHandler(error) {
    paragrafoMensagemSeries.textContent = "Erro ao listar Séries (código " + error.message + ")";
}

let serieClicadoId = null;
let serieClicadoUrl = null;
let serieClicadoTitulo = null;

function exibirSeries(series) {
    const seriesContainer = document.getElementById('series-container');
    seriesContainer.innerHTML = ""; 

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
        linkTitulo.classList.add('linkTitulo');
        linkTitulo.addEventListener('click', function(event) {
            // Impede o comportamento padrão do link
            event.preventDefault();
            serieClicadoId = serie.id;
            serieClicadoUrl = serie.urlCapa;
            serieClicadoTitulo = serie.titulo;

            txtIdSerie.value = serieClicadoId;

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
    
    document.getElementById('serieClicadoId').textContent = `ID da Série: ${serieClicadoId}`;
    document.getElementById('imagemSerieAvaliacao').src = serieClicadoUrl;
    document.getElementById('tituloSerieAvaliacao').textContent = serieClicadoTitulo;
    document.getElementById('serieClicadoId').value = serieClicadoId;
    document.getElementById('serieClicadoId').disabled = true;

    listarTodasAvaliacoes(filmeClicadoId);

}

inicializarAvaliacao();

function inicializarAvaliacao() {
    paragrafoMensagemAvaliacao.textContent = 'Preencha as informações de avaliação:';
    txtIdAvaliacao.value = '';
    txtNotaSerieAvaliacao.value = '';
    txtComentarioSerie.value = '';
    txtIdUsuarioA.value = '';
    txtIdSerie.value = '';

    txtIdAvaliacao.disabled =true;
    txtNotaSerieAvaliacao.enabled = true;
    txtComentarioSerie.enabled = true;
    txtIdUsuarioA.disabled = true;
    txtIdSerie.disabled = true;

    btnSalvarAvaliacao.disabled = false;

    listarTodasAvaliacoes();
}

function listarTodasAvaliacoes(idSerie) {
    asyncLerAvaliacoes(idSerie, preencherTabelaAvaliacoes, errorHandler);
}

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    const idUsuario = localStorage.getItem("idUsuario");
    if (idUsuario) {
        // Se estiver logado, defina o valor do campo txtIdUsuarioA como ID do usuário
        document.getElementById('txtIdUsuarioA').value = idUsuario;
    }
});

function preencherTabelaAvaliacoes(avaliacoes) {
    corpoTabelaAvaliacaoSerie.innerHTML = "";
    var n = avaliacoes.length;
    for (var i = 0; i < n; i++) {
        let avaliacao = avaliacoes[i];

        if (avaliacao.item.id === serieClicadoId) {
            let linha = corpoTabelaAvaliacaoSerie.insertRow();
            let celulaNotaSerie = linha.insertCell();
            let celulaComentario = linha.insertCell();
            let celulaIdUsuario = linha.insertCell();
            let celulaIdSerie = linha.insertCell();

            celulaNotaSerie.textContent = avaliacao.nota;
            celulaComentario.textContent = avaliacao.comentario;
            celulaIdUsuario.textContent = avaliacao.usuario.id;
            celulaIdSerie.textContent = avaliacao.item.id;
        }
    };
}


function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Séries (código " + error.message + ")";
}

function salvarAvaliacao() {
    const dadosAvaliacao = { 
        'nota': txtNotaSerieAvaliacao.value, 
        'comentario': txtComentarioSerie.value,
        'usuario': {"id": txtIdUsuarioA.value},
        'item': {"id": serieClicadoId},
    };
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao criar nova Avaliação (código ' + error.message + ')';
    }
    asyncCriarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler);
}

//Funcoes Rest
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

async function asyncLerAvaliacoes(idSerie, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idSerie}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

