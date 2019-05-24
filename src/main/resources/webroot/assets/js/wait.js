"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    if (document.body.title === "wait1") {
        getConfirm(1);
    } else {
        getConfirm(2)
    }
}

function getConfirm(i) {
    console.log(i);
    let fetchLink;
    if (i === 1) {
        fetchLink = '../api/next1';
    } else {
        fetchLink = '../api/next2';
    }
    console.log('Retrieving messages...');
    fetch(fetchLink).then(res => res.json()).then(function (response) {
        makeNextTurn(response);
        setTimeout(function () {
            getConfirm(i)
        }, 2000);
    })
}

function makeNextTurn(res) {
    console.log(res);
    if (res === 'goNext' && document.body.title === "wait1") {
        location.href = 'boardList.html'
    } else if (res === 'goNext' && document.body.title === "wait2") {
        location.href = 'setup2.html'
    } else {
        console.log("error");
    }
}
