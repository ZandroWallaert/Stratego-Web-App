"use strict";

let page;

if (document.body.title === 'blue') {
    page = 'setup'
} else {
    page = 'setup2'
}

let setupHTML =
    `<div id="bg-image"></div>
<h1>Setup turn</h1>
<div id="bg-gameImage"></div>
<div id="content">
    <div id="playingField">
        <img alt="board" id="board" src="../assets/media/board.jpg">
        <ul id="squareList">
            <li id="lake1">
                <div id="lakeSquare-42"></div>
            </li>
            <li>
                <div id="lakeSquare-43"></div>
            </li>
            <li>
                <div id="blankSquare-44"></div>
            </li>
            <li>
                <div id="blankSquare-45"></div>
            </li>
            <li>
                <div id="lakeSquare-46"></div>
            </li>
            <li>
                <div id="lakeSquare-47"></div>
            </li>
            <li>
                <div id="blankSquare-48"></div>
            </li>
            <li>
                <div id="blankSquare-49"></div>
            </li>
            <li>
                <div id="blankSquare-50"></div>
            </li>
            <li>
                <div id="blankSquare-51"></div>
            </li>
            <li>
                <div id="lakeSquare-52"></div>
            </li>
            <li>
                <div id="lakeSquare-53"></div>
            </li>
            <li>
                <div id="blankSquare-54"></div>
            </li>
            <li>
                <div id="blankSquare-55"></div>
            </li>
            <li>
                <div id="lakeSquare-56"></div>
            </li>
            <li id="lake2">
                <div id="lakeSquare-57"></div>
            </li>
        </ul>
    </div>

    <ul id="pieceHolder">
    </ul>
    <div id="preMade">
        <ul>
            <li><input class="button-3d" id="defensive" type="button" value="Defensive"/>
            </li>
            <li><input class="button-3d" id="offensive" type="button" value="Offensive"/>
            </li>
            <li><input class="button-3d" id="mixed" type="button" value="Mixed"/></li>
        </ul>
    </div>
</div>
<div class="hidden" id="victory">
    <h1>You won!</h1>
    <p>You have defeated your opponent.</p>
    <div class="endGameBtn">
        <a href="${page}.html">Play again</a>
        <a href="app.html">Exit</a>
    </div>
</div>

<div class="hidden" id="defeat">
    <h1>You lost!</h1>
    <p>Better luck next time.</p>
    <div class="endGameBtn">
        <a href="${page}.html">Play again</a>
        <a href="app.html">Exit</a>
    </div>
</div>

<!-- Temporary test button!!!-->
<a href='#' id="showEndGame">Click me</a>

<script src="../assets/js/setup.js"></script>
<script src="../assets/js/setupInnerHTML.js"></script>`;

