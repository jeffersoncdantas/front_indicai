const tabelaLivros = document.querySelector('#tabelaLivros');
const tabelaFormularioLivros = document.querySelector('#tabelaFormularioLivros');
const corpoTabelaLivros = document.querySelector('#corpoTabelaLivros');

const tabelaAvaliacaoLivros = document.querySelector('#tabelaAvaliacaoLivros');
const tabelaFormularioAvaliacao = document.querySelector('#tabelaFormularioAvaliacao');
const corpoTabelaAvaliacaoLivro = document.querySelector('#corpoTabelaAvaliacaoLivro');
const paragrafoMensagemAvaliacao = document.querySelector('#paragrafoMensagemAvaliacao');
const txtIdAvaliacao = document.querySelector('#txtIdAvaliacao');
const txtNotaLivroAvaliacao = document.querySelector('#txtNotaLivroAvaliacao');
const txtComentarioLivro = document.querySelector('#txtComentarioLivro');
const txtIdUsuarioA = document.querySelector('#txtIdUsuarioA');
const txtIdLivro = document.querySelector('#txtIdLivro');

const btnSalvarAvaliacao = document.querySelector('#btnSalvarAvaliacao');
const btnApagarAvaliacao = document.querySelector('#btnApagarAvaliacao');
const btnCancelarAvaliacao = document.querySelector('#btnCancelarAvaliacao');
var criandoNovaAvaliacao = false;

const btnNovoLivro = document.querySelector('#btnNovoLivro');
const btnSalvarLivro = document.querySelector('#btnSalvarLivro');
const btnApagarLivro = document.querySelector('#btnApagarLivro');
const btnCancelarLivro = document.querySelector('#btnCancelarLivro');
var criandoNovoLivro = false;

inicializarLivro();

function inicializarLivro() {
    criandoNovoLivro = false;
    listarTodosLivros();
}

function listarTodosLivros() {
    asyncLerLivros(preencherTabelaLivro, errorHandler);
}

function preencherTabelaLivro(livros) {
    exibirLivros(livros);
}

function errorHandler(error) {
    paragrafoMensagemLivros.textContent = "Erro ao listar Livros (código " + error.message + ")";
}

let livroClicadoId = null;
let livroClicadoUrl = null;
let livroClicadoTitulo = null;

function exibirLivros(livros) {
    const livrosContainer = document.getElementById('livros-container');
    livrosContainer.innerHTML = ""; 

    livros.forEach(livro => {
        // Cria um elemento card para cada livro
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.idLivro = livro.id;

        // Adiciona a imagem do livro ao card
        const imagem = document.createElement('img');
        imagem.src = livro.urlCapa;
        imagem.alt = livro.titulo;
        card.appendChild(imagem);

        // Adiciona o título do livro ao card
        const linkTitulo = document.createElement('a');
        linkTitulo.textContent = livro.titulo;
        linkTitulo.href = `#`;
        linkTitulo.classList.add('linkTitulo');
        
        card.appendChild(linkTitulo);
        
        linkTitulo.addEventListener('click', function(event) {
            // Impede o comportamento padrão do link
            event.preventDefault();
            livroClicadoId = livro.id;
            livroClicadoUrl = livro.urlCapa;
            livroClicadoTitulo = livro.titulo;

            txtIdLivro.value = livroClicadoId;
            
            document.getElementById('recomendacoesLivros').style.display = 'none';
            document.getElementById('sectionAvaliação').style.display = 'block';
            exibirDetalhesLivroAvaliacao();

        });

        // Adiciona outras informações do livro ao card
        const autor = document.createElement('p');
        autor.textContent = `Autor: ${livro.autores}`;
        card.appendChild(autor);

        const ano = document.createElement('p');
        ano.textContent = `Ano: ${livro.anoLancamento}`;
        card.appendChild(ano);

        // Adiciona o card ao container de livros
        livrosContainer.appendChild(card);
    });
}

function exibirDetalhesLivroAvaliacao() {
    document.getElementById('livroClicadoId').textContent = `ID do Livro: ${livroClicadoId}`;
    document.getElementById('imagemLivroAvaliacao').src = livroClicadoUrl;
    document.getElementById('tituloLivroAvaliacao').textContent = livroClicadoTitulo;
    document.getElementById('livroClicadoId').value = livroClicadoId;
    document.getElementById('livroClicadoId').disabled = true;

    // Listar avaliações específicas para este livro
    listarTodasAvaliacoes(livroClicadoId);
}

//AVALIAÇÃO DE LIVRO
inicializarAvaliacao();

function inicializarAvaliacao() {
    paragrafoMensagemAvaliacao.textContent = 'Preencha as informações de avaliação:';
    txtIdAvaliacao.value = '';
    txtNotaLivroAvaliacao.value = '';
    txtComentarioLivro.value = '';
    txtIdUsuarioA.value = '';
    txtIdLivro.value = '';

    txtIdAvaliacao.disabled =true;
    txtNotaLivroAvaliacao.enabled = true;
    txtComentarioLivro.enabled = true;
    txtIdUsuarioA.enabled = true;
    txtIdLivro.disabled = true;

    btnSalvarAvaliacao.disabled = false;
    btnApagarAvaliacao.disabled = false;
    btnCancelarAvaliacao.disabled = false;

    listarTodasAvaliacoes();
}

function listarTodasAvaliacoes(idLivro) {
    asyncLerAvaliacoes(idLivro, preencherTabelaAvaliacoes, errorHandler);
}

function preencherTabelaAvaliacoes(avaliacoes) {
    corpoTabelaAvaliacaoLivro.innerHTML = "";
    var n = avaliacoes.length;
    for (var i = 0; i < n; i++) {
        let avaliacao = avaliacoes[i];
        // Verifica se o ID do livro na avaliação é igual ao ID do livro clicado
        if (avaliacao.item.id === livroClicadoId) {
            let linha = corpoTabelaAvaliacaoLivro.insertRow();
            let celulaNotaLivro = linha.insertCell();
            let celulaComentario = linha.insertCell();
            let celulaIdUsuario = linha.insertCell();
            let celulaIdLivro = linha.insertCell();

            celulaNotaLivro.textContent = avaliacao.nota;
            celulaComentario.textContent = avaliacao.comentario;
            celulaIdUsuario.textContent = avaliacao.usuario.id;
            celulaIdLivro.textContent = avaliacao.item.id;
        }
    };
}


function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Livros (código " + error.message + ")";
}

function salvarAvaliacao() {
    const dadosAvaliacao = { 
        'nota': txtNotaLivroAvaliacao.value, 
        'comentario': txtComentarioLivro.value,
        'usuario': {"id": txtIdUsuarioA.value},
        'item': {"id": livroClicadoId},
    };
    const errorHandler = function (error) {
        paragrafoMensagemAvaliacao.textContent = 'Erro ao criar nova Avaliação (código ' + error.message + ')';
    }
    asyncCriarAvaliacao(dadosAvaliacao, inicializarAvaliacao, errorHandler); // Aqui era dadosFilme, corrigido para dadosAvaliacao
}

//Funcoes Rest
async function asyncLerLivros(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/livros`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro)
}

async function asyncLerLivroById(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/livros/${id}`;
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

async function asyncLerAvaliacoes(idLivro, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idLivro}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}