"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    setupBoard();
    getImageSRC();
}

function setupBoard() {
    let tbody = document.querySelector("tbody");
    let boardLength = 10;
    let boardWidth = 10;
    for (let i = 0; i < boardLength; i++) {
        tbody.innerHTML += `<tr></tr>`
    }
    let tr = document.querySelector("tbody").querySelectorAll("tr");
    for (let i = 0; i < boardWidth; i++) {
        for (let j = 0; j < 10; j++) {
            tr[j].innerHTML += `<td><div></div></td>`
        }
    }
}

let getImageSwitch;

function turnOffImageSwitch() {
    getImageSwitch = false;
    getImageSRC();
}

function getImageSRC() {
    let getSRC = null;
    let selectedSRC = null;
    getImageSwitch = true;
    document.addEventListener('click', first);

    function first(e) {
        if (e.target.tagName.toUpperCase() === 'IMG') {
            getSRC = e.target;
            console.log(getSRC);
        }
        e.stopImmediatePropagation();
        this.removeEventListener("click", first);
        document.onclick = second;
    }

    function second(e) {
        if (getImageSwitch === true) {
            selectedSRC = e.target.querySelector("div");
            console.log(selectedSRC);
            selectedSRC.appendChild(getSRC);
        }
    }
}
