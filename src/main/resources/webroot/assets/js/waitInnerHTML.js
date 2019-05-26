"use strict";

let otherPlayer;

if (document.body.title === 'wait1') {
    otherPlayer = '2';
} else {
    otherPlayer = '1'
}

let waitHTML =

    `<div id="bg-image"></div>
<div id="loadingBox">
    <h1>Waiting For Player ${otherPlayer}</h1>
    <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
<script src="../assets/js/wait.js"></script>
<script src="../assets/js/waitInnerHTML.js"></script>`;
