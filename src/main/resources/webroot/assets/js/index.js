"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector('#launch > a').addEventListener('click', launchApp);
    document.getElementById('donateLink').addEventListener('click', showDonate);
    document.getElementById('nextToPayment').addEventListener('click', showProceedToPayment);
}

function launchApp() {
    document.getElementById('site').classList.add('hidden');
    document.querySelector('body').style.background = "white";
    document.getElementById('loading').classList.remove('hidden');
    setTimeout(() => {
        window.location.href = "/pages/app.html";
        window.open("/pages/app2.html");
    }, 2500);
}

function showDonate() {
    document.getElementById('donate').classList.remove('hidden');
    document.getElementById('launch').classList.add('hidden');
}

function showProceedToPayment() {
    document.getElementById('paymentMethod').classList.remove('hidden');
    document.getElementById('donate').classList.add('hidden');
}
