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
    element.classList.remove("hidden");
    toRemove.classList.add("hidden");
    document.querySelector('#createPersonForm p').innerHTML = '';
    document.querySelector('#createPersonForm p').innerHTML += `<p>Game mode: ${gameMode}</p>`;
    console.log(`Game mode: ${gameMode}`);

}

function goBack() {
    document.querySelector('#createPersonForm p').innerHTML = '';
    document.getElementById('createPersonForm').classList.add('hidden');
    document.getElementById('gameMode').classList.remove('hidden');
}
