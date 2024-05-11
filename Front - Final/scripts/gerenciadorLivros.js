// Variáveis de Tabela e Corpo de Tabela
const tabelaLivros = document.querySelector('#tabelaLivros');
const tabelaFormularioLivros = document.querySelector('#tabelaFormularioLivros');
const corpoTabelaLivros = document.querySelector('#corpoTabelaLivros');
const paragrafoMensagemLivros = document.querySelector('#paragrafoMensagemLivros');
// Variáveis do Livro
const txtIdLivro = document.querySelector('#txtIdLivro');
const txtTituloLivro = document.querySelector('#txtTituloLivro');
const txtPaisLivro = document.querySelector('#txtPaisLivro');
const txtAnoLivro = document.querySelector('#txtAnoLivro');
const txtCapaLivro = document.querySelector('#txtUrlCapaLivro');
const txtAutoresLivro = document.querySelector('#txtAutoresLivro');
const txtEditoraLivro = document.querySelector('#txtEditoraLivro');
const selectGeneroLivro = document.querySelector('#selectGeneroLivro');
// Variáveis de botão
const btnNovoLivro = document.querySelector('#btnNovoLivro');
const btnSalvarLivro = document.querySelector('#btnSalvarLivro');
const btnApagarLivro = document.querySelector('#btnApagarLivro');
const btnCancelarLivro = document.querySelector('#btnCancelarLivro');
let criandoNovoLivro = false;

const urlPrincipalLivro = "https://indicai.onrender.com";

inicializarLivro();

function inicializarLivro() {
    criandoNovoLivro = false;
    paragrafoMensagemLivros.textContent = 'Pressione o botão Novo ou selecione um Livro da lista:';
    txtIdLivro.value = '';
    txtTituloLivro.value = '';
    txtPaisLivro.value = '';
    txtAnoLivro.value = '';
    txtCapaLivro.value = '';
    txtAutoresLivro.value = '';
    txtEditoraLivro.value = '';

    txtIdLivro.disabled = true;
    txtTituloLivro.disabled = true;
    txtPaisLivro.disabled = true;
    txtAnoLivro.disabled = true;
    txtCapaLivro.disabled = true;
    txtAutoresLivro.disabled = true;
    txtEditoraLivro.disabled = true;

    carregarGenerosLivro();
    selectGeneroLivro.disable = true;

    btnNovoLivro.disabled = false;
    btnSalvarLivro.disabled = true;
    btnApagarLivro.disabled = true;
    btnCancelarLivro.disabled = true;

    tabelaFormularioLivros.style.display = 'none';
    tabelaLivros.style.display = 'inline';

    listarTodosLivros();
}

function listarTodosLivros() {
    const errorHandler = function (error) {
        paragrafoMensagemLivros.textContent = "Erro ao listar Livros (código " + error.message + ")";
    }
    asyncLerLivros(preencherTabelaLivro, errorHandler);
}

function preencherTabelaLivro(livros) {
    corpoTabelaLivros.innerHTML = "";
    const n = livros.length;
    for (let i = 0; i < n; i++) {
        const livro = livros[i];
        const linha = corpoTabelaLivros.insertRow();
        const celulaId = linha.insertCell();
        const celulaTitulo = linha.insertCell();
        const celulaPais = linha.insertCell();
        const celulaAno = linha.insertCell();
        //  const celulaCapa = linha.insertCell();
        const celulaAutores = linha.insertCell();
        const celulaEditora = linha.insertCell();
        const celulaGenero = linha.insertCell();

        const alink = document.createElement('a');
        alink.textContent = livro.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarLivro(livro.id); };
        celulaId.appendChild(alink);
        celulaTitulo.textContent = livro.titulo;
        celulaPais.textContent = livro.pais;
        celulaAno.textContent = livro.anoLancamento;
        //celulaCapa.textContent = livro.urlCapa;
        celulaAutores.textContent = livro.autores;
        celulaEditora.textContent = livro.editora;
        celulaGenero.textContent = livro.genero.name;
    }
}

function selecionarLivro(id) {
    criandoNovoLivro = false;
    const errorHandler = function (error) {
        paragrafoMensagemLivros.textContent = "Erro ao selecionar Livro (código " + error.message + ")";
    }
    asyncLerLivroById(id, preencherFormularioLivro, errorHandler);
}

