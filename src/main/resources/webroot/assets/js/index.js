"use strict";

document.addEventListener("DOMContentLoaded", init);

let settings = [];
let defaultSettings = ['Rain', 'Enabled', 'Enabled'];
let gameMode;

let formInfo = [];

function init() {
    settings = JSON.parse(localStorage.getItem('settings'));
    if (settings === null) {
        settings = defaultSettings
    }

    setTheme(settings[0]);
    setSfx(settings[1]);
    setMusic(settings[2]);

    formInfo = JSON.parse(localStorage.getItem('formInfo'));
    if (formInfo != null) {
        document.getElementById('name').value = formInfo[0];
        document.getElementById('age').value = formInfo[1];
        document.getElementById('token').value = formInfo[2];
    }

    enableCollapsible();
    preventEarlyEvents();
    playMusic();

    document.getElementById('backgroundVideo').style.pointerEvents = 'none';

    console.log("DOMContentLoaded");
    const createPersonForm = document.getElementById("createPersonForm");
    const nameIn = document.getElementById("name");
    const ageIn = document.getElementById("age");
    const tokenIn = document.getElementById("token");
    const responseSpan = document.getElementById("response");
    const detailSpan = document.getElementById("details");

    createPersonForm.onsubmit = function (evt) {
        evt.preventDefault();

        playLoadingAudio();
        showWaitingForPlayers();
        let data = {
            token: tokenIn.value,
            person: {
                name: nameIn.value,
                age: parseInt(ageIn.value)
            }
        };

        console.log("Sending:", data);

        fetch("api/person", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => responseSpan.innerHTML = JSON.stringify(json))
            .catch(error => console.error('Error:', error));

        fetch("api/details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => detailSpan.innerHTML = JSON.stringify(json))
            .catch(error => console.error('Error:', error));
    };

    document.getElementById("Classic").addEventListener("click", function () {
        let data = {gameMode: "classic"};
        console.log("sending " + JSON.stringify(data));

        fetch("api/stratego/gameMode", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(JSON.stringify(json)));
    });

    document.getElementById("Duel").addEventListener("click", function () {
        let data = {gameMode: "duel"};
        console.log("sending " + JSON.stringify(data));
        fetch("api/stratego/gameMode", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(JSON.stringify(json)));
    });

    document.getElementById("Infiltrator").addEventListener("click", function () {
        let data = {gameMode: "infiltrator"};
        console.log("sending " + JSON.stringify(data));
        fetch("/api/games/:gameToken/gamemode", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(JSON.stringify(json)));
    });

    document.getElementById("Secret").addEventListener("click", function () {
        let data = {gameMode: "airborn"};
        console.log("sending " + JSON.stringify(data));
        fetch("api/stratego/gameMode", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(JSON.stringify(json)));
    });
}

let selector = document.querySelectorAll('a');
document.querySelector('#createPersonForm input[type=submit]')
    .addEventListener('mouseover', playAudioHover);
for (let i = 0; i < selector.length; i++) {
    selector[i].addEventListener('mouseover', playAudioHover);
}
document.getElementById('Secret').removeEventListener('mouseover', playAudioHover);

let allowAudio = true;
let allowMusic = true;

let sfxStatus;
let themeStatus;
let musicStatus;

let music = new Audio('assets/audios/bgmusic.mp3');

function enableCollapsible() {

    let selectorCollapse = document.getElementsByClassName('collapsible');

    for (let i = 0; i < selectorCollapse.length; i++) selectorCollapse[i]
        .addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
}

function preventEarlyEvents() {
    document.body.style.pointerEvents = 'none';
    setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
    }, 3000)
}

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

let bgStyle = 'blur(0) brightness(50%)';

function showRules() {
    playAudioForward();
    document.getElementById('rules').classList.remove('hidden');
    document.getElementById('mainMenu').style.filter = bgStyle;
    document.getElementById('gameMode').style.filter = bgStyle;
    document.getElementById('title').style.filter = bgStyle;
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('gameMode').style.pointerEvents = 'none';
}

