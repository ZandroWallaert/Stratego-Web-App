"use strict";

document.addEventListener("DOMContentLoaded", init);

let sfxStatus;
let themeStatus;
let musicStatus;
let video;
let clickForward = "click-forward"; //Frequently used file name without extension, in case a refactor is needed!

let settings = [];
let defaultSettings = ['Rain', 'Enabled', 'Disabled'];
let gameMode;

let formInfo = [];

let contentType = 'Content-Type';
let appJson = 'application/json';

function init() {
    document.body.innerHTML = appHTML;
    video = document.getElementById('backgroundVideo');
    addEvents();
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

        playAudio('loading');
        showWaitingForPlayers();
        let data = {
            token: tokenIn.value,
            person: {
                name: nameIn.value,
                age: parseInt(ageIn.value)
            }
        };

        console.log("Sending:", data);

        fetch("../api/person", {
            method: "POST",
            headers: {
                contentType: appJson
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => responseSpan.innerHTML = JSON.stringify(json))
            .catch(error => console.error('Error:', error));

        fetch("../api/details", {
            method: "POST",
            headers: {
                contentType: appJson
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => detailSpan.innerHTML = JSON.stringify(json))
            .catch(error => console.error('Error:', error));
    };

    document.getElementById("classic").addEventListener("click", function () {
        sendGameMode('classic')
    });
}

function sendGameMode(gameMode) {
    let data = {gameMode: gameMode};
    console.log("sending " + JSON.stringify(data));
    fetch("../api/stratego/gameMode", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            contentType: appJson
        }
    })
        .then(res => res.json())
        .then(json => console.log(JSON.stringify(json)));

}

function addEvents() {

    let classic = document.getElementById('classic');
    let duel = document.getElementById('duel');
    let infiltrator = document.getElementById('infiltrator');
    let airborne = document.getElementById('airborne');

    //Adds hover sounds
    let selector = document.querySelectorAll('a');
    document.querySelector('#createPersonForm input[type=submit]')
        .addEventListener('mouseover', function () {
            playAudio('hover')
        });
    for (let i = 0; i < selector.length; i++) {
        selector[i].addEventListener('mouseover', function () {
            playAudio('hover')
        })
    }

    //Main menu screen
    document.getElementById('play').addEventListener('click', showGameMode);
    document.getElementById("showRules").addEventListener('click', function () {
        showWindow('rules')
    });
    document.getElementById("showSettings").addEventListener('click', function () {
        showWindow('settings')
    });
    document.getElementById("confirmExit").addEventListener('click', function () {
        showWindow('exit')
    });

    //Game mode select screen
    classic.addEventListener('click', function () {
        showForm('Classic')
    });

    classic.addEventListener('mouseout', hideModeDetails);
    duel.addEventListener('mouseout', hideModeDetails);
    infiltrator.addEventListener('mouseout', hideModeDetails);
    airborne.addEventListener('mouseout', hideModeDetails);

    classic.addEventListener('mouseover', function () {
        showModeDetails(0)
    });
    duel.addEventListener('mouseover', function () {
        showModeDetails(1)
    });
    infiltrator.addEventListener('mouseover', function () {
        showModeDetails(2)
    });
    airborne.addEventListener('mouseover', function () {
        showModeDetails(3)
    });

    document.getElementById('hideGameModes').addEventListener('click', function () {
        document.getElementById('gameMode').classList.add('hidden');
        document.getElementById('mainMenu').style.borderStyle = 'solid';
        document.getElementById('play').style.borderColor = 'transparent';
    });

    //How to play screen
    document.getElementById('hideRules').addEventListener('click', function () {
        document.getElementById('rules').classList.add('hidden');
        removeBackgroundFilters()
    });

    //Settings screen
    document.getElementById('theme').addEventListener('click', changeTheme);
    document.getElementById('sound').addEventListener('click', function () {
        changeAudio('sound')
    });
    document.getElementById('music').addEventListener('click', function () {
        changeAudio('music')
    });
    document.getElementById('reset').addEventListener('click', resetSettings);

    document.getElementById('saveChanges').addEventListener('click', saveChanges);
    document.getElementById('hideSettings').addEventListener('click', function () {
        document.getElementById('settings').classList.add('hidden');
        setSfx(sfxStatus);
        setMusic(musicStatus);
        if (themeStatus !== document.getElementById('theme').value) {
            setTheme(themeStatus);
        }
        removeBackgroundFilters();
    });

    //Form & loading screen
    document.getElementById('hideForm').addEventListener('click', function () {
        document.getElementById('createPersonForm').classList.add('hidden');
        removeBackgroundFilters();
    });

    document.getElementById("cancel").addEventListener('click', cancelSearch);
    document.getElementById('createPersonForm').addEventListener('change', getFormInfo);

    //Exit screen
    document.getElementById('hideExit').addEventListener('click', function () {
        document.getElementById('exit').classList.add('hidden');
        removeBackgroundFilters();
    });

    function removeBackgroundFilters() {
        clearHTML();
        document.getElementById('title').style.filter = '';
        document.getElementById('gameMode').style.filter = '';
        document.getElementById('mainMenu').style.filter = '';
        document.getElementById('mainMenu').style.pointerEvents = '';
        document.getElementById('gameMode').style.pointerEvents = '';
    }
}

let allowAudio = true;
let allowMusic = true;

let music = new Audio('../assets/audios/bgmusic.mp3');

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

function playAudio(audio) { //possible values: loading, click-forward, hover
    if (allowAudio) {
        audio = new Audio(`../assets/audios/${audio}.mp3`);
        audio.play();
    }
}

function addBackgroundEffects(style) {
    document.getElementById('mainMenu').style.filter = style;
    document.getElementById('gameMode').style.pointerEvents = 'none';
    document.getElementById('mainMenu').style.pointerEvents = 'none';
    document.getElementById('gameMode').style.filter = style;
    document.getElementById('title').style.filter = style;
}

let bgStyle = 'blur(0) brightness(50%)';
let bgDarkStyle = 'blur(4px) brightness(30%)';

function clearHTML() {
    playAudio(clickForward);
    document.querySelectorAll('#bottom p').innerHTML = '';
    document.querySelector('#settingButtons p').innerHTML = '';
    document.getElementById('wait').classList.add('hidden');
    document.getElementById('wait').classList.remove('flex');
}

function getCurrentSettings() {
    sfxStatus = document.getElementById('sound').value;
    themeStatus = document.getElementById('theme').value;
    musicStatus = document.getElementById('music').value;
}

function getFormInfo() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let token = document.getElementById('token').value;
    let formInfo = [name, age, token];

    localStorage.setItem('formInfo', JSON.stringify(formInfo));
}

