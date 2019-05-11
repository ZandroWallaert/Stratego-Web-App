package be.howest.ti.project1.stratego.stratego;


import be.howest.ti.project1.stratego.stratego.pawns.Pawn;
import be.howest.ti.project1.stratego.stratego.pawns.Spy;
import org.junit.Test;

import static junit.framework.TestCase.*;

public class StrategoTest {
    @Test
    public void testPlacePawn() {
        Stratego s = new Stratego();

        Player p1 = new Player("p1", 10);
        Pawn spy = new Spy(1);
        Player p2 = new Player("p2", 10);
        Pawn spy2 = new Spy(2);
        Pawn spy3 = new Spy(2);

        Coordinate c1 = new Coordinate(7, 7);
        Coordinate c2 = new Coordinate(1, 2);
        Coordinate c3 = new Coordinate(2, 4);
        Coordinate c4 = new Coordinate(-1, -1);
        Coordinate c5 = new Coordinate(11, 11);
        Coordinate c6 = new Coordinate(1, 2);
        Coordinate c7 = new Coordinate(2, 5);


        //test response
        assertTrue(s.placePawn(spy, c1));
        assertTrue(s.placePawn(spy2, c2));
        assertFalse(s.placePawn(spy2, c3)); // false want die spy is al eens geplaatst
        assertFalse(s.placePawn(spy3, c4));
        assertFalse(s.placePawn(spy3, c5));


        //test placement
        Board b = s.getGameBoard();
        assertEquals(spy, b.getGameBoard()[7][7]);
        assertEquals(spy2, b.getGameBoard()[2][1]);
        assertNull(b.getGameBoard()[7][2]);

        //test placement on other pawn
        b.placePawn(spy3, c6);

        b = s.getGameBoard();
        assertEquals(spy2, b.getGameBoard()[2][1]);


        //test placement in water
        b.placePawn(spy3, c7);
        b = s.getGameBoard();
        assertNull(b.getPawnOnPosition(2, 5));

    }

    @Test
    public void testMovePawn() {
        Stratego s = new Stratego();

        Player p1 = new Player("p1", 10);
        Player p2 = new Player("p2", 10);

        Pawn spy = new Pawn("spy1 ", 1, 2, 2);

        Pawn spy2 = new Pawn("spy2 ", 2, 1, 1);
        Pawn spy3 = new Pawn("spy3 ", 2, 10, 1);

        s.placePawn(spy, new Coordinate(0, 9));
        s.placePawn(spy2, new Coordinate(0, 0));
        s.placePawn(spy3, new Coordinate(1, 4));

        //Test move 1 space
        assertTrue(s.movePawn(new Coordinate(0, 0), new Coordinate(0, 1)));
        assertEquals(spy2, s.getGameBoard().getPawnOnPosition(new Coordinate(0, 1)));
        assertNull(s.getGameBoard().getPawnOnPosition(new Coordinate(0, 0)));

        //Test move 2 spaces
        assertTrue(s.movePawn(new Coordinate(0, 9), new Coordinate(0, 7)));
        assertEquals(spy, s.getGameBoard().getPawnOnPosition(new Coordinate(0, 7)));
        assertNull(s.getGameBoard().getPawnOnPosition(new Coordinate(0, 9)));

        //Test move horizontal
        assertTrue(s.movePawn(new Coordinate(0, 7), new Coordinate(0, 5)));
        assertTrue(s.movePawn(new Coordinate(0, 5), new Coordinate(1, 5)));
        assertNull(s.getGameBoard().getPawnOnPosition(0, 5));

        //Test wrong move: water
        assertFalse(s.movePawn(new Coordinate(1, 5), new Coordinate(3, 5)));
        assertEquals(spy, s.getGameBoard().getPawnOnPosition(1, 5));

        //Test wrong move: out of bounds
        assertFalse(s.movePawn(new Coordinate(0, 1), new Coordinate(-1, 1)));
        assertEquals(spy2, s.getGameBoard().getPawnOnPosition(0, 1));

        //Test attack
        assertTrue(s.movePawn(new Coordinate(1, 5), new Coordinate(1, 4)));
        assertEquals(spy3, s.getGameBoard().getPawnOnPosition(1, 4));
        assertNull(s.getGameBoard().getPawnOnPosition(1, 5));

        //Test attacking Scout
        Pawn scout = new Pawn("scout", 2, 2, 10);
        Pawn rank1 = new Pawn("rank1", 1, 1);
        Pawn pawn1 = new Pawn("pawn1", 1, 1);
        Pawn rank8 = new Pawn("rank8", 1, 8);

        assertTrue(s.placePawn(scout, new Coordinate(5, 3)));
        assertTrue(s.placePawn(rank1, new Coordinate(5, 6)));
        assertTrue(s.placePawn(pawn1, new Coordinate(3, 6)));
        assertTrue(s.placePawn(rank8, new Coordinate(8, 6)));


        assertTrue(s.movePawn(new Coordinate(5, 3), new Coordinate(5, 6)));

        assertTrue(s.movePawn(new Coordinate(5, 6), new Coordinate(3, 6)));

        assertFalse(s.movePawn(new Coordinate(3, 6), new Coordinate(9, 6)));


        System.out.println(s.getGameBoard().toString());
    }
}

