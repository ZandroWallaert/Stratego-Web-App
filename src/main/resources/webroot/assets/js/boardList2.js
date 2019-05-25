"use strict";
document.addEventListener("DOMContentLoaded", init);
let squareList;
let color;
let lItems;
let currentSquare;
let lines;
let pieceHolder;
let turn;
let turnOk;

function init() {
    setupPage();
    lItems = document.getElementById("squareList").getElementsByTagName("li");
    lines = document.getElementById("squareList").getElementsByTagName("li");
    let squareList = document.getElementById('squareList');
    pieceHolder = document.getElementById('pieceHolder');
    localStorage.setItem("turn", "blue");
    document.querySelector("body h1").innerHTML = ("Blue goes first, don't look red!");
    getConfirm();
}

function setupPage() {
    for (let i = 0; i < 40; i++) {
        document.getElementById("bluePieceHolder").innerHTML += `<li>
            <div id="blankSquare-${i}"></div>
        </li>`
    }
    for (let i = 0; i < 40; i++) {
        document.getElementById("redPieceHolder").innerHTML += `<li>
            <div id="blankSquare-${i}"></div>
        </li>`
    }
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
    let boardLines = document.getElementById("squareList").getElementsByTagName("li");
    let setupList = [];
    let range = 0;
    let range2 = 0;
    fetch('/api/blueSetup').then(res => res.json()).then(function (response) {
        let edited = response.substring(1, response.length - 1);
        let secondEdit = edited.split(", ");
        for (let i = 0; i < 40; i++) {
            let code = secondEdit[i];
            switch (code) {
                case '3':
                    code = '8';
                    break;
                case '2':
                    code = '9';
                    break;
                case '6':
                    code = '5';
                    break;
                case '5':
                    code = '6';
                    break;
                case '7':
                    code = '4';
                    break;
                case '10':
                    code = '1';
                    break;
                case '4':
                    code = '7';
                    break;
                case '8':
                    code = '3';
                    break;
                case '9':
                    code = '2';
                    break;
                default:
                    break;
            }
            setupList.push(code);
        }
        for (let i = 0; i < setupList.length; i++) {
            boardLines[i + range].innerHTML = "<img src=\"../assets/media/pieces/blue" + "Back" + ".png\" id=\"" +
                "blue" + setupList[i] + "-" + (i + range) + "\">";
        }
        setupList = [];
    });
    fetch('/api/redSetup').then(res => res.json()).then(function (response) {
        let edited = response.substring(1, response.length - 1);
        let secondEdit = edited.split(", ");
        for (let i = 0; i < 40; i++) {
            let code = secondEdit[i];
            switch (code) {
                case '3':
                    code = '8';
                    break;
                case '2':
                    code = '9';
                    break;
                case '6':
                    code = '5';
                    break;
                case '5':
                    code = '6';
                    break;
                case '7':
                    code = '4';
                    break;
                case '10':
                    code = '1';
                    break;
                case '4':
                    code = '7';
                    break;
                case '8':
                    code = '3';
                    break;
                case '9':
                    code = '2';
                    break;
                default:
                    break;
            }
            setupList.push(code);
        }
        range = 60;
        range2 = 40;
        for (let i = 0; i < setupList.length; i++) {
            boardLines[i + range].innerHTML = "<img src=\"../assets/media/pieces/red" + setupList[i] + ".png\" id=\"" +
                "red" + setupList[i] + "-" + (i + range) + "\">";
        }
    });
}

function setupClick() {
    if (turn === "red") {
        let squareList = document.getElementById('squareList');
        squareList.onclick = function (e) {
            deleteAllDots();
            if (turnOk) {
                if (colorOfClick(e.target.id) === "red") {
                    posmoves(e.target.id);
                } else {
                    setupClick();
                }
            }
        }
    }
}

