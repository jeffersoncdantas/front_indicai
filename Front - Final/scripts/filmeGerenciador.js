var btnGerenciarFilmes = document.querySelector("#btnGerenciarFilmes");
var btnVoltar = document.querySelector("#btnVoltar");
var tabela = document.querySelector('#tabelaFilmes');

var sectionFilmes = document.querySelector("#sectionFilmes");
var destaquesFilmes = document.querySelector('#filmes-container');
var landing = document.querySelector("#landing");

btnGerenciarFilmes.addEventListener("click", function () {
    tabela.style.display = "block"
    sectionFilmes.style.display = "block";
    destaquesFilmes.style.display = "none";
})

btnVoltar.addEventListener("click", function () {
    destaquesFilmes.style.display = "block";
    sectionFilmes.style.display = "none";
})
