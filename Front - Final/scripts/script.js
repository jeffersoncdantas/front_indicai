//Start of navigation bar js
console.log("Script loaded nav bar");
var menu1 = new Image;
menu1.src=("assets/shared/icon-hamburger.svg");
var menu2 = new Image;
menu2.src=("assets/shared/icon-close.svg");

var navLinks = document.getElementById("nav-links");
var hamMenu = document.getElementById("toggle-ham-menu");

var homeNavBtn = document.getElementById("home-nav-btn");
var destNavBtn = document.getElementById("dest-nav-btn");
var crewNavBtn = document.getElementById("crew-nav-btn");
var techNavBtn = document.getElementById("tech-nav-btn");

var hamMenuIcon = document.getElementById("toggle-ham-menu").appendChild(menu1);

function imgClick(){
    if (hamMenuIcon.src.match("assets/shared/icon-hamburger.svg")){
        hamMenuIcon.src = "assets/shared/icon-close.svg";
        navLinks.classList.add("navbar-links-active");
    }
    else{
        hamMenuIcon.src = "assets/shared/icon-hamburger.svg";
        navLinks.classList.remove("navbar-links-active");
    }
}
homeNavBtn.classList.add("nav-btn-active");
if(window.location.href.indexOf("index") != -1){
    homeNavBtn.classList.add("nav-btn-active");
}
else if(window.location.href.indexOf("destination") != -1){
    destNavBtn.classList.add("nav-btn-active");
    homeNavBtn.classList.remove("nav-btn-active");
}
else if(window.location.href.indexOf("crew") != -1){
    crewNavBtn.classList.add("nav-btn-active");
    homeNavBtn.classList.remove("nav-btn-active");
}
else if(window.location.href.indexOf("tech") != -1){
    techNavBtn.classList.add("nav-btn-active");
    homeNavBtn.classList.remove("nav-btn-active");
}
//End of navigation bar js

const loginContainer = document.getElementById('login-container')

const moveOverlay = () => loginContainer.classList.toggle('move')

document.getElementById('open-register').addEventListener('click', moveOverlay)
document.getElementById('open-login').addEventListener('click', moveOverlay)

document.getElementById('open-register-mobile').addEventListener('click', moveOverlay)
document.getElementById('open-login-mobile').addEventListener('click', moveOverlay)
