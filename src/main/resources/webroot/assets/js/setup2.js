"use strict";
document.addEventListener("DOMContentLoaded", init);
let squareList;
let pieceHolder;
let name;
let color;
let square;
let playerColor;
let gameMode;

function init() {
    addEvents();
    gameMode = JSON.parse(localStorage.getItem('gameMode'));
    document.getElementById('bg-image').style.backgroundImage = `url(../assets/media/${gameMode.toLowerCase()}.jpg)`;
    document.getElementById('showEndGame').addEventListener('click', endGame); //Test
    squareList = document.getElementById('squareList');
    pieceHolder = document.getElementById('pieceHolder');
    setupPage();
    preMadeSetup('blue', 'defensive');
    redTurn();
    /*const nameSpan = document.getElementById('username');

    fetch('/api/person/:name', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => {
            nameSpan.innerHTML = json.stringify()
        });
     */
}

function addEvents() {
    document.getElementById('showEndGame').addEventListener('click', endGame); //Test

    document.getElementById('defensive').addEventListener('click', function () {
        preMadeSetup('red', 'defensive')
    });

    document.getElementById('offensive').addEventListener('click', function () {
        preMadeSetup('red', 'offensive')
    });

    document.getElementById('mixed').addEventListener('click', function () {
        preMadeSetup('red', 'mixed')

    });
}

function endGame(isWon) { //Test
    if (isWon) {
        document.getElementById('victory').classList.remove('hidden')
    } else {
        document.getElementById('defeat').classList.remove('hidden')
    }
}

function setupPage() {
    let lake = document.getElementById("lake1");
    let lake2 = document.getElementById("lake2");
    for (let i = 0; i < 42; i++) {
        lake.insertAdjacentHTML('beforebegin', `<li>
    <div id="blankSquare-${i}"></div>
        </li>`);
    }
    for (let i = 99; i > 57; i--) {
        lake2.insertAdjacentHTML('afterend', `<li>
    <div id="blankSquare-${i}"></div>
        </li>`);
    }
    squareList.innerHTML = localStorage.getItem('setup');
}

window.onload = function () {
    setupOnClick("red");
};

