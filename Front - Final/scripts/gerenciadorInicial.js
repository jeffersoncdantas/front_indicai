var btnGerenciarFilmes = document.querySelector("#btnGerenciarFilmes");
var sectionFilmes = document.querySelector("#sectionFilmes");
var landing = document.querySelector("#landing");

btnGerenciarFilmes.addEventListener("click", function(){
landing.style.display = "none";
sectionFilmes.style.display = "block";

})
