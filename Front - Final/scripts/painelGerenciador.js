var btnGerenciarFilmes = document.querySelector("#btnGerenciarFilmes");
var sectionFilmes = document.querySelector("#sectionFilmes");

var btnGerenciarSeries = document.querySelector("#btnGerenciarSeries");
var sectionSeries = document.querySelector("#sectionSeries");

var btnGerenciarLivros = document.querySelector("#btnGerenciarLivros");
var sectionLivros = document.querySelector("#sectionLivros");

var btnGerenciarGeneros = document.querySelector("#btnGerenciarGeneros");
var sectionGeneros= document.querySelector("#sectionGeneros");

var btnGerenciarUsuarios = document.querySelector("#btnGerenciarUsuarios");
var sectionUsuarios= document.querySelector("#sectionUsuarios");

var landing = document.querySelector("#landing");

btnGerenciarFilmes.addEventListener("click", function(){
landing.style.display = "none";
sectionSeries.style.display = "none";
sectionLivros.style.display = "none";
sectionGeneros.style.display = "none";
sectionFilmes.style.display = "block";
sectionUsuarios.style.display = "none";

})

btnGerenciarLivros.addEventListener("click", function(){
landing.style.display = "none";
sectionFilmes.style.display = "none";
sectionSeries.style.display = "none";
sectionGeneros.style.display = "none";
sectionLivros.style.display = "block";
sectionUsuarios.style.display = "none";

})

btnGerenciarSeries.addEventListener("click", function(){
landing.style.display = "none";
sectionFilmes.style.display = "none";
sectionLivros.style.display = "none";
sectionGeneros.style.display = "none";
sectionSeries.style.display = "block";
sectionUsuarios.style.display = "none";

})

btnGerenciarGeneros.addEventListener("click", function(){
    landing.style.display = "none";
    sectionFilmes.style.display = "none";
    sectionLivros.style.display = "none";
    sectionGeneros.style.display = "block";
    sectionSeries.style.display = "none";
    sectionUsuarios.style.display = "none";
    
})

btnGerenciarUsuarios.addEventListener("click", function(){
    landing.style.display = "none";
    sectionFilmes.style.display = "none";
    sectionLivros.style.display = "none";
    sectionUsuarios.style.display = "block";
    sectionSeries.style.display = "none";
    sectionGeneros.style.display = "none";
    
})

function voltarPagInicial(){
    landing.style.display = "block";
    sectionLivros.style.display = "none";
    sectionSeries.style.display = "none";
    sectionFilmes.style.display = "none";
    sectionUsuarios.style.display = "none";
    sectionGeneros.style.display = "none";
}