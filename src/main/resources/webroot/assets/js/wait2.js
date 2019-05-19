"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getConfirm();
}

function getConfirm() {
    console.log('Retrieving messages...');
    fetch('api/next2').then(res => res.json()).then(function (response) {
        makeNextTurn(response);
        setTimeout(getConfirm, 2000);
    })
}

function makeNextTurn(res) {
    console.log(res);
    if (res === 'goNext') {
        location.href = 'setup2.html'
    } else {
        console.log("error");
    }
}
