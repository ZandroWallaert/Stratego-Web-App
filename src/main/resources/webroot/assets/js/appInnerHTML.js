"use strict";

let appHTML =

    `<video autoplay muted loop id="backgroundVideo">
    Your browser does not support HTML5 video.
</video>

<div id="title">
    <div class="flux">Stratego</div>
    <div class="vibe">Online</div>
</div>
<main>
    <div id="mainMenu">
        <h1>Main Menu</h1>
        <a href="#" tabindex="-1" id="play">Play</a>
        <a href="#" tabindex="-1" id="showRules">How to play</a>
        <a href="#" tabindex="-1" id="showSettings">Settings</a>
        <a href="#" tabindex="-1" id="confirmExit">Exit</a>
    </div>
    <div id="infoBox" class="hidden">
    </div>
</main>

<div id="exit" class="hidden">
    <h2>Are you sure you want to exit?</h2>
    <div>
        <a href="../index.html">Yes</a>
        <a href='#' id='hideExit'>No</a>
    </div>
</div>
<div id="rules" class="hidden">
    <div>
        <a href="#" id='hideRules'> Back </a>
    </div>
    <h1>Rules</h1>
    <button class="collapsible">Intro</button>
    <div class="content">
        <div id="introRules">
            <div>
                <p>You are the commander-in-chief of a real army &minus; your army to be precise. You deploy your
                    troops. You alone
                    devise how to wield your strike power, without neglecting your defences. Planning an attack from the
                    right,
                    but is your left flank not vulnerable
                    as a result? Is your flag properly protected? And above all, do you know what your opponent is up
                    to?</p>

                <p>Four different games can be played with this version of Stratego: Stratego Duel, Stratego Original,
                    Stratego
                    Infiltrator and Stratego Airborn .</p>
                <p>If you&apos;ve never played Stratego before, Stratego Duel is the ideal game to start with. Stratego
                    Original,
                    Infiltrator and Airborn are for the real strategists.
                    Both games give you total command over a complete army of 40 pieces.</p>
            </div>
            <div>
                <img id="rank9" src="../assets/media/rank9.png" alt="rank9">
            </div>
        </div>
    </div>
    <button class="collapsible">Stratego Duel</button>
    <div class="content">
        <div id="duelRules">
            <div>
                <p>For Stratego Duel, both players need the following 10 pieces:</p>
                <ul>
                    <li>Flag x1</li>
                    <li>Bomb x2</li>
                    <li>Marshal x1</li>
                    <li>General x1</li>
                    <li>Miner x2</li>
                    <li>Scout x2</li>
                    <li>Spy x1</li>
                </ul>
                <p>The pieces are set up on the bottom four rows of the game board.
                    You can therefore choose from 40 fields for your 10 pieces. You
                    could, for example, position all your pieces at the back in a corner,
                    and then protect your flag with two bombs.</p>
                <p>The
                    advantage here is that only the enemy miners can capture the flag,
                    because they alone can sweep the bombs. The disadvantage is
                    that your opponent will immediately know where to look for the flag
                    once the screen has gone. You can choose the smartest formation
                    for yourself.</p>
                <p>Carefully read the general Stratego rules below. The rules apply to
                    Stratego Duel, Stratego Original and Stratego Infiltrator. You will
                    find it easier to learn to play Stratego Duel because it is played
                    with fewer pieces. </p>
            </div>
            <div>
                <img id="rank10" src="../assets/media/rank10.png" alt="rank10">
            </div>
        </div>
    </div>
    <button class="collapsible">Stratego Original</button>
    <div class="content">
        <p>All the pieces are used when playing Stratego Original. Each player therefore uses 40 playing pieces. This
            means
            that
            when setting up all the fields, the bottom four rows are filled.</p>
        <p>The object of the game Stratego is to
            capture
            your enemy&apos;s
            flag. It would also be wise to position your flag somewhere at the rear, making it more difficult to capture
            instantly. You
            only have six bombs to use as extra protection for your flag.</p>
        <p>You must divide your high and low pieces
            evenly
            across
            the field so that your opponent has a harder time trying to conquer your army. But your formation must also
            offer you
            opportunities to launch an attack of your own &period;&period;&period; </p>
    </div>
    <button class="collapsible">Stratego Infiltrator</button>
    <div class="content">
        <p>Play the game with only 7 Scouts and the Infiltrator (a total of 40 playing pieces).</p>
        <p>Play as you would
            Stratego Original, except for the special rules that apply to the Infiltrator, see below.</p>
    </div>
    <button class="collapsible">Stratego Airborn</button>
    <div class="content">
        <p>In this gamemode, all scouts are replaced with pilots. Pilots have the same rank as a scout but they have an
            extra skill.
            They can fly between airports.</p>
        <p>Airports are special boxes on the map (just as lake boxes are).
            Each side of the map has 3 airports which are randomly generated during the setup phase of the game.</p>
        <p> The pilot has to stand on an airport at the start of the turn and can then, in one move, fly to any other
            free airport.
            As such flying can not be used to attack </p>
    </div>
    <h4>General rules</h4>
    <button class="collapsible">Preparations</button>
    <div class="content">
        <div id="preparationRules">
            <div>
                <h5>Outline of the game:</h5>
                <p>Both players have an army of 10 (Stratego Duel) or 40 (Stratego Original) pieces,
                    including a flag. You must try to capture your opponent&apos;s flag while protecting
                    your own. You first put together a secret formation by placing your playing
                    pieces on your half of the game board in such a way as to conceal their rank from your opponent.</p>
                <p>The pieces have a specific
                    sequence:
                    the higher the number, the higher the rank. If a piece with a higher rank takes a piece with a lower
                    rank,
                    the
                    piece with
                    the higher rank wins and the piece with the lower rank is taken off the board. The flag can be
                    conquered by
                    any
                    of the
                    enemy&apos;s pieces that can be moved.</p>
            </div>
            <div>
                <img id="rank8" src="../assets/media/rank8.png" alt="rank8">
            </div>
        </div>
    </div>
    <button class="collapsible">The playing pieces and formation</button>
    <div class="content">
        <p>Each piece has its own illustration and number indicating its rank. The field Marshal has the highest rank
            and
            has been
            assigned the number 10, the General has a 9, etc., down to the Spy with the number 1. Only the bombs and
            flag do
            not have a number because they have a special role in the game.</p>
        <p>You position your pieces on the bottom four rows of the game board. The two middle rows (with the lakes)
            remain empty. No playing
            pieces may
            be placed here when setting up the game.
            Setting up the board is an important part of the game. It determines whether you win or lose. You will find
            some
            useful
            tips at the end of these instructions.</p>
        <p>Once the players are ready after setting up their playing pieces, the game begins. The graveyard is located
            next to the game board. The pieces that are removed from play during
            the game must be placed here so that your
            opponent
            can also see which pieces you have already taken.</p>
    </div>
    <button class="collapsible">Course of the game</button>
    <div class="content">
        <p>Red starts.</p>
        <p>The players then move their pieces in turns. You move a piece to an empty field or to a field
            occupied by
            one of your opponent&apos;s pieces.</p>
        <p>The latter option is called an attack. Each player may only move a single
            piece
            during
            his or her turn!</p>
    </div>
    <button class="collapsible">Moving</button>
    <div class="content">
        <p>You can move a piece one place to the left or right, or one place forward or backward. The Scout (number 2)
            is an
            exception to this rule; more details below. Each field can accommodate one piece only; the pieces cannot
            jump
            over
            other pieces and they may not be moved diagonally.The playing pieces may not be positioned in or jump over
            the
            two
            lakes in the center of the board.</p>
        <p>You may not continuously move a piece back and forth between the same two fields. The limit here is set at
            three
            moves. It is important then to determine which player began moving to and from. This player has to stop
            first
            too, and this
            could lead to losing an important piece. The rule is known as the &#34;two field&#34; moves rule.
            You may also not continuously pursue one or more of your opponent&apos;s pieces. If this happens (and
            extends
            across
            more
            than two fields) the aggressor must stop this at once.</p>
        <p>The bombs and the flag may never be moved and therefore remain in the same place throughout the
            duration of the game.</p>
        <p>Special rules apply to the Scouts (2). Scouts can jump over an unlimited number of empty fields. Of
            course, they can only do so in a straight line, i.e. to the left, to the right, forward or backward. As far
            as they can as long as the fields are empty, because they cannot jump over their own army&apos;s pieces
            or those of the enemy. Neither can they jump over the lakes. Scouts are the only pieces that can
            launch an attack from a sizeable distance.</p>
    </div>
    <button class="collapsible">Attacking</button>
    <div class="content">
        <div>
            <div id="attackingRules1">
                <p>If one of your pieces is immediately in front of, next to or behind one of your
                    opponent&apos;s pieces, you can attack that piece.
                    Attacks are launched as follows: Click your piece and tap the enemy piece. The rank or number your
                    opponents
                    piece is then revealed.
                    The piece with the lowest rank loses and is removed from the board. If the
                    attacking piece wins, it takes the place of the losing piece. If the defending piece
                    wins it simply remains where it was.
                    If you attack a piece of the same rank, both pieces lose and are removed from the
                    board. You are never obliged to attack.</p>
                <div>
                    <img id="rank7" src="../assets/media/rank7.png" alt="rank7">
                </div>
            </div>
            <p>As mentioned above, Scouts can attack from a considerable distance. The fields
                in between must be empty, though, and the Scout must move in a straight line. A
                Scout (2) can therefore eliminate a Spy (1) from a sizeable distance.</p>
            <p>The ranks:</p>
            <p>The Field Marshal (10) outranks a General (9) and all the pieces of a lower rank. The General (9)
                outranks
                the
                Colonels
                (8) and all the lower ranks. This applies down to the Spy (1), which holds the lowest rank. The
                ranks are
                depicted in the
                correct order on the screen and are listed at the beginning of these instructions where they are
                given by
                name
                and rank
                (and number). It&apos;s a good idea to memorize the ranks. Of course, you can play with just
                the numbers &minus; i.e. my &#34;8&#34; beats your &#34;5&#34; &minus; but it sounds better to say
                my &#34;Colonel&#34; beats
                your &#34;Lieutenant&#34;.</p>
            <p>Bombs and Miners: (3). Any piece that attacks a bomb loses. The bomb stays in the
                same place. The only exception to this rule is the Miner. If a Miner attacks a bomb it
                becomes inactive and must be removed from play. The Miner then takes the place of
                the destroyed bomb.</p>
            <div id="attackingRules2">
                <p>The Spy (1) holds the lowest rank. Any piece that attacks a Spy wins.
                    But, the mysterious and resourceful Spy can also be very powerful. If a Spy attacks a
                    Field Marshal (10), she outsmarts him and wins the battle!
                    This only applies if the Spy launches the attack. If the Field Marshal attacks, it beats
                    a Spy and clears it from the board.</p>
                <div>
                    <img id="rank1" src="../assets/media/rank1.png" alt="rank1">
                </div>
            </div>
            <p>The Flag can be conquered by any piece. This includes a jumping Scout!</p>

        </div>
    </div>
    <button class="collapsible">The Infiltrator</button>
    <div class="content">
        <div>
            <div id="theInfiltratorRules">
                <p>The Infiltrator holds the lowest rank (1). Any piece that attacks
                    it wins. But he does have one special power! The Infiltrator
                    comes into his own when operating on enemy territory where
                    he can use his special power. <br><br> When in enemy territory, he can
                    &#34;infiltrate&#34; which means he can attack an enemy playing piece
                    from one or two spaces away. Tap the enemy piece, tell your
                    opponent you are infiltrating and guess the rank of the piece
                    you are attacking. </p>
                <div>
                    <img id="theInfiltrator" src="../assets/media/infiltratorTransparent.png" alt="theInfiltrator">
                </div>
            </div>
            <p>If you guessed correctly, that piece loses. The Infiltrator does NOT take the place
                of the losing piece but returns to the field where he was.
                If you guessed incorrectly, the defending piece stays where it was and the
                Infiltrator returns to the field where he was. Your opponent now knows the
                position of your Infiltrator!
                Note: An Infiltrator can only infiltrate while on enemy territory.</p>
            <p>The Infiltrator can infiltrate bombs and the flag.
                The Infiltrator can also attack in the conventional way, but remember he has the lowest rank
                (1).</p>
        </div>
    </div>
    <button class="collapsible">The winner</button>
    <div class="content">
        <p>You can win the game by conquering your opponent&apos;s flag. You also win if your opponent cannot move
            anything.</p>
        <p>This
            would be the case if your opponent were left with only bombs and a flag, or if bombs block the path of his
            or
            her last
            moving pieces.</p>
    </div>
    <button class="collapsible">Useful tips</button>
    <div class="content">
        <ul>
            <li><p>Position your flag somewhere in the back row(s). Possibly surround it with bombs so that it can only
                be
                conquered by
                your enemy&apos;s Miners (3).</p>
            </li>
            <li><p>It may also be a good idea to protect the corner field with your bombs, as if your flag were hidden
                there.
                Meanwhile, in
                reality, your flag may be hidden somewhere at the rear in the centre of the playing field!</p>
            </li>
            <li><p>Watch out! Don&apos;t put too many bombs in the front line. This would hinder the movement of your
                own
                playing
                pieces.</p>
            </li>
            <li><p>Position pieces with both high and low ranks in the first two rows. A piece is relatively well
                protected
                if
                there is another
                piece (of at least two ranks higher) behind or next to it. After all, if an enemy Captain (6) beats your
                Lieutenant (5), you&apos;ll
                need at least a Major (7) to retaliate and win.</p>
            </li>
            <li><p>Also position a number of Scouts (2) in the first rows. This will enable you to Scout out advancing
                troops.
                But position
                some of them at the rear as well, to save them for the final showdown. If you are forced to play without
                any
                Scouts you
                may as well be fighting in the dark.</p>
            </li>
            <li><p>Position your Spy (1) close to your General (9). If an enemy Field Marshal (10) threatens your
                General,
                your
                Spy can
                offer it some cover.</p>
            </li>
            <li><p>It may be tempting to penetrate uncharted enemy territory with your high-ranking pieces. But the risk
                is
                great: If you lose
                a Colonel or higher ranking piece, this usually leads to defeat.</p>
            </li>
            <li><p>Once you identify the enemy Field Marshal, your General can take any of the pieces that move beyond
                the
                cover of the
                Field Marshal.</p>
            </li>
        </ul>
    </div>
</div>
<div id="settings" class="hidden">
    <h1>Settings</h1>
    <form id="settingsForm">
        <div>
            <p>Theme</p>
            <input id="theme" type="button" value="Rain">
        </div>
        <div>
            <p>Sound effects</p>
            <input id='sound' type="button" value="Enabled">
        </div>
        <div>
            <p>Music</p>
            <input id='music' type="button" value="Enabled">
        </div>
        <div>
            <input id="reset" type="button" value="Set Defaults">
        </div>
    </form>
    <div id="settingButtons">
        <a href="#" id="hideSettings">Back</a>
        <p></p>
        <a href="#" id="saveChanges">Apply</a>
    </div>
</div>
<div id="gameMode" class="hidden">
    <h2>Game mode</h2>
    <a href="#" id="classic" tabindex="-1">
        <img src="../assets/media/classic.jpg" alt="classic"></a>
    <h4>Classic</h4>
    <a href="#" id="duel" tabindex="-1">
        <img src="../assets/media/duel.jpg" id="duelImg" alt="duel"></a>
    <h4>Duel</h4>
    <span class="noPointerEvents">Locked</span>
    <a href="#" id="infiltrator" tabindex="-1">
        <img src="../assets/media/infiltrator.jpg" alt="infiltrator"></a>
    <h4>Infiltrator</h4>
    <span class="noPointerEvents">Locked</span>
    <a href="#" id="airborne" tabindex="-1">
        <img src="../assets/media/airborne.jpg" alt="airborne"></a>
    <h4>Airborne</h4>
    <span class="noPointerEvents">Locked</span>
    <a href="#" class='back' id='hideGameModes' tabindex="-1">Close</a>

</div>
<div>
    <form id="createPersonForm" class="hidden" autocomplete="off">
        <label for="name">Nickname</label>
        <input id="name" type="text" name="name" required>

        <label for="age">Age</label>
        <input id="age" type="number" name="age" min="1" max="99" required>

        <label for="token">Token</label>
        <input id="token" type="text" name="token" required>
        <div id="buttons">
            <a href="#" class='back' id='hideForm'>Back</a>
            <span></span>
            <input type="submit" value="Play">
        </div>
        <p id="mode">Game mode</p>

    </form>
</div>
<div id="wait" class="hidden">
    <p id="loadingMsg"></p>
    <p id="response" class="hidden"></p>
    <div id="loader" class="hidden">
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <p id="details" class="hidden"></p>
    <a id='cancel' href="#">Cancel</a>
</div>
<script src="../assets/js/app.js"></script>
<script src="../assets/js/appInnerHTML"></script>`;
