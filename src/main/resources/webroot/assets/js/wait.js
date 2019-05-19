"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getConfirm();
}

function getConfirm() {
    console.log('Retrieving messages...');
    fetch('api/next1').then(res => res.json()).then(function (response) {
        makeNextTurn(response);
        setTimeout(getConfirm, 2000);
    })
}

function makeNextTurn(res) {
    console.log(res);
    if (res === 'goNext') {
        location.href = 'boardlist.html'
    } else {
        console.log("error");
    }
}