function startGame() {
    sendNextTurn();

    function sendNextTurn() {
        let turn = {data: "goNext"};
        fetch("/api/next1", {
            method: "POST",
            body: JSON.stringify(turn),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(JSON.stringify(json)));
        console.log(JSON.stringify(turn));
    }

    let redSetupSubmit = [];
    let list = document.getElementById('squareList').getElementsByTagName("li");
    for (let i = 60; i < 100; i++) {
        let html = list[i].firstChild;
        let first = html.id.split("-", 1);
        let second = first[0].split("d");
        let code = second[1];
        switch (code) {
            case '8':
                code = 3;
                break;
            case '9':
                code = 2;
                break;
            case '5':
                code = 6;
                break;
            case '6':
                code = 5;
                break;
            case '4':
                code = 7;
                break;
            case '1':
                code = 10;
                break;
            case '7':
                code = 4;
                break;
            case '3':
                code = 8;
                break;
            case '2':
                code = 9;
                break;
            default:
                break;
        }
        redSetupSubmit.push(code);
    }
    let redPawns = {pawns: redSetupSubmit.toString()};
    console.log("sending " + JSON.stringify(redPawns));
    fetch("../api/stratego/redPawns", {
        method: "POST",
        body: JSON.stringify(redPawns),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => console.log(JSON.stringify(json)));
    console.log(redSetupSubmit);
    window.location.assign("/pages/boardList.html");
}

function redTurn() {
    document.querySelector("body h1").innerHTML = ("Second Player Setup (Red)");
    flipPieces("blue");
    setupOnClick("red");
    let setupDiv = document.getElementById('preMade');
    setupDiv.innerHTML = '<ul><li><input class="PreMadeBtn" id="switchSetup" type="button" value="Defensive" ' +
        'onclick="preMadeSetup(\'red\',\'defensive\')" /></li><li><input class="PreMadeBtn" id="switchSetup" type="button" ' +
        'value="Offensive" onclick="preMadeSetup(\'red\',\'offensive\')" /></li><li><input class="PreMadeBtn" id="switchSetup" ' +
        'type="button" value="Mixed" onclick="preMadeSetup(\'red\',\'mixed\')" /></li></ul>';

    console.log(document.getElementById("switchSetup").value);

}

function setupOnClick(playerColor) {
    squareList.onclick = function (e) {
        deleteAllDots();
        boardPiecePlacement(e.target.id, playerColor);
    };

    pieceHolder.onclick = function (e) {
        deleteAllDots();
        sidePiecePlacement(e.target.id, playerColor);
    };
}

function sidePiecePlacement(pieceName, playerColor) {

    setupOnClick(playerColor);

    name = pieceName.split("-")[0].replace("blue", "").replace("red", "");
    color = colorOfClick(pieceName);
    square = pieceName.split("-")[1];

    if (color === "blank") //don't allow to click on blank squares
        return;

    function activateDotBoard(startPoint) {
        for (let i = startPoint; i < startPoint + 40; i++) {
            activateDot(square, i, "sideToBoard");
        }
    }

    if (color === "blue" && playerColor === "blue") { // if it is a blue piece, only check the top half of the board
        activateDotBoard(0);
    } else if (color === "red" && playerColor === "red") { // if it is a red piece, check the bottom part
        activateDotBoard(60);
    }
}

function boardPiecePlacement(pieceName, playerColor) {

    setupOnClick(playerColor);

    color = colorOfClick(pieceName);
    square = pieceName.split("-")[1];
    name = pieceName.split("-")[0].replace("blue", "").replace("red", "");

    if (name === "blankSquare") //don't allow to click on blank squares
        return;

    function activate(startPoint, subtract) {
        for (let i = startPoint; i < startPoint + 40; i++) {
            checkStatus(i - subtract, square);
            if (i !== square) //check so you don't put a dot on the piece you clicked on
                activateDot(square, i, "boardToBoard");
        }
    }

    if (color === "blue" && playerColor === "blue") { // if it is a blue piece, only check the top half of the board
        activate(0, 0);
    } else if (color === "red" && playerColor === "red") { // if it is a red piece, check the bottom part
        activate(60, 20);
    }
}

function checkStatus(squareNumber, movedFromSquare) {
    let lItems = document.getElementById("pieceHolder").getElementsByTagName("li");
    let currentSquare = (lItems[squareNumber].innerHTML).split('"').reverse()[1];
    if (currentSquare.split("-")[0] === "blankSquare") {
        activateDot(movedFromSquare, squareNumber, "boardToSide");
        return 1;
    }
    return 11
}

function activateDot(movedFromSquare, movedToSquare, type) {
    let board = document.getElementById("squareList").getElementsByTagName("li");
    let currentHTML;
    let newHTML;

    if (type !== "boardToSide") {
        currentHTML = board[movedToSquare].innerHTML;
        newHTML = currentHTML + '<div class="moveCircle" id="listenForClick' + movedToSquare + '"></div>';
        board[movedToSquare].innerHTML = newHTML;
        document.getElementById("listenForClick" + movedToSquare).onclick = function () {
            dotClicked(movedFromSquare, movedToSquare, type);
        };
    }
}

function dotClicked(movedFromSquare, movedToSquare, type) {

    let board = document.getElementById("squareList").getElementsByTagName("li");
    let sideboard = document.getElementById("pieceHolder").getElementsByTagName("li");
    let movedFromHTML;
    let movedToHTML;

    if (type === "boardToSide") {
        movedFromHTML = board[movedFromSquare].innerHTML;
        movedToHTML = sideboard[movedToSquare].innerHTML;
    } else if (type === "boardToBoard") {
        movedFromHTML = board[movedFromSquare].innerHTML;
        movedToHTML = board[movedToSquare].innerHTML;
    } else if (type === "sideToBoard") {
        movedFromHTML = sideboard[movedFromSquare].innerHTML;
        movedToHTML = board[movedToSquare].innerHTML;
    }
    let squareID1;
    if (typeof movedFromHTML !== 'undefined') {
        squareID1 = (movedFromHTML).split(">")[0].split('"').reverse()[1];
    }
    let squareID2;
    let movedToHTMLUpdated;
    if (typeof movedToHTML !== 'undefined') {
        squareID2 = (movedToHTML).split(">")[0].split('"').reverse()[1];
        movedToHTMLUpdated = movedToHTML.replace(new RegExp('-[0-9][0-9]"|-[0-9]"', 'g'),
            "-" + squareID1 + '"');
    }

    let movedFromHTMLUpdated;
    if (typeof movedFromHTML !== 'undefined') {
        movedFromHTMLUpdated = movedFromHTML.replace(new RegExp('-[0-9][0-9]"|-[0-9]"', 'g'),
            "-" + squareID2 + '"');
    }
    if (typeof movedToHTMLUpdated !== 'undefined') {
        movedToHTMLUpdated = movedToHTMLUpdated.replace(new RegExp('-(.*)-', 'g'), "-");
    }
    if (typeof movedFromHTMLUpdated !== 'undefined') {
        movedFromHTMLUpdated = movedFromHTMLUpdated.replace(new RegExp('-(.*)-', 'g'), "-");
    }

    if (type === "boardToBoard") {
        board[movedFromSquare].innerHTML = movedToHTMLUpdated;
        board[movedToSquare].innerHTML = movedFromHTMLUpdated;
    } else if (type === "boardToSide") {
        board[movedFromSquare].innerHTML = movedToHTMLUpdated;
        sideboard[movedToSquare].innerHTML = movedFromHTMLUpdated;
    } else if (type === "sideToBoard") {
        sideboard[movedFromSquare].innerHTML = movedToHTMLUpdated;
        board[movedToSquare].innerHTML = movedFromHTMLUpdated;
    }

    playerColor = colorOfClick(squareID1); //used to tell whose turn it is
    let sideboardInner = pieceHolder.innerHTML;

    if (((sideboardInner.match(/blankSquare/g)).length) >= 40 && playerColor === "blue") {
        preMadeButton("switchSetup", "Submit", redTurn)
    }

    if (((sideboardInner.match(/blankSquare/g)).length) >= 80) {
        preMadeButton("startGame", "Start Game", startGame)
    }
    setupOnClick(playerColor);
}


function colorOfClick(idname) {
    if ((idname).indexOf("blue") !== -1) {
        return "blue";
    } else if ((idname).indexOf("red") !== -1) {
        return "red";
    } else {
        return "blank";
    }
}

function deleteAllDots() {
    // clear main board
    function deleteDots(elementGroup, size) {
        let board = document.getElementById(elementGroup).getElementsByTagName("li");
        for (let i = 0; i < size; i++) {
            let line = board[i].innerHTML;
            if (line.indexOf("moveCircle") !== -1) { // section to change
                board[i].innerHTML = line.replace(new RegExp("(<div class=\"moveCircle\" id=\"listenForClick..\"></div>)|" +
                    "(<div class=\"moveCircle\" id=\"listenForClick.\"></div>)|" +
                    "(<div class=\"moveCircleCombat\" id=\"listenForClick..\"></div>)|" +
                    "(<div class=\"moveCircleCombat\" id=\"listenForClick.\"></div>)", "g"), "");
            }
        }
    }

    deleteDots("squareList", 100);
    deleteDots("pieceHolder", 80);
}

function flipPieces(color) {
    let lines = document.getElementById("squareList").getElementsByTagName("li");

    for (let i = 0; i < 100; i++) {
        let line = lines[i].innerHTML;
        if (line.indexOf(color) !== -1) {
            if (line.indexOf(color + "Back") !== -1) {
                // change to pieceIMG
                let lineID = line.split("-")[0].split("id=\"")[1];
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"),
                    "/assets/media/pieces/" + lineID + ".png");
            } else {
                // change to backIMG
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"),
                    "/assets/media/pieces/" + color + "Back.png");
            }
        }
    }
}