function posmoves(pieceName) {

    let name = pieceName.split("-")[0].replace("blue", "")
        .replace("red", ""); // the name of the piece (Spy, Bomb, 9 etc..)
    let square = pieceName.split("-")[1]; // the position on the board
    square = parseInt(square, 10);
    color = colorOfClick(pieceName);


    if (name === "Bomb" || name === "Flag" || name === "lakeSquare" || name === "blankSquare")
        return; // if it's a piece that can't move

    if (name !== "9") // movement for everything except 9
    {
        if (square % 10 !== 9) // Move to the right
            checkstatus(square + 1, color, square);
        if (square % 10 !== 0) // Move to the left
            checkstatus(square - 1, color, square);
        if (square - 10 >= 0) // Move up
            checkstatus(square - 10, color, square);
        if (square + 10 < 100) // Move down
            checkstatus(square + 10, color, square);
    }

    if (name === "9") // movement for 9
    {

        if (square % 10 !== 9) // check to the right
            if (checkstatus(square + 1, color, square) === 1 && (square + 1) % 10 !== 9)
                recursive(square + 2, "r", square);

        if (square % 10 !== 0) // check to the left
            if (checkstatus(square - 1, color, square) === 1 && (square - 1) % 10 !== 0)
                recursive(square - 2, "l", square);

        if (square - 10 > 0) // check up
            if (square - 20 > 0 && checkstatus(square - 10, color, square) === 1)
                recursive(square - 20, "u", square);

        if (square + 10 < 100) // check down
            if (square + 20 < 100 && checkstatus(square + 10, color, square) === 1)
                recursive(square + 20, "d", square);
    }
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

function checkstatus(squareNumber, color, movedFromSquare) {

    currentSquare = (lItems[squareNumber].innerHTML).split("\"").reverse()[1];

    let squareColor = colorOfClick(currentSquare); // Finds the color of the piece on this square

    if (currentSquare.split("-")[0] === "blankSquare") {
        activateDot(movedFromSquare, squareNumber, "blank");
        return 1;
    } else if (currentSquare.split("-")[0] === "lakeSquare") {
        return 10
    } else if (color !== squareColor) {
        activateDot(movedFromSquare, squareNumber, "combat");
    } // If the color of the piece being moved is different from the color of the piece on the square

    return 11
}

function checkSideboard(color) {
    let redLItems = document.getElementById("redPieceHolder").getElementsByTagName("li");
    let blueLItems = document.getElementById("bluePieceHolder").getElementsByTagName("li");

    if (color === "blue") {

        for (let i = 0; i < 40; i++) {
            currentSquare = (blueLItems[i].innerHTML).split("\"").reverse()[1];
            if (currentSquare.split("-")[0] === "blankSquare") {
                return i;
            }
        }
    }

    if (color === "red") {
        for (let j = 0; j < 40; j++) {
            currentSquare = (redLItems[j].innerHTML).split("\"").reverse()[1];
            if (currentSquare.split("-")[0] === "blankSquare") {
                return j;
            }
        }
    }

    return 11
}

function activateDot(movedFromSquare, movedToSquare, type) {

    let currentHTML = lItems[movedToSquare].innerHTML;
    let newHTML = "";
    if (type === "combat")
        newHTML = currentHTML + "<div class=\"moveCircleCombat\" id=\"listenForClick" + movedToSquare + "\"></div>";
    else if (type === "blank")
        newHTML = currentHTML + "<div class=\"moveCircle\" id=\"listenForClick" + movedToSquare + "\"></div>";
    lItems[movedToSquare].innerHTML = newHTML;
    lItems = document.getElementById("squareList").getElementsByTagName("li");

    document.getElementById("listenForClick" + movedToSquare).onclick = function () {
        dotClicked(movedFromSquare, movedToSquare);
        let beginX = movedFromSquare % 10;
        let beginY = (movedFromSquare - (movedFromSquare % 10)) / 10;
        let beginCoordinates = [beginX, beginY];
        console.log(beginCoordinates);
        let endX = movedToSquare % 10;
        let endY = (movedToSquare - (movedToSquare % 10)) / 10;
        let endCoordinates = [endX, endY];
        beginCoordinates.push(endCoordinates);
        let data = {data: beginCoordinates.toString()};
        fetch("/api/movePawn", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(JSON.stringify(json)));
        console.log(JSON.stringify(data));
        console.log(endCoordinates);
        getBoard();
        sendTurn();
        getConfirm();
    };
}

function dotClicked(movedFromSquare, movedToSquare) {
    deleteAllDots();
    let redSideLItems = document.getElementById("redPieceHolder").getElementsByTagName("li");
    let blueSideLItems = document.getElementById("bluePieceHolder").getElementsByTagName("li");
    let movedFromHTML = lItems[movedFromSquare].innerHTML;
    let squareID1 = (lItems[movedFromSquare].innerHTML).split(">")[0].split("\"").reverse()[1]; // gets the id
    let pieceA = squareID1.split("-")[0].replace("blue", "")
        .replace("red", ""); // gets the name from the id
    let pieceAColor = colorOfClick(squareID1);
    let squareID2 = (lItems[movedToSquare].innerHTML).split(">")[0].split("\"").reverse()[1]; // gets the id
    let pieceB = squareID2.split("-")[0].replace("blue", "")
        .replace("red", ""); // gets the name from the id
    let pieceBColor = colorOfClick(squareID2);
    let result = combat(pieceA, pieceB);
    let changedMovedToHTML;
    // -1 do nothing
    if (result !== 3) {
        flipSinglePiece(squareID2);
        changedMovedToHTML = lItems[movedToSquare].innerHTML;
        document.querySelector("body h1").innerHTML = ("KILL");
    }
    let openSideSquareA;
    let openSideSquareB;
    // 3 is for when you attack a blank square
    let newSquareID1;
    if (result === 1) {
        // The squareID2 needs to be moved to the sideboard
        openSideSquareB = checkSideboard(pieceBColor); //The first spot on the side where the captured piece can be put
        if (pieceBColor === "red") {
            flipSinglePiece(squareID2);
            redSideLItems[openSideSquareB].innerHTML = changedMovedToHTML;
        } else if (pieceBColor === "blue") {
            flipSinglePiece(squareID2);
            blueSideLItems[openSideSquareB].innerHTML = changedMovedToHTML;
        }


        let colorAndStuff = movedFromHTML.split("=")[2].replace("\"", "")
            .split("-")[0] + "-";
        let innerHTMLList = movedFromHTML.split("\"");
        let newHTMLInner = (innerHTMLList[0] + "\"" + innerHTMLList[1] + "\"" + innerHTMLList[2] + "\"" +
            colorAndStuff + movedToSquare + "\">");
        newSquareID1 = newHTMLInner.split(">")[0].split("\"").reverse()[1];
        lItems[movedToSquare].innerHTML = newHTMLInner;
    } else if (result === 3) { // for when you attack a blank square
        let colorAndStuff = movedFromHTML.split("=")[2].replace("\"", "")
            .split("-")[0] + "-";
        let innerHTMLList = movedFromHTML.split("\"");
        lItems[movedToSquare].innerHTML = (innerHTMLList[0] + "\"" + innerHTMLList[1] + "\"" + innerHTMLList[2] +
            "\"" + colorAndStuff + movedToSquare + "\">");
    } else if (result === -1) {
        // squareID1 needs to be moved to the sideboard
        openSideSquareA = checkSideboard(pieceAColor);
        if (pieceAColor === "red") {
            redSideLItems[openSideSquareA].innerHTML = movedFromHTML;
        } else if (pieceAColor === "blue") {
            blueSideLItems[openSideSquareA].innerHTML = movedFromHTML;
        }

    } else if (result === 0) {// If they tie
        // Both squareIds need to be moved to the sideboard
        openSideSquareA = checkSideboard(pieceAColor);
        openSideSquareB = checkSideboard(pieceBColor);
        if (pieceAColor === "red") {
            redSideLItems[openSideSquareA].innerHTML = movedFromHTML;
            blueSideLItems[openSideSquareB].innerHTML = changedMovedToHTML;
        } else if (pieceAColor === "blue") {
            blueSideLItems[openSideSquareA].innerHTML = movedFromHTML;
            redSideLItems[openSideSquareB].innerHTML = changedMovedToHTML;
        }

        lItems[movedToSquare].innerHTML = "<div id=\"blankSquare-" + movedToSquare + "\">";

    } else if (result === 2) {
        document.getElementById("squareList").innerHTML = "";
        document.querySelector("body h1").innerHTML = ("Game Ended!");
        setTimeout(() => {
            window.location.href = "app.html";
        }, 2000);
    }

    lItems[movedFromSquare].innerHTML = "<div id=\"blankSquare-" + movedFromSquare + "\">"; // blank square leaving piece
    deleteAllDots();
    let currentTurn = localStorage.getItem("turn");
    if (currentTurn === "blue") {
        localStorage.setItem("turn", "red");
    } else {
        localStorage.setItem("turn", "blue");
    }

    let Switch = "Switch Player!";
    if (pieceAColor === "blue") {
        if (result === 1) {
            flipSinglePiece(newSquareID1);
        }
        flipPieces("blue");
        console.log(Switch);
        if (result === 1) {
            flipSinglePiece(newSquareID1);
        }
        flipPieces("red");
        if (result === -1) {
            flipSinglePiece(squareID2);
        }
    } else if (pieceAColor === "red") {
        if (result === 1) {
            flipSinglePiece(newSquareID1);
        }
        flipPieces("red");
        console.log(Switch);

        let data = {data: "Turn"};
        fetch("/api/nextTurn1", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => console.log(JSON.stringify(json)));
        console.log(JSON.stringify(data));
        fetch('/api/board').then(res => res.json()).then(function (response) {
            console.log(response);
        });
        if (result === 1) {
            flipSinglePiece(newSquareID1);
        }
        if (result === -1) {
            flipSinglePiece(squareID2);
        }
    }
}

function recursive(movedToSquare, direction, movedFromSquare) {

    currentSquare = (lItems[movedToSquare].innerHTML).split("\"").reverse()[1];

    if (currentSquare.split("-")[0] === "blankSquare") {
        activateDot(movedFromSquare, movedToSquare, "blank");
        switch (direction) {
            case "l":
                if (movedToSquare % 10 !== 0)
                    recursive(movedToSquare - 1, "l", movedFromSquare);
                break;

            case "r":
                if (movedToSquare % 10 !== 9)
                    recursive(movedToSquare + 1, "r", movedFromSquare);
                break;

            case "d":
                if (movedToSquare + 10 < 100)
                    recursive(movedToSquare + 10, "d", movedFromSquare);
                break;

            case "u":
                if (movedToSquare - 10 > 0)
                    recursive(movedToSquare - 10, "u", movedFromSquare);
                break;
        }
    }
}


function combat(a, b) {
// a is the attacking piece, if a wins the function returns 1, if b wins it returns -1, otherwise returns 0 if they tie both die, or 2 if its a flag
    if (a === b) // If they tie
        return 0;

    if (b === "blankSquare")
        return 3;

    if (a === "Spy") // If the spy attacks
        if (b === "1") // and it hits the 1
            return 1; // the spy wins
        else
            return -1;

    if (b === "Spy")
        return 1;

    if (b === "Bomb")
        if (a === "8")
            return 1;
        else
            return -1;

    if (b === "Flag")
        return 2;

    if (parseInt(a, 10) < parseInt(b, 10)) // checks to see if both strings are ints
        return 1; // if a's number is less than b's
    else
        return -1;
}

let pieces = "/assets/media/pieces/";

// a function to switch the backs of the pieces
function flipPieces(color) {

    for (let i = 0; i < 100; i++) {
        let line = lines[i].innerHTML;
        if (line.indexOf(color) !== -1) {
            if (line.indexOf(color + "Back") !== -1) {
                let lineID = line.split("-")[0].split("id=\"")[1];
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"), pieces + lineID + ".png");
            } else {
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"), pieces + color + "Back.png");
            }
        }
    }
}

// a function to switch the backs of the pieces
function flipSinglePiece(pieceName) {

    for (let i = 0; i < 100; i++) {
        let line = lines[i].innerHTML;
        if (line.indexOf(pieceName) !== -1) {
            // get the color of the piece
            color = "";
            if (pieceName.indexOf("red") !== -1) {
                color = "red";
            } else {
                color = "blue";
            }

            if (line.indexOf(color + "Back") !== -1) {
                // change to pieceIMG
                let lineID = line.split("-")[0].split("id=\"")[1];
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"), pieces + lineID + ".png");
            } else {
                // change to backIMG
                lines[i].innerHTML = line.replace(new RegExp("/(.*)png", "g"), pieces + color + "Back.png");
            }
        }
    }
}

function deleteAllDots() {
    for (let i = 0; i < 100; i++) {
        let line = lines[i].innerHTML;
        if (line.indexOf("moveCircle") !== -1) {
            lines[i].innerHTML = line.replace(new RegExp("(<div class=\"moveCircle\" id=\"listenForClick..\"></div>)|" +
                "(<div class=\"moveCircle\" id=\"listenForClick.\"></div>)|" +
                "(<div class=\"moveCircleCombat\" id=\"listenForClick..\"></div>)|" +
                "(<div class=\"moveCircleCombat\" id=\"listenForClick.\"></div>)", "g"), "");
        }
    }
}

function getBoard() {
    fetch('/api/board').then(res => res.json()).then(function (response) {
        let gameboard = Object.values(response);
        let boardArray = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (gameboard[0][i][j] === null) {
                    boardArray.push(null);
                } else {
                    let code = gameboard[0][i][j].rank + "-" + gameboard[0][i][j].player;
                    boardArray.push(code);
                }
            }
        }
        console.log(boardArray);
        let setupList = [];
        let color = "";
        let boardLines = document.getElementById("squareList").getElementsByTagName("li");
        for (let i = 0; i < 100; i++) {
            let code = boardArray[i];
            switch (code) {
                case '3-1':
                    code = '8';
                    color = "red";
                    break;
                case '1-1':
                    code = 'Spy';
                    color = "red";
                    break;
                case '2-1':
                    code = '9';
                    color = "red";
                    break;
                case '6-1':
                    code = '5';
                    color = "red";
                    break;
                case '5-1':
                    code = '6';
                    color = "red";
                    break;
                case '7-1':
                    code = '4';
                    color = "red";
                    break;
                case '10-1':
                    code = '1';
                    color = "red";
                    break;
                case '4-1':
                    code = '7';
                    color = "red";
                    break;
                case '8-1':
                    code = '3';
                    color = "red";
                    break;
                case '9-1':
                    code = '2';
                    color = "red";
                    break;
                case '11-1':
                    code = 'Bomb';
                    color = "red";
                    break;
                case '0-1':
                    code = 'Flag';
                    color = "red";
                    break;
                case '3-2':
                    code = '8';
                    color = "blue";
                    break;
                case '1-2':
                    code = 'Spy';
                    color = "blue";
                    break;
                case '2-2':
                    code = '9';
                    color = "blue";
                    break;
                case '6-2':
                    code = '5';
                    color = "blue";
                    break;
                case '5-2':
                    code = '6';
                    color = "blue";
                    break;
                case '7-2':
                    code = '4';
                    color = "blue";
                    break;
                case '10-2':
                    code = '1';
                    color = "blue";
                    break;
                case '4-2':
                    code = '7';
                    color = "blue";
                    break;
                case '8-2':
                    code = '3';
                    color = "blue";
                    break;
                case '9-2':
                    code = '2';
                    color = "blue";
                    break;
                case '11-2':
                    code = 'Bomb';
                    color = "blue";
                    break;
                case '0-2':
                    code = 'Flag';
                    color = "blue";
                    break;
            }
            console.log(setupList);
            if (boardArray[i] === null && i === 42 || 43 || 46 || 47 || 52 || 53 || 56 || 57) {
                boardLines[i].innerHTML = "<div id=\"lakeSquare-" + i + "\"></div>";
            }
            if (boardArray[i] === null) {
                boardLines[i].innerHTML = "<div id=\"blankSquare-" + i + "\"></div>";
            } else {
                boardLines[i].innerHTML = "<img src=\"../assets/media/pieces/" + color + code + ".png\" id=\"" +
                    color + code + "-" + (i) + "\">";
            }
        }
    })
}

function getConfirm() {
    console.log('Retrieving messages...');
    fetch('/api/nextTurn2').then(res => res.json()).then(function (response) {
        console.log(response);
        if (response === "Turn") {
            console.log("Retrieving board.....");
            getBoard();
            turn = "red";
            turnOk = true;
            setupClick();
            fetch("/api/set1ToNull", {
                method: "POST",
                body: JSON.stringify({data: "null"}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        setTimeout(getConfirm, 2000);
    })
}

function sendTurn() {
    let data = {data: "Turn"};
    fetch("/api/nextTurn1", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => console.log(JSON.stringify(json)));
    turn = "blue";
    turnOk = false;
}

