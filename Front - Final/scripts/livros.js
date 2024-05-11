const tabelaLivros = document.querySelector('#tabelaLivros');
const tabelaFormularioLivros = document.querySelector('#tabelaFormularioLivros');
const corpoTabelaLivros = document.querySelector('#corpoTabelaLivros');
const paragrafoMensagemLivros = document.querySelector('#paragrafoMensagemLivros');

const txtIdLivro = document.querySelector('#txtIdLivro');
const txtTituloLivro = document.querySelector('#txtTituloLivro');
const txtPaisLivro = document.querySelector('#txtPaisLivro');
const txtAnoLancamentoLivro = document.querySelector('#txtAnoLancamentoLivro');
const txtUrlCapaLivro = document.querySelector('#txtUrlCapaLivro');
const txtAutoresLivro = document.querySelector('#txtAutoresLivro');
const txtEditoraLivro = document.querySelector('#txtEditoraLivro');
const txtNotaLivro = document.querySelector('#txtNotaLivro');
var sectionLivros = document.querySelector("#sectionLivros");

const tabelaAvaliacaoLivros = document.querySelector('#tabelaAvaliacaoLivros');
const tabelaFormularioAvaliacao = document.querySelector('#tabelaFormularioAvaliacao');
const corpoTabelaAvaliacaoLivro = document.querySelector('#corpoTabelaAvaliacaoLivro');
const paragrafoMensagemAvaliacao = document.querySelector('#paragrafoMensagemAvaliacao');
const txtIdAvaliacao = document.querySelector('#txtIdAvaliacao');
const txtNotaLivroAvaliacao = document.querySelector('#txtNotaLivroAvaliacao');
const txtComentarioLivro = document.querySelector('#txtComentarioLivro');
const txtIdUsuarioA = document.querySelector('#txtIdUsuarioA');

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
    paragrafoMensagemLivros.textContent = 'Pressione o botão Novo ou selecione um Livro da lista:';
    txtIdLivro.value = '';
    txtTituloLivro.value = '';
    txtPaisLivro.value = '';
    txtAnoLancamentoLivro.value = '';
    txtUrlCapaLivro.value = '';
    txtAutoresLivro.value = '';
    txtEditoraLivro.value = '';
    txtNotaLivro.value = '';

    txtIdLivro.disabled = true;
    txtTituloLivro.disabled = true;
    txtPaisLivro.disabled = true;
    txtAnoLancamentoLivro.disabled = true;
    txtUrlCapaLivro.disabled = true;
    txtAutoresLivro.disabled = true;
    txtEditoraLivro.disabled = true;
    txtNotaLivro.disabled = true;

    btnNovoLivro.disabled = false;
    btnSalvarLivro.disabled = true;
    btnApagarLivro.disabled = true;
    btnCancelarLivro.disabled = true;

    tabelaFormularioLivros.style.display = 'none';
    tabelaLivros.style.display = 'inline';

    listarTodosLivros();
}

function listarTodosLivros() {
    asyncLerLivros(preencherTabelaLivro, errorHandler);
}

function preencherTabelaLivro(livros) {
    corpoTabelaLivros.innerHTML = "";
    exibirLivros(livros);
    var n = livros.length;
    for (var i = 0; i < n; i++) {
        let livro = livros[i];
        let linha = corpoTabelaLivros.insertRow();
        let celulaId = linha.insertCell();
        let celulaTitulo = linha.insertCell();
        let celulaPais = linha.insertCell();
        let celulaAnoLancamento = linha.insertCell();
        let celulaUrlCapa = linha.insertCell();
        let celulaAutores = linha.insertCell();
        let celulaEditora = linha.insertCell();
        let celulaNota = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = livro.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarLivro(livro.id); };
        celulaId.appendChild(alink);
        celulaTitulo.textContent = livro.titulo;
        celulaPais.textContent = livro.pais;
        celulaAnoLancamento.textContent = livro.anoLancamento;
        celulaUrlCapa.textContent = livro.urlCapa;
        celulaAutores.textContent = livro.autores;
        celulaEditora.textContent = livro.editora;
        celulaNota.textContent = livro.nota;
    };
}

