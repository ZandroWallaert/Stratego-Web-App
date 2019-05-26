"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    setTimeout(function () {
        launchApp();
    }, 5000);
}

function launchApp() {
    window.open("/pages/app2.html");
    window.location.href = "/pages/app.html";
}

