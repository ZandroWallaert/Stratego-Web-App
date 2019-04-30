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

function showDonate() {
    document.getElementById('donate').classList.remove('hidden');
    document.getElementById('launch').classList.add('hidden');
}

function showProceedToPayment() {
    document.getElementById('paymentMethod').classList.remove('hidden');
    document.getElementById('donate').classList.add('hidden');
}

