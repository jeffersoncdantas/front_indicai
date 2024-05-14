function exibirDetalhesFilmeAvaliacao() {
    const idUsuario = localStorage.getItem("idUsuario");
    listarTodasAvaliacoesDoUsuario(idUsuario);
}

function listarTodasAvaliacoesDoUsuario(idUsuario) {
    asyncLerFilmesAvaliados(idUsuario, preencherTabelaAvaliacoes, errorHandler);
}

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    const idUsuario = localStorage.getItem("idUsuario");
    if (idUsuario) {
        document.getElementById('txtIdUsuario').value = idUsuario;
    }
});

function preencherTabelaAvaliacoes(avaliacoes) {
    const corpoTabelaAvaliacaoFilme = document.getElementById('corpoTabelaAvaliacaoFilme');
    corpoTabelaAvaliacaoFilme.innerHTML = ""; // Limpa o conteúdo atual da tabela

    const nomeUsuario = localStorage.getItem("username");

    avaliacoes.forEach(avaliacao => {
        if (avaliacao.usuario.id === idUsuario) {
            // Cria um novo elemento <div> para representar a avaliação como um comentário
            const comentario = document.createElement('div');
            comentario.classList.add('avaliacao-comentario');

            // const imagemFilme = document.createElement('img');
            // imagemFilme.src = filmeClicadoUrl;
            // imagemFilme.alt = filmeClicadoTitulo;
            // comentario.appendChild(imagemFilme);

            const conteudo = document.createElement('div'); // Novo elemento para o conteúdo
            conteudo.classList.add('conteudo');

            // const tituloFilme = document.createElement('h3');
            // tituloFilme.textContent = `${filmeClicadoTitulo}`;
            // conteudo.appendChild(tituloFilme);

            // Adiciona a nota da avaliação ao conteúdo
            const nota = document.createElement('p');
            nota.textContent = `Nota: ${avaliacao.nota}`;
            conteudo.appendChild(nota);

            // Adiciona o comentário ao conteúdo
            const textoComentario = document.createElement('p');
            textoComentario.textContent = `Comentário: ${avaliacao.comentario}`;
            conteudo.appendChild(textoComentario);

            // Adiciona o nome do usuário ao conteúdo
            const nomeUsuarioTexto = document.createElement('p');
            nomeUsuarioTexto.textContent = `Avaliação feita por: ${nomeUsuario} (${avaliacao.usuario.id})`;
            conteudo.appendChild(nomeUsuarioTexto);

            // Adiciona o conteúdo ao comentário
            comentario.appendChild(conteudo);

            // Adiciona o comentário ao corpo da tabela
            corpoTabelaAvaliacaoFilme.appendChild(comentario);
        }
    });
}

function errorHandler(error) {
    paragrafoMensagemAvaliacao.textContent = "Erro ao listar Filmes (código " + error.message + ")";
}

//Funcoes Rest
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


async function asyncLerAvaliacoes(idFilme, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idFilme}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerFilmesAvaliados(idDoUsuario, proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes?item=${idDoUsuario}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; })
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}