let pieceHolderBlue =

    ` <li><img id="blue1-0" src="../assets/media/pieces/blue1.png" alt=""></li>
        <li><img id="blue2-1" src="../assets/media/pieces/blue2.png" alt=""></li>
        <li><img id="blue3-2" src="../assets/media/pieces/blue3.png" alt=""></li>
        <li><img id="blue3-3" src="../assets/media/pieces/blue3.png" alt=""></li>
        <li><img id="blue4-4" src="../assets/media/pieces/blue4.png" alt=""></li>
        <li><img id="blue4-5" src="../assets/media/pieces/blue4.png" alt=""></li>
        <li><img id="blue4-6" src="../assets/media/pieces/blue4.png" alt=""></li>
        <li><img id="blue5-7" src="../assets/media/pieces/blue5.png" alt=""></li>
        <li><img id="blue5-8" src="../assets/media/pieces/blue5.png" alt=""></li>
        <li><img id="blue5-9" src="../assets/media/pieces/blue5.png" alt=""></li>
        <li><img id="blue5-10" src="../assets/media/pieces/blue5.png" alt=""></li>
        <li><img id="blue6-11" src="../assets/media/pieces/blue6.png" alt=""></li>
        <li><img id="blue6-12" src="../assets/media/pieces/blue6.png" alt=""></li>
        <li><img id="blue6-13" src="../assets/media/pieces/blue6.png" alt=""></li>
        <li><img id="blue6-14" src="../assets/media/pieces/blue6.png" alt=""></li>
        <li><img id="blue7-15" src="../assets/media/pieces/blue7.png" alt=""></li>
        <li><img id="blue7-16" src="../assets/media/pieces/blue7.png" alt=""></li>
        <li><img id="blue7-17" src="../assets/media/pieces/blue7.png" alt=""></li>
        <li><img id="blue7-18" src="../assets/media/pieces/blue7.png" alt=""></li>
        <li><img id="blue8-19" src="../assets/media/pieces/blue8.png" alt=""></li>
        <li><img id="blue8-20" src="../assets/media/pieces/blue8.png" alt=""></li>
        <li><img id="blue8-21" src="../assets/media/pieces/blue8.png" alt=""></li>
        <li><img id="blue8-22" src="../assets/media/pieces/blue8.png" alt=""></li>
        <li><img id="blue8-23" src="../assets/media/pieces/blue8.png" alt=""></li>
        <li><img id="blue9-24" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blue9-25" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blue9-26" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blue9-27" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blue9-28" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blue9-29" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blue9-30" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blue9-31" src="../assets/media/pieces/blue9.png" alt=""></li>
        <li><img id="blueBomb-32" src="../assets/media/pieces/bluebomb.png" alt=""></li>
        <li><img id="blueBomb-33" src="../assets/media/pieces/bluebomb.png" alt=""></li>
        <li><img id="blueBomb-34" src="../assets/media/pieces/bluebomb.png" alt=""></li>
        <li><img id="blueBomb-35" src="../assets/media/pieces/bluebomb.png" alt=""></li>
        <li><img id="blueBomb-36" src="../assets/media/pieces/bluebomb.png" alt=""></li>
        <li><img id="blueBomb-37" src="../assets/media/pieces/bluebomb.png" alt=""></li>
        <li><img id="blueFlag-38" src="../assets/media/pieces/blueflag.png" alt=""></li>
        <li><img id="blueSpy-39" src="../assets/media/pieces/bluespy.png" alt=""></li>`;

