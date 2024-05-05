var btnLogin = document.querySelector("#btnLoginSignUp");
var sectionLogin = document.querySelector("#sectionLoginSignUp");

var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

const loginContainer = document.getElementById('login-container')

const moveOverlay = () => loginContainer.classList.toggle('move')

document.getElementById('open-register').addEventListener('click', moveOverlay)
document.getElementById('open-login').addEventListener('click', moveOverlay)

document.getElementById('open-register-mobile').addEventListener('click', moveOverlay)
document.getElementById('open-login-mobile').addEventListener('click', moveOverlay)