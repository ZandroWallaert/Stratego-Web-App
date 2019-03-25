"use strict";

document.addEventListener("DOMContentLoaded", init);

let settings = [];
let defaultSettings = ['Rain', 'Enabled', 'Enabled'];

let formInfo = [];

function init() {
    settings = JSON.parse(localStorage.getItem('settings'));
    if (settings === null) {
        settings = defaultSettings
    }

    setTheme(settings[0]);
    setAudio(settings[1]);
    setMusic(settings[2]);

    formInfo = JSON.parse(localStorage.getItem('formInfo'));
    if (formInfo != null) {
        document.getElementById('name').value = formInfo[0];
        document.getElementById('age').value = formInfo[1];
        document.getElementById('token').value = formInfo[2];
    }

    playMusic();

    document.getElementById('backgroundVideo').style.pointerEvents = 'none';

    console.log("DOMContentLoaded");
    const createPersonForm = document.getElementById("createPersonForm");
    const nameIn = document.getElementById("name");
    const ageIn = document.getElementById("age");
    const tokenIn = document.getElementById("token");
    const responseSpan = document.getElementById("response");

    createPersonForm.onsubmit = function (evt) {
        evt.preventDefault();

        playLoadingAudio();
        showWaitingForPlayers();
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

let selector = document.querySelectorAll('a');
document.querySelector('#createPersonForm input[type=submit]').addEventListener('mouseover', playAudioHover);
for (let i = 0; i < selector.length; i++) {
    selector[i].addEventListener('mouseover', playAudioHover);
}

let allowAudio = true;
let allowMusic = true;

let audioStatus;
let themeStatus;
let musicStatus;

let music = new Audio('assets/audios/bgmusic.mp3');

function playMusic() {
    if (allowMusic) {
        music.volume = 0.2;
        music.loop = true;
        music.autoplay = true;
    }
}

function playAudioHover() {
    if (allowAudio) {
        let audioHover = new Audio('assets/audios/hover.mp3');
        audioHover.volume = 0.5;
        audioHover.play();
    }
}

function playAudioForward() {
    if (allowAudio) {
        let audioForward = new Audio('assets/audios/click-forward.mp3');
        audioForward.play();
    }
}

function playAudioBack() {
    if (allowAudio) {
        let audioBack = new Audio('assets/audios/click-forward.mp3');
        audioBack.play();
    }
}

function playLoadingAudio() {
    if (allowAudio) {
        let audioLoading = new Audio('assets/audios/loading.mp3');
        audioLoading.play();
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
    document.getElementById('mainMenu').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('gameMode').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('title').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('gameMode').style.pointerEvents = 'none';
}

function showSettings() {
    playAudioForward();
    getCurrentSettings();
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('settings').classList.remove('hidden');
    document.getElementById('mainMenu').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('gameMode').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('title').style.filter = 'blur(3px) brightness(50%)';
}

function confirmExit() {
    playAudioForward();
    document.getElementById('mainMenu').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('exit').classList.remove('hidden');
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('gameMode').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('title').style.filter = 'blur(3px) brightness(50%)';
}


function clearHTML() {
    document.querySelectorAll('#bottom p').innerHTML = '';
    document.querySelector('#settingButtons p').innerHTML = '';
    document.getElementById('wait').classList.add('hidden');
    document.getElementById('wait').classList.remove('flex');
}

function goBack(id) {

    playAudioBack();
    clearHTML();

    let screen = [
        "mainMenu",
        "rules",
        "settings",
        "exit",
        "gameMode",
        "createPersonForm",
    ];
    document.getElementById(screen[id]).classList.add('hidden');
    if (screen[id] === "rules" || screen[id] === 'exit') {
        document.getElementById('mainMenu').style.filter = '';

    } else if (screen[id] === "gameMode") {
        document.getElementById('Single Player').style.border = '';
        document.getElementById('Online').style.border = '';
    } else if (screen[id] === "settings") {
        setTheme(themeStatus);
        setAudio(audioStatus);
        setMusic(musicStatus);
        document.getElementById('mainMenu').style.filter = '';
    } else {
        document.getElementById(screen[id - 1]).classList.remove('hidden')
    }
    document.getElementById('title').style.filter = '';
    document.getElementById('gameMode').style.filter = '';
    document.getElementById('mainMenu').style.filter = '';
    document.getElementById('mainMenu').style.pointerEvents = '';
    document.getElementById('gameMode').style.pointerEvents = '';
}

function getCurrentSettings() {
    audioStatus = document.getElementById('sound').value;
    themeStatus = document.getElementById('theme').value;
    musicStatus = document.getElementById('music').value;
}

document.getElementById('createPersonForm').addEventListener('change', getFormInfo);

function getFormInfo() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let token = document.getElementById('token').value;
    let formInfo = [name, age, token];

    localStorage.setItem('formInfo', JSON.stringify(formInfo));
}

function changeMusic() {
    let newMusicValue;
    if (document.getElementById('music').value === 'Enabled') {
        newMusicValue = 'Disabled';
    } else {
        newMusicValue = 'Enabled';
    }
    setMusic(newMusicValue);
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

let video = document.getElementById('backgroundVideo');
let source = document.createElement('source');

function changeTheme() {
    let themeValue = document.getElementById('theme').value;
    let values = ['Rain', 'Wild', 'Magic', 'Desert'];
    let themeId = values.indexOf(themeValue);
    let newThemeId;
    if (themeId === values.length - 1) {
        newThemeId = 0;
    } else {
        newThemeId = themeId + 1;
    }

    let newThemeValue = values[newThemeId];

    setTheme(newThemeValue);
}

function setMusic(value) {
    document.getElementById('music').value = value;
    if (value === 'Disabled') {
        allowMusic = false;
        music.pause();
    } else {
        music.play();
        allowMusic = true;
        music.autoplay = true;
        music.volume = 0.2;
        music.loop = true;
    }
}


function setAudio(value) {
    document.getElementById('sound').value = value;
    allowAudio = value === 'Enabled';
}

function setTheme(value) {
    let videos = ['rain.mp4', 'wild.mp4', 'magic.mp4', 'desert.mp4'];
    let values = ['Rain', 'Wild', 'Magic', 'Desert'];
    let newThemeId = values.indexOf(value);

    source.setAttribute('src', `assets/videos/${videos[newThemeId]}`);
    video.appendChild(source);
    if (values[newThemeId] === 'Wild') {
        video.style.transform = 'scale(-1, 1)';
    } else {
        video.style.transform = '';
    }
    video.load();
    video.play();
    video.loop = true;

    document.getElementById('theme').value = values[newThemeId];
    let titleColor;
    switch (values.indexOf(value)) {
        case 0:
            titleColor = 'rgba(255, 140, 26, 0.6)';
            break;
        case 1:
            titleColor = "rgba(255, 77, 77, 0.6)";
            break;
        case 2:
            titleColor = "rgba(179, 0, 179, 0.6)";
            break;
        case 3:
            titleColor = "rgba(51, 51, 255, 0.6)";
            break;
    }
    document.getElementById('title').style.color = titleColor;
}

function saveChanges() {
    playAudioForward();
    document.querySelector('#settingButtons p').innerHTML = `Changes saved!`;
    getCurrentSettings();
    settings = [themeStatus, audioStatus, musicStatus];
    localStorage.setItem('settings', JSON.stringify(settings));
}

function resetSettings() {
    setAudio('Enabled');
    setMusic('Enabled');
    setTheme('Rain');
}

function showGameMode(id) {
    playAudioForward();
    let otherId;

    if (id === 'Single Player') {
        otherId = 'Online'
    } else {
        otherId = 'Single Player'
    }


    document.getElementById('gameMode').classList.remove('hidden');
    if (document.getElementById(otherId).style.border !== '') {
        document.getElementById(otherId).style.border = '';
        document.getElementById(id).style.border = '3px solid rgba(204, 217, 255, 1)';
    } else {
        document.getElementById(id).style.border = '3px solid rgba(204, 217, 255, 1)';
    }

    document.querySelector('#gameMode h3').innerHTML = `${id}`;
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
    let addMode = document.querySelector('#createPersonForm p');
    element.classList.remove("hidden");
    document.querySelector('#createPersonForm span').innerHTML = '';
    addMode.innerHTML = `Game mode: ${gameMode}`;

    document.getElementById('mainMenu').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('mainMenu').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('gameMode').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('title').style.filter = 'blur(3px) brightness(50%)';

}

function showWaitingForPlayers() {
    let element = document.getElementById('wait');
    element.classList.remove('hidden');
    document.querySelector('#wait h1').innerHTML = `Waiting for second player...`;
    element.style.color = "#ffffff";
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('createPersonForm').style.pointerEvents = 'none';
    document.getElementById('createPersonForm').style.filter = 'blur(3px) brightness(30%)';
    document.getElementById('title').style.filter = 'blur(3px) brightness(30%)';
    document.getElementById('mainMenu').style.filter = 'blur(3px) brightness(30%)';
    document.getElementById('gameMode').style.filter = 'blur(3px) brightness(30%)';
    document.getElementById('backgroundVideo').style.filter = 'blur(8px) brightness(30%)';
    timeOut();
}

function cancelSearch() {
    playAudioBack();
    document.querySelector('#buttons span').innerHTML = `<h1>Search canceled.</h1>`;
    document.querySelector('#buttons span').style.color = 'rgba(255, 77, 77, 0.8)';
    document.getElementById('createPersonForm').style.pointerEvents = '';
    document.getElementById('wait').classList.add('hidden');
    document.getElementById('createPersonForm').style.filter = '';
    document.getElementById('mainMenu').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('gameMode').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('title').style.filter = 'blur(3px) brightness(50%)';
    document.getElementById('backgroundVideo').style.filter = 'blur(7px)';
    clearTimeout(timeVar);
}
