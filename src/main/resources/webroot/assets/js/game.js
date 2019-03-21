"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    setupBoard();

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
            tr[j].innerHTML += `<td><a><img src="#" alt=""></a></td>`
        }
    }
}