function showSettings() {
    playAudioForward();
    getCurrentSettings();
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('settings').classList.remove('hidden');
    document.getElementById('mainMenu').style.filter = bgStyle;
    document.getElementById('gameMode').style.filter = bgStyle;
    document.getElementById('title').style.filter = bgStyle;
}

function confirmExit() {
    playAudioForward();
    document.getElementById('mainMenu').style.filter = bgStyle;
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('exit').classList.remove('hidden');
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('gameMode').style.filter = bgStyle;
    document.getElementById('title').style.filter = bgStyle;
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
    goBackTo(screen[id], sfxStatus, musicStatus, themeStatus);
    document.getElementById('title').style.filter = '';
    document.getElementById('gameMode').style.filter = '';
    document.getElementById('mainMenu').style.filter = '';
    document.getElementById('mainMenu').style.pointerEvents = '';
    document.getElementById('gameMode').style.pointerEvents = '';
}

function goBackTo(screenId, sfxStatus, musicStatus, themeStatus) {
    if (screenId === "rules" || screenId === 'exit') {
        document.getElementById('mainMenu').style.filter = '';

    } else if (screenId === "gameMode") {
        document.getElementById('mainMenu').style.borderStyle = 'solid';
        document.getElementById('play').style.borderColor = 'transparent';
    } else if (screen[id] === "settings") {
        setSfx(sfxStatus);
        setMusic(musicStatus);
        if (themeStatus !== document.getElementById('theme').value) {
            setTheme(themeStatus);
        }
        document.getElementById('mainMenu').style.filter = '';
    } else {
        document.getElementById(screenId - 1).classList.remove('hidden')
    }
}

