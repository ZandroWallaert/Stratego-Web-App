"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
}

document.querySelector('#launch > a').addEventListener('click', launchApp);

function launchApp() {
    document.getElementById('site').classList.add('hidden');
    document.querySelector('body').style.background = "white";
    document.getElementById('loading').classList.remove('hidden');
    setTimeout(() => {
        window.location.href = "app.html";
        window.open("app2.html");
    }, 4000);
}

function showDonate() {
    document.getElementById('donate').classList.remove('hidden');
    document.getElementById('launch').classList.add('hidden');
}

function showProceedToPayment() {
    document.getElementById('paymentMethod').classList.remove('hidden');
    document.getElementById('donate').classList.add('hidden');
}