function preencherFormularioLivro(livro) {
    paragrafoMensagemLivros.textContent = 'Altere e salve os dados do Livro, ou então apague o registro do Livro.'
    txtIdLivro.value = livro.id;
    txtTituloLivro.value = livro.titulo;
    txtPaisLivro.value = livro.pais;
    txtAnoLivro.value = livro.anoLancamento;
    txtCapaLivro.value = livro.urlCapa;
    txtAutoresLivro.value = livro.autores;
    txtEditoraLivro.value = livro.editora;
    selectGeneroLivro.value = livro.genero.id;

    txtIdLivro.disabled = true;
    txtTituloLivro.disabled = false;
    txtPaisLivro.disabled = false;
    txtAnoLivro.disabled = false;
    txtCapaLivro.disabled = false;
    txtAutoresLivro.disabled = false;
    txtEditoraLivro.disabled = false;
    selectGeneroLivro.disabled = false;

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
    carregarGenerosLivro();

    txtIdLivro.value = '';
    txtTituloLivro.value = '';
    txtPaisLivro.value = '';
    txtAnoLivro.value = '';
    txtCapaLivro.value = '';
    txtAutoresLivro.value = '';
    txtEditoraLivro.value = '';
    selectGeneroLivro.selectedIndex = -1;

    txtIdLivro.disabled = true;
    txtTituloLivro.disabled = false;
    txtPaisLivro.disabled = false;
    txtAnoLivro.disabled = false;
    txtCapaLivro.disabled = false;
    txtAutoresLivro.disabled = false;
    txtEditoraLivro.disabled = false;
    selectGeneroLivro.selectedIndex = -1;


    btnNovoLivro.disabled = true;
    btnSalvarLivro.disabled = false;
    btnApagarLivro.disabled = true;
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
        'anoLancamento': txtAnoLivro.value,
        'urlCapa': txtCapaLivro.value,
        'autores': txtAutoresLivro.value,
        'editora': txtEditoraLivro.value,
        'genero': {'id': selectGeneroLivro.value}
    };
    const errorHandler = function (error) {
        paragrafoMensagemLivros.textContent = 'Erro ao criar novo Livro (código ' + error.message + ')';
    }
    asyncCriarLivros(dadosLivro, inicializarLivro, errorHandler);
}

function alterarLivro() {
    const errorHandler = function (error) {
        paragrafoMensagemLivros.textContent = 'Erro ao alterar Livro (código ' + error.message + ')';
    }
    const dadosLivro = {
        'id': txtIdLivro.value,
        'titulo': txtTituloLivro.value,
        'pais': txtPaisLivro.value,
        'anoLancamento': txtAnoLivro.value,
        'urlCapa': txtCapaLivro.value,
        'autores': txtAutoresLivro.value,
        'editora': txtEditoraLivro.value,
        'genero': {'id': selectGeneroLivro.value}
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

function carregarGenerosLivro(){
    const errorHandler = function(error){
        paragrafoMensagemLivros.textContent = "Erro ao carregar Gêneros (código " + error.message + ")";
    }
    asyncLerGenerosLivro(preencherSelectGenerosLivro, errorHandler);
}

function preencherSelectGenerosLivro(generosLivro){
    let opcoes = '<option disable select value> Selecione um Gênero </option>';
    const n = generosLivro.length;
    for (let i = 0; i < n; i++){
        const genero = generosLivro[i];
        opcoes += `<option value="${genero.id}">${genero.name}</option>`;
    }
    selectGeneroLivro.innerHTML = opcoes;
}


//Funções REST
async function asyncCriarLivros(dadosLivro, proxsucesso, proxerro) {
    const URL = `${urlPrincipalLivro}/api/livros`;
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
    const URL = `${urlPrincipalLivro}/api/livros`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerLivroById(id, proxsucesso, proxerro) {
    const URL = `${urlPrincipalLivro}/api/livros/${id}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncAlterarLivro(dadosLivro, proxsucesso, proxerro) {
    const URL = `${urlPrincipalLivro}/api/livros/${dadosLivro.id}`;
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
    const URL = `${urlPrincipalLivro}/api/livros/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => proxsucesso())
        .catch(proxerro);
}

async function asyncLerGenerosLivro(proxsucesso, proxerro) {
    const URL = `${urlPrincipalLivro}/api/generos`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}