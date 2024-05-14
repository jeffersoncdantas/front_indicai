console.log("Script loaded nav bar");

// Carrega as imagens do menu
var menu1 = new Image;
menu1.src = "assets/shared/icon-hamburger.svg";
var menu2 = new Image;
menu2.src = "assets/shared/icon-close.svg";

// Elementos do DOM
var navLinks = document.getElementById("nav-links");
var hamMenuIcon = document.getElementById("toggle-ham-menu").appendChild(menu1);
var homeNavBtn = document.getElementById("home-nav-btn");
var filmesNavBtn = document.getElementById("filmes-nav-btn");
var seriesNavBtn = document.getElementById("series-nav-btn");
var livrosNavBtn = document.getElementById("livros-nav-btn");
var loginNavBtn = document.getElementById("login-nav-btn");

// Função para alternar o ícone do menu e mostrar/ocultar os links de navegação
function imgClick() {
    if (hamMenuIcon.src.match("assets/shared/icon-hamburger.svg")) {
        hamMenuIcon.src = "assets/shared/icon-close.svg";
        navLinks.classList.add("navbar-links-active");
    } else {
        hamMenuIcon.src = "assets/shared/icon-hamburger.svg";
        navLinks.classList.remove("navbar-links-active");
    }
}

// Ativa o botão de navegação correspondente à página atual
function setActiveNavBtn() {
    var currentLocation = window.location.href;
    homeNavBtn.classList.remove("nav-btn-active");
    filmesNavBtn.classList.remove("nav-btn-active");
    seriesNavBtn.classList.remove("nav-btn-active");
    livrosNavBtn.classList.remove("nav-btn-active");
    loginNavBtn.classList.remove("nav-btn-active");

    if (currentLocation.includes("index")) {
        homeNavBtn.classList.add("nav-btn-active");
    } else if (currentLocation.includes("filmes")) {
        filmesNavBtn.classList.add("nav-btn-active");
    } else if (currentLocation.includes("series")) {
        seriesNavBtn.classList.add("nav-btn-active");
    } else if (currentLocation.includes("livros")) {
        livrosNavBtn.classList.add("nav-btn-active");
    } else if (currentLocation.includes("login")) {
        loginNavBtn.classList.add("nav-btn-active");
    }
}

// Define o botão de navegação ativo ao carregar a página
//End of navigation bar js
document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('login-container');

    const moveOverlay = () => loginContainer.classList.toggle('move');

    const openRegister = document.getElementById('open-register');
    const openLogin = document.getElementById('open-login');
    const openRegisterMobile = document.getElementById('open-register-mobile');
    const openLoginMobile = document.getElementById('open-login-mobile');

    if (openRegister) {
        openRegister.addEventListener('click', moveOverlay);
    }
    if (openLogin) {
        openLogin.addEventListener('click', moveOverlay);
    }
    if (openRegisterMobile) {
        openRegisterMobile.addEventListener('click', moveOverlay);
    }
    if (openLoginMobile) {
        openLoginMobile.addEventListener('click', moveOverlay);
    }
});

function reloadPage() {
    location.reload();
}

