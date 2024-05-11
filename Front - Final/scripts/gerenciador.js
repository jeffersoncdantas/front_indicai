document.addEventListener("DOMContentLoaded", function() {
    var btnGerenciarFilmes = document.querySelector("#btnGerenciarFilmes");
    var tabelaF = document.querySelector('#tabelaFilmes');
    var sectionF = document.querySelector("#sectionFilmes");
    var destaquesF = document.querySelector('#filmes-container');

    var btnGerenciarSeries = document.querySelector('#btnGerenciarSeries');
    var tabelaS = document.querySelector('#tabelaSeries');
    var sectionS = document.querySelector('#sectionSeries');
    var destaquesS = document.querySelector('#series-container');

    if (btnGerenciarFilmes && tabelaF && sectionF && destaquesF) {
        btnGerenciarFilmes.addEventListener("click", function () {
            tabelaF.style.display = "block";
            sectionF.style.display = "block";
            destaquesF.style.display = "none";
        });
    }

    if (btnGerenciarSeries && tabelaS && sectionS && destaquesS) {
        btnGerenciarSeries.addEventListener("click", function () {
            tabelaS.style.display = "block";
            sectionS.style.display = "block";
            destaquesS.style.display = "none";
        });
    }
});