function preMadeButton(id, value, functionCall) {
    let preMadeDiv = document.getElementById('preMade');
    let preMadeLI = preMadeDiv.getElementsByTagName('li');
    let button = "<input id=\"" + id + "\" value=\"" + value + "\" type=\"button\">";

    // is it already on the board?
    for (let i = 0; i < preMadeLI.length; i++) {
        if (preMadeLI[i].innerHTML === button) {
            return; // just to exit
        }
    }

    //if not put it on the board
    preMadeDiv.innerHTML = (preMadeDiv.innerHTML).replace("</ul>", "") +
        "<li>" + button + '</li></ul>';

    document.getElementById(id).addEventListener('click', functionCall);


}

function preMadeSetup(color, setupType) {
    document.getElementById("preMade").removeAttribute("style");
    document.getElementById("preMade").classList.add("moveUp");
    let setupList = [];
    if (setupType === "defensive") {
        setupList = ["8", "8", "8", "9", "6", "9", "4", "Flag", "5", "5", "9", "9", "8", "6", "Bomb", "Bomb", "6",
            "4", "4", "5", "8", "1", "6", "Bomb", "7", "7", "Bomb", "3", "Spy", "3", "9", "9", "Bomb", "7", "9", "9",
            "7", "Bomb", "2", "5"];
    } else if (setupType === "offensive") {
        setupList = ["Bomb", "6", "8", "5", "7", "8", "4", "Bomb", "7", "Flag", "8", "9", "Bomb", "Spy", "5", "Bomb",
            "6", "9", "Bomb", "7", "4", "8", "9", "8", "9", "3", "5", "4", "1", "Bomb", "9", "6", "2", "9", "3", "9",
            "6", "7", "9", "5"];
    } else if (setupType === "mixed") {
        setupList = ["9", "8", "8", "9", "6", "Bomb", "Flag", "Bomb", "5", "8", "7", "5", "9", "8", "5", "4", "3",
            "6", "7", "7", "4", "Bomb", "7", "6", "5", "Bomb", "6", "4", "Bomb", "Bomb", "9", "2", "Spy", "3", "9",
            "9", "8", "1", "9", "9"];
    }

    if (color === "blue") {
        preMadeButton("switchSetup", "Submit", redTurn);
        setupOnClick("blue");
    }
    let range = 0;
    let range2 = 0;
    if (color === "red") {
        range = 60;
        range2 = 40;
        setupList.reverse();
        preMadeButton("startGame", "Start Game", startGame);
        setupOnClick("red");
    }

    let boardLines = document.getElementById("squareList").getElementsByTagName("li");
    let sideLines = document.getElementById("pieceHolder").getElementsByTagName("li");
    for (let i = 0; i < setupList.length; i++) {
        boardLines[i + range].innerHTML = "<img src=\"../assets/media/pieces/" + color + setupList[i] + ".png\" id=\"" +
            color + setupList[i] + "-" + (i + range) + "\">";
        sideLines[i + range2].innerHTML = "<div id=\"blankSquare-" + (i + range2) + "\"></div>";
    }
}
