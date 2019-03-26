"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getImageSRC();
}

function getImageSRC() {
    let getSRC = null;
    let selectedSRC = null;
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
        selectedSRC = e.target;
            console.log(selectedSRC);
            selectedSRC.appendChild(getSRC);
    }
}
