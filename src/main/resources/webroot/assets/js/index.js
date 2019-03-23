"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("DOMContentLoaded");
    const createPersonForm = document.getElementById("createPersonForm");
    const nameIn = document.getElementById("name");
    const ageIn = document.getElementById("age");
    const tokenIn = document.getElementById("token");
    const responseSpan = document.getElementById("response");

    createPersonForm.onsubmit = function (evt) {
        evt.preventDefault();

        showWaitingForPlayers();
        timeOut();
        let data = {
            token : tokenIn.value,
            person : {
                name : nameIn.value,
                age : parseInt(ageIn.value)
            }
        };

        console.log("Sending:", data);

        return fetch("api/person", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => responseSpan.innerHTML = JSON.stringify(json))
            .catch(error => console.error('Error:', error))
    };


}

let timeVar;

function timeOut() {
    timeVar = setTimeout(() => {
        window.location.href = "game.html";
    }, 5000)
}

function showForm(gameMode) {
    let element = document.getElementById("createPersonForm");
    let toRemove = document.getElementById("gameMode");
    let addMode = document.querySelector('#createPersonForm p');
    element.classList.remove("hidden");
    toRemove.classList.add("hidden");
    addMode.innerHTML = '';
    addMode.innerHTML += `<p>Game mode: ${gameMode}</p>`;
    console.log(addMode)

}

const settingButtonsP = document.querySelector('#settingButtons p');
function clearHTML() {
    document.getElementById('cancel').classList.add('hidden');
    document.querySelectorAll('#bottom p').innerHTML = '';
    settingButtonsP.innerHTML = '';
    document.getElementById('wait').classList.add('hidden');
    document.getElementById('wait').classList.remove('flex');
}

function goBack(id) {

    clearTimeout(timeVar);
    clearHTML();

    let screen = [
        "mainMenu",
        "rules",
        "settings",
        "gameMode",
        "createPersonForm",
    ];
    document.getElementById(screen[id]).classList.add('hidden');
    if (screen[id] === "gameMode") {
        document.getElementById(screen[id - 3]).classList.remove('hidden');

    } else if (screen[id] === "settings") {
        document.getElementById(screen[id - 2]).classList.remove('hidden');
    } else {
        document.getElementById(screen[id - 1]).classList.remove('hidden');
    }
    document.querySelector('main').classList.remove('hidden');
}

function showModeDetails(i) {
    let info = [
        "Capture the flag using all of the pieces except the infiltrator.",
        "Capture the flag using 10 specific pieces.",
        "Capture the flag with only 7 scouts and the Infiltrator."
    ];
    document.getElementById('infoBox').classList.remove('hidden');
    document.querySelector('#infoBox').innerHTML = `<p>${info[i]}</p>`;
}

function hideModeDetails() {
    document.getElementById('infoBox').classList.add('hidden');
}

function hideWindow() {
    document.getElementById('rules').classList.add('hidden');
    document.getElementById('mainMenu').classList.remove('hidden');
    document.querySelector('main').classList.remove('hidden');
}

function showWaitingForPlayers() {
    let element = document.getElementById('wait');
    element.classList.remove('hidden');
    element.classList.add('flex');
    element.innerHTML = `<h1>Waiting for second player...</h1><div class="loader"></div>`;
    element.style.color = "#ffffff";
    document.getElementById('cancel').classList.remove('hidden');
}

function cancelSearch() {
    document.getElementById('wait').innerHTML = `<h1>Search canceled.</h1>`;
    document.getElementById('wait').style.color = "#ff0000";
    document.getElementById('cancel').classList.add('hidden');
    clearTimeout(timeVar)
}

function showGameMode(id) {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('gameMode').classList.remove('hidden');
    document.querySelector('#bottom p').innerHTML = `${id}`;
    console.log(document.querySelector('#bottom'))
}

function showRules() {
    document.getElementById('rules').classList.remove('hidden');
    document.querySelector('main').classList.add('hidden');
}

function showSettings() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('settings').classList.remove('hidden');
}

function saveChanges() {
    settingButtonsP.style.color = '#00ff00';
    settingButtonsP.innerHTML = `Changes saved!`;
}
