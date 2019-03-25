"use strict";

document.addEventListener("DOMContentLoaded", init);

let settings = [];
let defaultSettings = ['Enabled', 'Khaki'];

function init() {

    settings = JSON.parse(localStorage.getItem('settings'));
    if (settings === null) {
        settings = defaultSettings
    }
    setAudio(settings[0]);
    setTheme(settings[1]);

    console.log("DOMContentLoaded");
    const createPersonForm = document.getElementById("createPersonForm");
    const nameIn = document.getElementById("name");
    const ageIn = document.getElementById("age");
    const tokenIn = document.getElementById("token");
    const responseSpan = document.getElementById("response");

    createPersonForm.onsubmit = function (evt) {
        evt.preventDefault();

        playAudioForward();
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

let allowAudio = true;

function playAudioForward() {
    if (allowAudio) {
        let audioForward = new Audio('assets/audios/click-forward.mp3');
        audioForward.play();
    }
}

function playAudioBack() {
    if (allowAudio) {
        let audioBack = new Audio('assets/audios/click-back.mp3');
        audioBack.play();
    }
}

let timeVar;

function timeOut() {
    playAudioForward();
    timeVar = setTimeout(() => {
        window.location.href = "game.html";
    }, 5000)
}


function showRules() {
    playAudioForward();
    document.getElementById('rules').classList.remove('hidden');
    document.querySelector('main').classList.add('hidden');
}

function clearHTML() {
    document.getElementById('cancel').classList.add('hidden');
    document.querySelectorAll('#bottom p').innerHTML = '';
    document.querySelector('#settingButtons p').innerHTML = '';
    document.getElementById('wait').classList.add('hidden');
    document.getElementById('wait').classList.remove('flex');
}

let changesSaved = false;

function goBack(id) {

    playAudioBack();
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
        if (!changesSaved) {
            removeChanges();
        } else {
            changesSaved = false;
        }
        document.getElementById(screen[id - 2]).classList.remove('hidden');
    } else {
        document.getElementById(screen[id - 1]).classList.remove('hidden');
    }
    document.querySelector('main').classList.remove('hidden');
}

let audioStatus;
let themeStatus;

function getCurrentSettings() {
    audioStatus = document.getElementById('sound').value;
    themeStatus = document.getElementById('theme').value;
}

function changeAudio() {
    let newAudioValue;
    if (document.getElementById('sound').value === 'Enabled') {
        newAudioValue = 'Disabled';
    } else {
        newAudioValue = 'Enabled';
    }
    setAudio(newAudioValue)
}

let borders = ['main', 'input', '#mainMenu a', '#rules', '#rules div a', '#settingButtons a', '#settings form input',
    '#gameMode a', '.back', '#bottom .back', '#infoBox', '#cancel'];
let textColors = ['h2', 'input', '#mainMenu a', '#rules div a', '#rules h1', '#rules h4', '#rules h5', '#rules p',
    '#rules ul', '#settings p', '#settings label', '#settings form input', '#settingButtons a', '#gameMode a', '.back',
    '#bottom .back', '#bottom p', '#infoBox', '#createPersonForm label', '#createPersonForm p', '#response'];
let backgrounds = ['input[type=text]', 'input[type=number]'];

function changeTheme() {
    let themeValue = document.getElementById('theme').value;
    let themes = ['Khaki', 'Orange', 'Red', 'Green', 'Navy', 'Purple', 'White'];
    if (themes.indexOf(themeValue) === themes.length - 1) {
        document.getElementById('theme').value = 'Khaki';
    } else {
        document.getElementById('theme').value = themes[themes.indexOf(themeValue) + 1];
    }

    themeValue = document.getElementById('theme').value;

    setTheme(themeValue);

}

function setAudio(value) {
    document.getElementById('sound').value = value;
    let audioStyle = document.getElementById('sound').style;
    if (value === 'Enabled') {
        allowAudio = true;
        audioStyle.borderColor = '#00ff00';
        audioStyle.color = '#00ff00';
    } else {
        allowAudio = false;
        audioStyle.borderColor = '#ff0000';
        audioStyle.color = "#ff0000";
    }
}

function setTheme(value) {
    document.getElementById('theme').value = value;

    for (let i = 0; i < borders.length; i++) {
        let selector = document.querySelectorAll(borders[i]);
        for (let i = 0; i < selector.length; i++) {
            selector[i].style.borderColor = value;
        }
    }

    for (let i = 0; i < textColors.length; i++) {
        let selector = document.querySelectorAll(textColors[i]);
        for (let i = 0; i < selector.length; i++) {
            selector[i].style.color = value;
        }
    }

    for (let i = 0; i < backgrounds.length; i++) {
        let selector = document.querySelectorAll(backgrounds[i]);
        for (let i = 0; i < selector.length; i++) {
            selector[i].style.backgroundColor = value;
            selector[i].style.color = 'Black';
        }
    }

    setConstColors();
}

function setConstColors() {
    document.getElementById('cancel').style.borderColor = 'red';
    let audioValue = document.getElementById('sound').value;
    let audioStyle = document.getElementById('sound').style;
    if (audioValue === 'Enabled') {
        audioStyle.color = '#00ff00';
        audioStyle.borderColor = '#00ff00'
    } else {
        audioStyle.color = '#ff0000';
        audioStyle.borderColor = '#ff0000';
    }
}

function showSettings() {
    playAudioForward();
    getCurrentSettings();
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('settings').classList.remove('hidden');
    console.log(audioStatus, themeStatus)
}

function saveChanges() {
    playAudioForward();
    changesSaved = true;
    document.querySelector('#settingButtons p').style.color = '#00ff00';
    document.querySelector('#settingButtons p').innerHTML = `Changes saved!`;
    getCurrentSettings();
    settings = [audioStatus, themeStatus];
    localStorage.setItem('settings', JSON.stringify(settings));
}

function removeChanges() {
    setAudio(audioStatus);
    setTheme(themeStatus);
}

function resetSettings() {
    setAudio('Enabled');
    setTheme('Khaki');
}

function showGameMode(id) {
    playAudioForward();
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('gameMode').classList.remove('hidden');
    document.querySelector('#bottom p').innerHTML = `${id}`;
    console.log(document.querySelector('#bottom'))
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

function showForm(gameMode) {
    playAudioForward();
    let element = document.getElementById("createPersonForm");
    let toRemove = document.getElementById("gameMode");
    let addMode = document.querySelector('#createPersonForm p');
    element.classList.remove("hidden");
    toRemove.classList.add("hidden");
    addMode.innerHTML = '';
    addMode.innerHTML = `Game mode: ${gameMode}`;
    console.log(addMode)

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
    playAudioBack();
    document.getElementById('wait').innerHTML = `<h1>Search canceled.</h1>`;
    document.getElementById('wait').style.color = "#ff0000";
    document.getElementById('cancel').classList.add('hidden');
    clearTimeout(timeVar)
}