function errorHandler(error) {
    paragrafoMensagemLivros.textContent = "Erro ao listar Livros (código " + error.message + ")";
}

function selecionarLivro(id) {
    criandoNovoLivro = false;
    asyncLerLivroById(id, preencherFormularioLivro, errorHandler);
}

function preencherFormularioLivro(livro) {
    paragrafoMensagemLivros.textContent = 'Altere e salve os dados do Livro, ou então apague o registro do Livro.'
    txtIdLivro.value = livro.id;
    txtTituloLivro.value = livro.titulo;
    txtPaisLivro.value = livro.pais;
    txtAnoLancamentoLivro.value = livro.anoLancamento;
    txtUrlCapaLivro.value = livro.urlCapa;
    txtAutoresLivro.value = livro.autores;
    txtEditoraLivro.value = livro.editora;
    txtNotaLivro.value = livro.nota;

    txtIdLivro.disabled = true;
    txtTituloLivro.disabled = false;
    txtPaisLivro.disabled = false;
    txtAnoLancamentoLivro.disabled = false;
    txtUrlCapaLivro.disabled = false;
    txtAutoresLivro.disabled = false;
    txtEditoraLivro.disabled = false;
    txtNotaLivro.disabled = false;

    btnNovoLivro.disabled = true;
    btnSalvarLivro.disabled = false;
    btnApagarLivro.disabled = false;
    btnCancelarLivro.disabled = false;

    tabelaFormularioLivros.style.display = 'inline';
    tabelaLivros.style.display = 'none';
}

function novoLivro() {
    paragrafoMensagemLivros.textContent = 'Preencha os dados do novo Livro...';
    criandoNovoLivro = true;

    txtIdLivro.value = '';
    txtTituloLivro.value = '';
    txtPaisLivro.value = '';
    txtAnoLancamentoLivro.value = '';
    txtUrlCapaLivro.value = '';
    txtAutoresLivro.value = '';
    txtEditoraLivro.value = '';
    txtNotaLivro.value = '';

    txtIdLivro.disabled = true;
    txtTituloLivro.disabled = false;
    txtPaisLivro.disabled = false;
    txtAnoLancamentoLivro.disabled = false;
    txtUrlCapaLivro.disabled = false;
    txtAutoresLivro.disabled = false;
    txtEditoraLivro.disabled = false;
    txtNotaLivro.disabled = false;

    btnNovoLivro.disabled = true;
    btnSalvarLivro.disabled = false;
    btnApagarLivro.disabled = false;
    btnCancelarLivro.disabled = false;

    tabelaFormularioLivros.style.display = 'inline';
    tabelaLivros.style.display = 'none';
}

function salvarLivro() {
    if (criandoNovoLivro) {
        criarLivro();
    } else {
        alterarLivro();
    }
}

function criarLivro() {
    const dadosLivro = {
        'titulo': txtTituloLivro.value,
        'pais': txtPaisLivro.value,
        'anoLancamento': txtAnoLancamentoLivro.value,
        'urlCapa' : txtUrlCapaLivro.value,
        'autores': txtAutoresLivro.value,
        'editora': txtEditoraLivro.value,
        'nota': txtNotaLivro.value
    };
    const errorHandler = function (error) {
        paragrafoMensagemLivros.textContent = 'Erro ao criar novo Livro (código ' + error.message + ')';
    }
    asyncCriarLivro(dadosLivro, inicializarLivro, errorHandler);
}

function alterarLivro() {
    const errorHandler = function (error) {
        paragrafoMensagemLivros.textContent = 'Erro ao alterar Livro (código ' + error.message + ')';
    }
    const dadosLivro = {
        'titulo': txtTituloLivro.value,
        'pais': txtPaisLivro.value,
        'anoLancamento': txtAnoLancamentoLivro.value,
        'urlCapa' : txtUrlCapaLivro.value,
        'autores': txtAutoresLivro.value,
        'editora': txtEditoraLivro.value,
        'nota': txtNotaLivro.value
    };
    asyncAlterarLivro(dadosLivro, inicializarLivro, errorHandler);
}

function cancelarEdicaoLivro() {
    inicializarLivro();
}

