// Variáveis de Tabela e Corpo de Tabela
const tabelaUsuarios = document.querySelector('#tabelaUsuarios');
const corpoTabelaUsuarios = document.querySelector('#corpoTabelaUsuarios');
const paragrafoMensagemUsuarios = document.querySelector('#paragrafoMensagemUsuarios');

const urlPrincipalUsuario = "https://indicai.onrender.com";

inicializarUsuario();

function inicializarUsuario() {
    tabelaUsuarios.style.display = 'inline';
    listarTodosUsuarios();
}

function listarTodosUsuarios() {
    const errorHandler = function (error) {
        paragrafoMensagemUsuarios.textContent = "Erro ao listar Usuários (código " + error.message + ")";
    };
    asyncLerUsuarios(preencherTabelaUsuarios, errorHandler);
}

function preencherTabelaUsuarios(usuarios) {
    corpoTabelaUsuarios.innerHTML = "";
    const n = usuarios.length;
    for (let i = 0; i < n; i++) {
        const usuario = usuarios[i];
        const linha = corpoTabelaUsuarios.insertRow();
        const celulaId = linha.insertCell();
        const celulaUsername = linha.insertCell();
        const celulaCidade = linha.insertCell();
        const celulaEstado = linha.insertCell();
        const celulaAnoNascimento = linha.insertCell();
        const celulaRole = linha.insertCell();
        const celulaAmigos = linha.insertCell();

        const alink = document.createElement('a');
        alink.textContent = usuario.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarUsuario(usuario.id); };
        celulaId.appendChild(alink);
        celulaUsername.textContent = usuario.username;
        celulaCidade.textContent = usuario.cidade;
        celulaEstado.textContent = usuario.estado;
        celulaAnoNascimento.textContent = usuario.anoNascimento;
        celulaRole.textContent = usuario.role;
        celulaAmigos.textContent = usuario.amigos.join(", ");
    }
}

function cancelarEdicaoUsuario() {
    inicializarUsuario();
}

async function asyncLerUsuarios(proxsucesso, proxerro) {
    try {
        const URL = `${urlPrincipalUsuario}/api/usuarios`;
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