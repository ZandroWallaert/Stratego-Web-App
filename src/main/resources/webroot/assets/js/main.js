"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {

}

document.getElementById('launch').addEventListener('click', launchApp);

function launchApp() {
    document.getElementById('site').classList.add('hidden');
    document.querySelector('body').style.background = "white";
    document.getElementById('loading').classList.remove('hidden');
    setTimeout(() => {
        window.location.href = "app.html";
    }, 4000);
    console.log('test');
}