function apagarLivro() {
    const id = txtIdLivro.value;
    const errorHandler = function (error) {
        paragrafoMensagemLivros.textContent = 'Erro ao apagar Livro (código ' + error.message + ')';
    }
    asyncApagarLivro(id, inicializarLivro, errorHandler);
}

let livroClicadoId = null;
let livroClicadoUrl = null;
let livroClicadoTitulo = null;

function exibirLivros(livros) {
    const livrosContainer = document.getElementById('livros-container');
    livrosContainer.innerHTML = ""; // Limpa o conteúdo anterior

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
        linkTitulo.addEventListener('click', function(event) {
            // Impede o comportamento padrão do link para evitar a navegação
            event.preventDefault();
            livroClicadoId = livro.id;
            livroClicadoUrl = livro.urlCapa;
            livroClicadoTitulo = livro.titulo;
            // Altera a visibilidade das seções para mostrar a seção de avaliação
            document.getElementById('recomendacoesLivros').style.display = 'none';
            document.getElementById('sectionAvaliação').style.display = 'block';
            exibirDetalhesLivroAvaliacao();

        });
        card.appendChild(linkTitulo);

        // Adiciona outrass informações do livro ao card
        const diretor = document.createElement('p');
        diretor.textContent = `Diretor: ${livro.diretor}`;
        card.appendChild(diretor);

        const ano = document.createElement('p');
        ano.textContent = `Ano: ${livro.anoLancamento}`;
        card.appendChild(ano);

        // Adiciona o card ao container de livros
        livrosContainer.appendChild(card);
    });
}

function exibirDetalhesLivroAvaliacao() {
    // Exibe a imagem e o título do livro na seção de avaliação
    document.getElementById('livroClicadoId').textContent = `ID do Livro: ${livroClicadoId}`;
    document.getElementById('imagemLivroAvaliacao').src = livroClicadoUrl;
    document.getElementById('tituloLivroAvaliacao').textContent = livroClicadoTitulo;
    document.getElementById('livroClicadoId').value = livroClicadoId;
    document.getElementById('livroClicadoId').disabled = true;
}

inicializarAvaliacao();

function inicializarAvaliacao() {
    paragrafoMensagemAvaliacao.textContent = 'Preencha as informações de avaliação:';
    txtIdAvaliacao.value = '';
    txtNotaLivro.value = '';
    txtComentarioLivro.value = '';
    txtIdUsuarioA.value = '';
    txtIdLivro.value = '';

    txtIdAvaliacao.disabled =true;
    txtNotaLivro.enabled = true;
    txtComentarioLivro.enabled = true;
    txtIdUsuarioA.enabled = true;
    txtIdLivro.disabled = true;

    btnSalvarAvaliacao.disabled = false;
    btnApagarAvaliacao.disabled = false;
    btnCancelarAvaliacao.disabled = false;

    listarTodasAvaliacoes();
}

function listarTodasAvaliacoes() {
    asyncLerAvaliacoes(preencherTabelaAvaliacoes, errorHandler);
}

function preencherTabelaAvaliacoes(avaliacoes) {
    corpoTabelaAvaliacaoLivro.innerHTML = "";
    var n = avaliacoes.length;
    for (var i = 0; i < n; i++) {
        let avaliacao = avaliacoes[i];
        let linha = corpoTabelaAvaliacaoLivro.insertRow();
	let celulaNotaLivro = linha.insertCell();
	let celulaComentario = linha.insertCell();
	let celulaIdUsuario = linha.insertCell();
	let celulaIdLivro = linha.insertCell();
        //let celulaId = linha.insertCell();
        
        //celulaId.textContent = avaliacao.id;
        celulaNotaLivro.textContent = avaliacao.nota;
        celulaComentario.textContent = avaliacao.comentario;
        celulaIdUsuario.textContent = avaliacao.usuario.id;
        celulaIdLivro.textContent = avaliacao.item.id;
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
async function asyncCriarLivro(dadosLivro, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/livros`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosLivro),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

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

async function asyncAlterarLivro(dadosLivro, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/livros/${dadosLivro.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosLivro),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncApagarLivro(id, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/livros/${id}`;
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




