"use strict";
window.onload = function () {
    alert("Blue player setup");
    setupOnClick("blue");
};

function startGame() {
    var listTextStr = document.getElementById('squareList').innerHTML;
    localStorage.setItem('testObject', listTextStr);
    window.location.assign("boardlist.html");
}

function redTurn() {
    flipPieces("blue");
    setupOnClick("red");
    var setupDiv = document.getElementById('premade');
    setupDiv.innerHTML = '<ul><li><input id="switchSetup" type="button" value="Defensive" onclick="premadeSetup(\'red\',\'defensive\')" /></li><li><input id="switchSetup" type="button" value="Offensive" onclick="premadeSetup(\'red\',\'offensive\')" /></li><li><input id="switchSetup" type="button" value="Mixed" onclick="premadeSetup(\'red\',\'mixed\')" /></li></ul>';
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
    var squareList = document.getElementById('squareList');
    var pieceHolder = document.getElementById('pieceHolder');

    setupOnClick(playerColor);

    var name = pieceName.split("-")[0].replace("blue", "").replace("red", "");
    var color = colorOfClick(pieceName);
    var square = pieceName.split("-")[1];

    if (color == "blank") //makes sure we don't allow them to click on blank squares
        return;

    function activateDotBoard(startPoint) {
        for (var i = startPoint; i < startPoint + 40; i++) {
            activateDot(square, i, "sideToBoard");
        }
    }

    if (color == "blue" && playerColor == "blue") { // if it is a blue piece, only check the top half of the board
        activateDotBoard(0);
    } else if (color == "red" && playerColor == "red") { // if it is a red piece, check the bottom part
        activateDotBoard(60);
    }
}

function boardPiecePlacement(pieceName, playerColor) {
    var squareList = document.getElementById('squareList');
    var pieceHolder = document.getElementById('pieceHolder');

    setupOnClick(playerColor);

    var color = colorOfClick(pieceName);
    var square = pieceName.split("-")[1];
    var name = pieceName.split("-")[0].replace("blue", "").replace("red", "");

    if (name == "blankSquare") //makes sure we don't allow them to click on blank squares
        return;

    function activate(startPoint, subtract) {
        for (var i = startPoint; i < startPoint + 40; i++) {
            checkstatus(i - subtract, square);
            if (i != square) //check so you don't put a dot on the piece you clicked on
                activateDot(square, i, "boardToBoard");
        }
    }

    if (color == "blue" && playerColor == "blue") { // if it is a blue piece, only check the top half of the board
        activate(0, 0);
    } else if (color == "red" && playerColor == "red") { // if it is a red piece, check the bottom part
        activate(60, 20);
    }
}

function checkstatus(squareNumber, movedFromSquare) {
    var lItems = document.getElementById("pieceHolder").getElementsByTagName("li");
    var currentSquare = (lItems[squareNumber].innerHTML).split('"').reverse()[1];
    if (currentSquare.split("-")[0] == "blankSquare") {
        activateDot(movedFromSquare, squareNumber, "boardToSide");
        return 1;
    }
}

function activateDot(movedFromSquare, movedToSquare, type) {
    var board = document.getElementById("squareList").getElementsByTagName("li");
    var sideboard = document.getElementById("pieceHolder").getElementsByTagName("li");
    var currentHTML;
    var newHTML;

    if (type != "boardToSide") {
        currentHTML = board[movedToSquare].innerHTML;
        newHTML = currentHTML + '<div class="moveCircle" id="listenForClick' + movedToSquare + '"></div>';
        board[movedToSquare].innerHTML = newHTML;
        document.getElementById("listenForClick" + movedToSquare).onclick = function () {
            dotClicked(movedFromSquare, movedToSquare, type);
        };
    }
    if (type == "boardToSide") { // if the piece you clicked on was on the board and you want to move it to the side
        currentHTML = sideboard[movedToSquare].innerHTML;
        newHTML = currentHTML + '<div class="moveCircle" id="listenForClickSide' + movedToSquare + '"></div>';
    }
}

function dotClicked(movedFromSquare, movedToSquare, type) {

    var board = document.getElementById("squareList").getElementsByTagName("li");
    var sideboard = document.getElementById("pieceHolder").getElementsByTagName("li");
    var movedFromHTML;
    var movedToHTML;

    if (type == "boardToSide") {
        movedFromHTML = board[movedFromSquare].innerHTML;
        movedToHTML = sideboard[movedToSquare].innerHTML;
    } else if (type == "boardToBoard") {
        movedFromHTML = board[movedFromSquare].innerHTML;
        movedToHTML = board[movedToSquare].innerHTML;
    } else if (type == "sideToBoard") {
        movedFromHTML = sideboard[movedFromSquare].innerHTML;
        movedToHTML = board[movedToSquare].innerHTML;
    }

    var squareID1 = (movedFromHTML).split(">")[0].split('"').reverse()[1];
    var squareID2 = (movedToHTML).split(">")[0].split('"').reverse()[1];

    var movedToHTMLUpdated = movedToHTML.replace(new RegExp('-[0-9][0-9]"|-[0-9]"', 'g'), "-" + squareID1 + '"');
    var movedFromHTMLUpdated = movedFromHTML.replace(new RegExp('-[0-9][0-9]"|-[0-9]"', 'g'), "-" + squareID2 + '"');

    movedToHTMLUpdated = movedToHTMLUpdated.replace(new RegExp('-(.*)-', 'g'), "-");
    movedFromHTMLUpdated = movedFromHTMLUpdated.replace(new RegExp('-(.*)-', 'g'), "-");

    if (type == "boardToBoard") {
        board[movedFromSquare].innerHTML = movedToHTMLUpdated;
        board[movedToSquare].innerHTML = movedFromHTMLUpdated;
    } else if (type == "boardToSide") {
        board[movedFromSquare].innerHTML = movedToHTMLUpdated;
        sideboard[movedToSquare].innerHTML = movedFromHTMLUpdated;
    } else if (type == "sideToBoard") {
        sideboard[movedFromSquare].innerHTML = movedToHTMLUpdated;
        board[movedToSquare].innerHTML = movedFromHTMLUpdated;
    }

    var squareList = document.getElementById('squareList');
    var pieceHolder = document.getElementById('pieceHolder');

    var playerColor = colorOfClick(squareID1); //used to tell whose turn it is
    var sideboardInner = pieceHolder.innerHTML;

    var documentPage = document.getElementById('premade');
    if (((sideboardInner.match(/blankSquare/g)).length) >= 40 && playerColor == "blue") {
        premadeButton("switchSetup", "Submit", "redTurn()")
    }

    if (((sideboardInner.match(/blankSquare/g)).length) >= 80) {
        premadeButton("startGame", "Start Game", "startGame()")
    }
    setupOnClick(playerColor);
}


