package be.howest.ti.project1.stratego.stratego;


import be.howest.ti.project1.stratego.stratego.pawns_stratego.Pawn;
import be.howest.ti.project1.stratego.stratego.pawns_stratego.Spy;
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
        Coordinate c3 = new Coordinate(2, 7);
        Coordinate c4 = new Coordinate(-1, -1);
        Coordinate c5 = new Coordinate(11, 11);
        Coordinate c6 = new Coordinate(1, 2);
        Coordinate c7 = new Coordinate(2, 5);


        //test response
        assertTrue(s.placePawn(spy, c1));
        assertTrue(s.placePawn(spy2, c2));
        assertFalse(s.placePawn(spy2, c3));
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
        Pawn spy = new Pawn("spy1 ", 1, 2, 2);

        Player p2 = new Player("p2", 10);
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

    }

    @Test
    public void testHasMadeSameMoveLessNthTimes() {
        Stratego s = new Stratego();

        Player p1 = new Player("p1", 10);
        Pawn spy = new Pawn("spy", 1, 2, 2);
        s.placePawn(spy, new Coordinate(0, 9));
        assertEquals(0, s.getMoveHistory().size());

        s.movePawn(new Coordinate(0, 9), new Coordinate(0, 8));
        assertEquals(1, s.getMoveHistory().size());
        assertTrue(s.madeMoveLessNthTimes(1, spy, new Coordinate(0, 9), new Coordinate(0, 8)));
        s.movePawn(new Coordinate(0, 8), new Coordinate(0, 9));
        assertEquals(2, s.getMoveHistory().size());
        assertTrue(s.movePawn(new Coordinate(0, 9), new Coordinate(0, 8)));
        assertFalse(s.movePawn(new Coordinate(0, 8), new Coordinate(0, 9)));


    }

}
