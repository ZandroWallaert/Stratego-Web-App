"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    allowDrop();
    drag();
    drop();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
    }

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    }