function colorOfClick(idname) {
    if ((idname).indexOf("blue") != -1) {
        return "blue";
    } else if ((idname).indexOf("red") != -1) {
        return "red";
    } else {
        return "blank";
    }
}

function deleteAllDots() {
    // clear main board
    function deleteDots(elementGroup, size) {
        var board = document.getElementById(elementGroup).getElementsByTagName("li");
        for (var i = 0; i < size; i++) {
            var line = board[i].innerHTML;
            if (line.indexOf("moveCircle") != -1) { // section to change
                board[i].innerHTML = line.replace(new RegExp("(<div class=\"moveCircle\" id=\"listenForClick..\"></div>)|(<div class=\"moveCircle\" id=\"listenForClick.\"></div>)|(<div class=\"moveCircleCombat\" id=\"listenForClick..\"></div>)|(<div class=\"moveCircleCombat\" id=\"listenForClick.\"></div>)", "g"), "");
            }
        }
    }

    deleteDots("squareList", 100);
    deleteDots("pieceHolder", 80);
}

function flipPieces(color) {
    var lines = document.getElementById("squareList").getElementsByTagName("li");

    for (var i = 0; i < 100; i++) {
        var line = lines[i].innerHTML;
        if (line.indexOf(color) != -1) {
            if (line.indexOf(color + "Back") != -1) {
                // change to pieceIMG
                var lineID = line.split("-")[0].split("id=\"")[1];
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"), "/webroot/assets/media/pieces/" + lineID + ".png");
            } else {
                // change to backIMG
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"), "/webroot/assets/media/pieces/" + color + "Back.png");
            }
        }
    }
}

function premadeButton(id, value, functionCall) {
    var premadeDiv = document.getElementById('premade');
    var premadeLI = premadeDiv.getElementsByTagName('li');
    var button = "<input id=\"" + id + "\" value=\"" + value + "\" onclick=\"" + functionCall + "\" type=\"button\">";

    // is it already on the board?
    for (var i = 0; i < premadeLI.length; i++) {
        if (premadeLI[i].innerHTML == button) {
            return; // just to exit
        }
    }

    //if not put it on the board
    premadeDiv.innerHTML = (premadeDiv.innerHTML).replace("</ul>", "") + "<li>" + button + '</li></ul>';
}

function premadeSetup(color, setupType) {
    var setupList = [];
    if (setupType == "defensive") {
        setupList = ["8", "8", "8", "9", "6", "9", "4", "Flag", "5", "5", "9", "9", "8", "6", "Bomb", "Bomb", "6", "4", "4", "5", "8", "1", "6", "Bomb", "7", "7", "Bomb", "3", "Spy", "3", "9", "9", "Bomb", "7", "9", "9", "7", "Bomb", "2", "5"];
    } else if (setupType == "offensive") {
        setupList = ["Bomb", "6", "8", "5", "7", "8", "4", "Bomb", "7", "Flag", "8", "9", "Bomb", "Spy", "5", "Bomb", "6", "9", "Bomb", "7", "4", "8", "9", "8", "9", "3", "5", "4", "1", "Bomb", "9", "6", "2", "9", "3", "9", "6", "7", "9", "5"];
    } else if (setupType == "mixed") {
        setupList = ["9", "8", "8", "9", "6", "Bomb", "Flag", "Bomb", "5", "8", "7", "5", "9", "8", "5", "4", "3", "6", "7", "7", "4", "Bomb", "7", "6", "5", "Bomb", "6", "4", "Bomb", "Bomb", "9", "2", "Spy", "3", "9", "9", "8", "1", "9", "9"];
    }

    if (color == "blue") {
        premadeButton("switchSetup", "Submit", "redTurn()");
        setupOnClick("blue");
    }
    var range = 0;
    var range2 = 0;
    if (color == "red") {
        range = 60;
        range2 = 40;
        setupList.reverse();
        premadeButton("startGame", "Start Game", "startGame()");
        setupOnClick("red");
    }

    var boardLines = document.getElementById("squareList").getElementsByTagName("li");
    var sideLines = document.getElementById("pieceHolder").getElementsByTagName("li");
    for (var i = 0; i < setupList.length; i++) {
        boardLines[i + range].innerHTML = "<img src=\"../webroot/assets/media/pieces/" + color + setupList[i] + ".png\" id=\"" + color + setupList[i] + "-" + (i + range) + "\">";
        sideLines[i + range2].innerHTML = "<div id=\"blankSquare-" + (i + range2) + "\"></div>";
    }
}
