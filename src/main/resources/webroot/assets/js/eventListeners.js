"use strict";

document.addEventListener('DOMContentLoaded', addEvents);

function addEvents() {

    document.getElementById("showRules").addEventListener('click', showRules);
    document.getElementById("showSettings").addEventListener('click', showSettings);
    document.getElementById("confirmExit").addEventListener('click', confirmExit);

    document.getElementById("theme").addEventListener('click', changeTheme);
    document.getElementById("sound").addEventListener('click', changeSfx);
    document.getElementById("music").addEventListener('click', changeMusic);
    document.getElementById("reset").addEventListener('click', resetSettings);

    document.getElementById("saveChanges").addEventListener('click', saveChanges);

    document.getElementById("cancel").addEventListener('click', cancelSearch);

}