function changeAudio(type) { //Possible values: 'music', 'sound'
    let newAudioValue;
    if (document.getElementById(type).value === 'Enabled') {
        newAudioValue = 'Disabled';
    } else {
        newAudioValue = 'Enabled';
    }
    if (type === 'sound') {
        setSfx(newAudioValue)
    } else if (type === 'music') {
        setMusic(newAudioValue)
    } else {
        console.error('Invalid type input in changeAudio(type)') //Should never happen!
    }
}

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

    document.getElementById('title').style.color = titleColor;

    //Changes stylesheet
    document.getElementById('themeSheet').setAttribute('href', `../assets/css/${sheet}`);

    //Changes background
    source.setAttribute('src', `../assets/videos/${bgVideo}`);
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
    playAudio(clickForward);
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

function showWindow(windowId) { //Possible values: 'rules', 'settings', 'exit'
    if (windowId === 'settings') {
        getCurrentSettings();
    }
    playAudio(clickForward);
    addBackgroundEffects(bgStyle);
    document.getElementById(windowId).classList.remove('hidden');
}

function showGameMode() {
    playAudio(clickForward);

    document.getElementById('gameMode').classList.remove('hidden');
    document.getElementById('play').style.border = '3px solid';
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
    playAudio(clickForward);
    let element = document.getElementById("createPersonForm");
    let addMode = document.querySelector('#mode');
    element.classList.remove("hidden");
    document.querySelector('#createPersonForm span').innerHTML = '';
    addMode.innerHTML = `Game mode: ${gameMode}`;
    addBackgroundEffects(bgStyle);
}

let timeVar;

function showWaitingForPlayers() {
    playAudio(clickForward);
    addBackgroundEffects(bgDarkStyle);

    let element = document.getElementById('wait');

    element.classList.remove('hidden');
    element.style.color = "#ffffff";
    document.getElementById('response').classList.add('hidden');
    document.getElementById('loadingMsg').classList.remove('hidden');
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('details').classList.add('hidden');
    document.querySelector('#wait p').innerHTML = `Waiting for second player...`;
    document.getElementById('createPersonForm').style.pointerEvents = 'none';
    document.getElementById('createPersonForm').style.filter = bgDarkStyle;
    document.getElementById('backgroundVideo').style.filter = 'blur(8px) brightness(30%)';

    timeVar = setTimeout(() => {
        initializeGame()
    }, 1500)
}

function initializeGame() {
    document.getElementById("loadingMsg").classList.add('hidden');
    document.getElementById("response").classList.remove('hidden');
    document.getElementById("loader").classList.add('hidden');
    document.getElementById('details').classList.remove('hidden');


    if (document.body.title === 'player1') {
        timeVar = setTimeout(() => {
            window.location.href = "setup.html"
        }, 1000)
    } else {
        timeVar = setTimeout(() => {
            window.location.href = "wait2.html"
        }, 1000)
    }
}

function cancelSearch() {
    playAudio(clickForward);
    addBackgroundEffects(bgStyle);
    document.querySelector('#buttons span').innerHTML = `<h1>Search canceled.</h1>`;
    document.querySelector('#buttons span').style.color = 'rgba(255, 77, 77, 0.8)';
    document.getElementById('createPersonForm').style.pointerEvents = '';
    document.getElementById('wait').classList.add('hidden');
    document.getElementById('createPersonForm').style.filter = '';
    document.getElementById('backgroundVideo').style.filter = 'blur(7px)';
    clearTimeout(timeVar);
}