let pieceHolderRed =

    `      <li><img alt="" id="blue1-0" src="../assets/media/pieces/blue1.png"></li>
        <li><img alt="" id="blue2-1" src="../assets/media/pieces/blue2.png"></li>
        <li><img alt="" id="blue3-2" src="../assets/media/pieces/blue3.png"></li>
        <li><img alt="" id="blue3-3" src="../assets/media/pieces/blue3.png"></li>
        <li><img alt="" id="blue4-4" src="../assets/media/pieces/blue4.png"></li>
        <li><img alt="" id="blue4-5" src="../assets/media/pieces/blue4.png"></li>
        <li><img alt="" id="blue4-6" src="../assets/media/pieces/blue4.png"></li>
        <li><img alt="" id="blue5-7" src="../assets/media/pieces/blue5.png"></li>
        <li><img alt="" id="blue5-8" src="../assets/media/pieces/blue5.png"></li>
        <li><img alt="" id="blue5-9" src="../assets/media/pieces/blue5.png"></li>
        <li><img alt="" id="blue5-10" src="../assets/media/pieces/blue5.png"></li>
        <li><img alt="" id="blue6-11" src="../assets/media/pieces/blue6.png"></li>
        <li><img alt="" id="blue6-12" src="../assets/media/pieces/blue6.png"></li>
        <li><img alt="" id="blue6-13" src="../assets/media/pieces/blue6.png"></li>
        <li><img alt="" id="blue6-14" src="../assets/media/pieces/blue6.png"></li>
        <li><img alt="" id="blue7-15" src="../assets/media/pieces/blue7.png"></li>
        <li><img alt="" id="blue7-16" src="../assets/media/pieces/blue7.png"></li>
        <li><img alt="" id="blue7-17" src="../assets/media/pieces/blue7.png"></li>
        <li><img alt="" id="blue7-18" src="../assets/media/pieces/blue7.png"></li>
        <li><img alt="" id="blue8-19" src="../assets/media/pieces/blue8.png"></li>
        <li><img alt="" id="blue8-20" src="../assets/media/pieces/blue8.png"></li>
        <li><img alt="" id="blue8-21" src="../assets/media/pieces/blue8.png"></li>
        <li><img alt="" id="blue8-22" src="../assets/media/pieces/blue8.png"></li>
        <li><img alt="" id="blue8-23" src="../assets/media/pieces/blue8.png"></li>
        <li><img alt="" id="blue9-24" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blue9-25" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blue9-26" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blue9-27" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blue9-28" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blue9-29" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blue9-30" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blue9-31" src="../assets/media/pieces/blue9.png"></li>
        <li><img alt="" id="blueBomb-32" src="../assets/media/pieces/bluebomb.png"></li>
        <li><img alt="" id="blueBomb-33" src="../assets/media/pieces/bluebomb.png"></li>
        <li><img alt="" id="blueBomb-34" src="../assets/media/pieces/bluebomb.png"></li>
        <li><img alt="" id="blueBomb-35" src="../assets/media/pieces/bluebomb.png"></li>
        <li><img alt="" id="blueBomb-36" src="../assets/media/pieces/bluebomb.png"></li>
        <li><img alt="" id="blueBomb-37" src="../assets/media/pieces/bluebomb.png"></li>
        <li><img alt="" id="blueFlag-38" src="../assets/media/pieces/blueflag.png"></li>
        <li><img alt="" id="blueSpy-39" src="../assets/media/pieces/bluespy.png"></li>
        <li><img alt="" id="red1-40" src="../assets/media/pieces/red1.png"></li>
        <li><img alt="" id="red2-41" src="../assets/media/pieces/red2.png"></li>
        <li><img alt="" id="red3-42" src="../assets/media/pieces/red3.png"></li>
        <li><img alt="" id="red3-43" src="../assets/media/pieces/red3.png"></li>
        <li><img alt="" id="red4-44" src="../assets/media/pieces/red4.png"></li>
        <li><img alt="" id="red4-45" src="../assets/media/pieces/red4.png"></li>
        <li><img alt="" id="red4-46" src="../assets/media/pieces/red4.png"></li>
        <li><img alt="" id="red5-47" src="../assets/media/pieces/red5.png"></li>
        <li><img alt="" id="red5-48" src="../assets/media/pieces/red5.png"></li>
        <li><img alt="" id="red5-49" src="../assets/media/pieces/red5.png"></li>
        <li><img alt="" id="red5-50" src="../assets/media/pieces/red5.png"></li>
        <li><img alt="" id="red6-51" src="../assets/media/pieces/red6.png"></li>
        <li><img alt="" id="red6-52" src="../assets/media/pieces/red6.png"></li>
        <li><img alt="" id="red6-53" src="../assets/media/pieces/red6.png"></li>
        <li><img alt="" id="red6-54" src="../assets/media/pieces/red6.png"></li>
        <li><img alt="" id="red7-55" src="../assets/media/pieces/red7.png"></li>
        <li><img alt="" id="red7-56" src="../assets/media/pieces/red7.png"></li>
        <li><img alt="" id="red7-57" src="../assets/media/pieces/red7.png"></li>
        <li><img alt="" id="red7-58" src="../assets/media/pieces/red7.png"></li>
        <li><img alt="" id="red8-59" src="../assets/media/pieces/red8.png"></li>
        <li><img alt="" id="red8-60" src="../assets/media/pieces/red8.png"></li>
        <li><img alt="" id="red8-61" src="../assets/media/pieces/red8.png"></li>
        <li><img alt="" id="red8-62" src="../assets/media/pieces/red8.png"></li>
        <li><img alt="" id="red8-63" src="../assets/media/pieces/red8.png"></li>
        <li><img alt="" id="red9-64" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="red9-65" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="red9-66" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="red9-67" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="red9-68" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="red9-69" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="red9-70" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="red9-71" src="../assets/media/pieces/red9.png"></li>
        <li><img alt="" id="redBomb-72" src="../assets/media/pieces/redbomb.png"></li>
        <li><img alt="" id="redBomb-73" src="../assets/media/pieces/redbomb.png"></li>
        <li><img alt="" id="redBomb-74" src="../assets/media/pieces/redbomb.png"></li>
        <li><img alt="" id="redBomb-75" src="../assets/media/pieces/redbomb.png"></li>
        <li><img alt="" id="redBomb-76" src="../assets/media/pieces/redbomb.png"></li>
        <li><img alt="" id="redBomb-77" src="../assets/media/pieces/redbomb.png"></li>
        <li><img alt="" id="redFlag-78" src="../assets/media/pieces/redflag.png"></li>
        <li><img alt="" id="redSpy-79" src="../assets/media/pieces/redspy.png"></li>`;

