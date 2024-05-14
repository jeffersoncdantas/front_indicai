const idUsuario = localStorage.getItem("idUsuario");

inicializarItens();

function inicializarItens() {
    listarAvaliacoesDoUsuario();
}

function listarAvaliacoesDoUsuario() {
    asyncLerAvaliacoesDoUsuario(preencherTabelaFilme);
}

function preencherTabelaFilme(avaliacoes) {
    exibirAvaliacoesDoUsuario(avaliacoes);
}

function exibirAvaliacoesDoUsuario(avaliacoes) {
    const filmesContainer = document.getElementById('filmes-container');
    filmesContainer.innerHTML = ""; 


    avaliacoes.forEach(avaliacao => {
        // Verifica se a avaliação foi feita pelo usuário logado
        // if (avaliacao.usuario.id === idUsuario) {
            // Cria um elemento card para cada filme
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.idItem = avaliacao.item.id;

            // Adiciona outras informações do filme ao card
            const nota = document.createElement('p');
            nota.textContent = `Nota: ${avaliacao.nota}`;
            card.appendChild(nota);

            const comentario = document.createElement('p');
            comentario.textContent = `Comentário: ${avaliacao.comentario}`;
            card.appendChild(comentario);

            const usuario = document.createElement('p');
            usuario.textContent = `Usuário: ${avaliacao.usuario.id}`
            card.appendChild(usuario);
            
            // Adiciona o card ao container de filmes
            filmesContainer.appendChild(card);
    });
}

async function asyncLerAvaliacoesDoUsuario(proxsucesso, proxerro) {
    const URL = `https://indicai.onrender.com/api/avaliacoes/usuario/${idUsuario}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta.json(); })
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}