function getCurrentSettings() {
    sfxStatus = document.getElementById('sound').value;
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

function changeSfx() {
    let newAudioValue;
    if (document.getElementById('sound').value === 'Enabled') {
        newAudioValue = 'Disabled';
    } else {
        newAudioValue = 'Enabled';
    }
    setSfx(newAudioValue)
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


function setSfx(value) {
    document.getElementById('sound').value = value;
    allowAudio = value === 'Enabled';
}

function setTheme(value) {
    let values = ['Rain', 'Wild', 'Magic', 'Desert'];

    document.getElementById('theme').value = value;

    let titleColor;
    let sheet;
    let bgVideo;
    switch (values.indexOf(value)) {
        case 0:
            titleColor = 'rgba(255, 140, 26, 0.6)';
            sheet = 'app.css';
            bgVideo = 'rain.mp4';
            break;
        case 1:
            titleColor = "rgba(255, 77, 77, 0.6)";
            sheet = 'app-wild.css';
            bgVideo = 'wild.mp4';
            break;
        case 2:
            titleColor = "rgba(179, 0, 179, 0.6)";
            sheet = 'app-magic.css';
            bgVideo = 'magic.mp4';
            break;
        case 3:
            titleColor = "rgba(51, 51, 255, 0.6)";
            sheet = 'app-desert.css';
            bgVideo = 'desert.mp4';
            break;
    }
    themeChanges(titleColor, sheet, source, bgVideo, video, value);
}

function themeChanges(titleColor, sheet, source, bgVideo, video, value) {
    document.getElementById('title').style.color = titleColor;

    //Changes stylesheet
    document.getElementById('themeSheet').setAttribute('href', `assets/css/${sheet}`);

    //Changes background
    source.setAttribute('src', `assets/videos/${bgVideo}`);
    video.appendChild(source);
    if (value === 'Wild') {
        video.style.transform = 'scale(-1, 1)';
    } else {
        video.style.transform = '';
    }
    video.load();
    video.play();
    video.loop = true;
}

function saveChanges() {
    playAudioForward();
    document.querySelector('#settingButtons p').innerHTML = `Changes saved!`;
    getCurrentSettings();
    settings = [themeStatus, sfxStatus, musicStatus];
    localStorage.setItem('settings', JSON.stringify(settings));
}

function resetSettings() {
    setSfx('Enabled');
    setMusic('Enabled');
    if (document.getElementById('theme').value !== 'Rain') {
        setTheme('Rain');
    }
}

function showGameMode(id) {
    playAudioForward();

    document.getElementById('gameMode').classList.remove('hidden');
    document.getElementById(id).style.border = '3px solid';
    document.getElementById('mainMenu').style.borderStyle = 'none';
}

function showModeDetails(i) {
    let info = [
        "Capture the flag using all of the pieces except the infiltrator.",
        "Capture the flag using 10 specific pieces.",
        "Capture the flag with only 7 scouts and the Infiltrator.",
        "Capture the flag but Scouts are replaced with pilots and airports."
    ];
    document.getElementById('infoBox').classList.remove('hidden');
    document.querySelector('#infoBox').innerHTML = `<p>${info[i]}</p>`;
}

function hideModeDetails() {
    document.getElementById('infoBox').classList.add('hidden');
}

function showForm(gameMode) {
    localStorage.setItem('gameMode', JSON.stringify(gameMode));
    playAudioForward();
    let element = document.getElementById("createPersonForm");
    let addMode = document.querySelector('#mode');
    element.classList.remove("hidden");
    document.querySelector('#createPersonForm span').innerHTML = '';
    addMode.innerHTML = `Game mode: ${gameMode}`;
    StyleBrightnessAndBlur(bgStyle);


}

function StyleBrightnessAndBlur(bgStyle) {
    document.getElementById('mainMenu').style.filter = bgStyle;
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('mainMenu').style.filter = bgStyle;
    document.getElementById('gameMode').style.filter = bgStyle;
    document.getElementById('title').style.filter = bgStyle;
}

let bgDarkStyle = 'blur(4px) brightness(30%)';
let timeVar;

function showWaitingForPlayers() {
    playAudioForward();
    let element = document.getElementById('wait');
    element.classList.remove('hidden');
    document.getElementById('response').classList.add('hidden');
    document.getElementById('loadingMsg').classList.remove('hidden');
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('details').classList.add('hidden');
    document.querySelector('#wait p').innerHTML = `Waiting for second player...`;
    element.style.color = "#ffffff";
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('createPersonForm').style.pointerEvents = 'none';
    document.getElementById('createPersonForm').style.filter = bgDarkStyle;
    document.getElementById('title').style.filter = bgDarkStyle;
    document.getElementById('mainMenu').style.filter = bgDarkStyle;
    document.getElementById('gameMode').style.filter = bgDarkStyle;
    document.getElementById('backgroundVideo').style.filter = 'blur(8px) brightness(30%)';
    timeVar = setTimeout(() => {
        initializeGame()
    }, 3000)
}

function initializeGame() {
    document.getElementById("loadingMsg").classList.add('hidden');
    document.getElementById("response").classList.remove('hidden');
    document.getElementById("loader").classList.add('hidden');
    document.getElementById('details').classList.remove('hidden');

    timeVar = setTimeout(() => {
        window.location.href = "setup.html"
    }, 2000)
}

function cancelSearch() {
    playAudioBack();
    document.querySelector('#buttons span').innerHTML = `<h1>Search canceled.</h1>`;
    document.querySelector('#buttons span').style.color = 'rgba(255, 77, 77, 0.8)';
    document.getElementById('createPersonForm').style.pointerEvents = '';
    document.getElementById('wait').classList.add('hidden');
    document.getElementById('createPersonForm').style.filter = '';
    document.getElementById('mainMenu').style.filter = bgStyle;
    document.getElementById('gameMode').style.filter = bgStyle;
    document.getElementById('title').style.filter = bgStyle;
    document.getElementById('backgroundVideo').style.filter = 'blur(7px)';
    clearTimeout(timeVar);
}
