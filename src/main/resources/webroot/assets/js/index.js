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
            .catch(error => console.error('Error:', error));

    };


}

function showForm(gameMode) {
    let element = document.getElementById("createPersonForm");
    let toRemove = document.getElementById("gameMode");
    let addMode = document.querySelector('#createPersonForm p');
    element.classList.remove("hidden");
    toRemove.classList.add("hidden");
    addMode.innerHTML = '';
    addMode.innerHTML += `<p>Game mode: ${gameMode}</p>`;

}

function goBack() {
    document.getElementById('createPersonForm').classList.add('hidden');
    document.getElementById('gameMode').classList.remove('hidden');
}

function showModeDetails(i) {
    let info = [
        "Capture the flag using all of the pieces except the infiltrator",
        "Capture the flag using 10 specific pieces.",
        "Capture the flag with only 7 scouts and the Infiltrator."
    ];
    document.querySelector('#gameMode p').innerHTML = `${info[i]}`;
}

function hideModeDetails() {
    document.querySelector('#gameMode p').innerHTML = '';
}
