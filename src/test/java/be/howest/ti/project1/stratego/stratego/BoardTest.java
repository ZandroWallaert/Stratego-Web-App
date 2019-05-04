package be.howest.ti.project1.stratego.stratego;


import be.howest.ti.project1.stratego.stratego.pawns_stratego.Pawn;
import be.howest.ti.project1.stratego.stratego.pawns_stratego.Spy;
import org.junit.Test;

import static org.junit.Assert.*;


public class BoardTest {
    @Test
    public void testGetBoard() {
        Board b = new Board();

        assertEquals(10, b.getGameBoard().length);
        assertEquals(10, b.getGameBoard()[0].length);
        assertEquals(null, b.getGameBoard()[0][1]);
    }

    @Test
    public void testIsWater() {

        Board b = new Board();
        assertEquals(true, b.isWater(2, 5));
        assertEquals(false, b.isWater(2, 6));
        assertEquals(true, b.isWater(7, 5));

    }

    @Test
    public void testIsCorrectSide() {
        Board b = new Board();
        Pawn spy = new Spy(1);


        //test correct placement
        assertTrue(b.isCorrectSide(spy, 6));
        assertTrue(b.isCorrectSide(spy, 9));
        assertTrue(b.isCorrectSide(spy, 8));


        //test wrong placement
        assertFalse(b.isCorrectSide(spy, 1));
        assertFalse(b.isCorrectSide(spy, 5));

    }


    @Test
    public void testIsInsideOfBoard() {
        Board b = new Board();
        assertTrue(b.isInside(0, 0));
        assertTrue(b.isInside(9, 9));

        assertFalse(b.isInside(0, 10));
        assertFalse(b.isInside(10, 0));

        assertFalse(b.isInside(-1, 0));

    }

    @Test
    public void testGetPawnOnPosition() {
        Board b = new Board();
        Pawn spy = new Spy(1);


        Pawn spy2 = new Spy(2);

        Coordinate c1 = new Coordinate(7, 7);
        Coordinate c2 = new Coordinate(7, 2);

        b.placePawn(spy, c1);
        b.placePawn(spy2, c2);

        //pawns_stratego
        assertEquals(spy, b.getPawnOnPosition(7, 7));
        assertEquals(spy2, b.getPawnOnPosition(7, 2));

        //Null
        assertNull(b.getPawnOnPosition(8, 6));

        //Water{
        assertNull(b.getPawnOnPosition(2, 4));

        //Out of bounds
        assertNull(b.getPawnOnPosition(22, 44));
        assertNull(b.getPawnOnPosition(1, 44));
        assertNull(b.getPawnOnPosition(0, 44));
        assertNull(b.getPawnOnPosition(22, 0));
        assertNull(b.getPawnOnPosition(22, 5));

    }

    @Test
    public void testIsValidMove() {
        Board b = new Board();
        Pawn spy = new Spy(1);


        Coordinate c1 = new Coordinate(0, 9);
        Coordinate c0 = new Coordinate(0, 0);
        Coordinate c2 = new Coordinate(0, 8);
        Coordinate c4 = new Coordinate(1, 9);
        Coordinate c5 = new Coordinate(-1, -10);


        b.placePawn(spy, c1);


        //Correct moves
        assertTrue(b.isValidMove(c1, c2));
        assertTrue(b.isValidMove(c1, c4));

        //Wrong move: to many steps
        assertFalse(b.isValidMove(c1, c0));

        //Wrong move: same place
        assertFalse(b.isValidMove(c1, c1));

        //Wrong move: Out of bounds
        assertFalse(b.isValidMove(c1, c5));


    }


    @Test
    public void testCheckMovesOverWater() {
        Board b = new Board();
        Coordinate c1 = new Coordinate(1, 1);
        Coordinate c2 = new Coordinate(8, 1);
        Coordinate c3 = new Coordinate(0, 4);
        Coordinate c4 = new Coordinate(4, 4);
        Coordinate c5 = new Coordinate(1, 8);

        //Test same row
        assertFalse(b.checkMoveOverWater(c1, c2));
        assertFalse(b.checkMoveOverWater(c1, c1));
        assertFalse(b.checkMoveOverWater(c2, c1));

        assertTrue(b.checkMoveOverWater(c3, c4));
        assertTrue(b.checkMoveOverWater(c4, c3));

        //Test same column
        assertFalse(b.checkMoveOverWater(c1, c5));
        assertFalse(b.checkMoveOverWater(c5, c5));
        assertFalse(b.checkMoveOverWater(c4, new Coordinate(4, 5)));

        assertTrue(b.checkMoveOverWater(new Coordinate(7, 1), new Coordinate(7, 8)));
        assertTrue(b.checkMoveOverWater(new Coordinate(7, 8), new Coordinate(7, 1)));
    }

    @Test
    public void testMovesOverPawn() {
        Board b = new Board();
        Pawn spy = new Pawn("spy", 1, 10, 2);

        Pawn spy2 = new Spy(2);
        Pawn spy3 = new Pawn("spy", 1, 10, 1);


        b.placePawn(spy, new Coordinate(0, 0));
        b.placePawn(spy2, new Coordinate(1, 0));
        b.placePawn(spy3, new Coordinate(0, 4));


        //Normal move
        assertTrue(b.checkMoveOverPawn(new Coordinate(0, 0), new Coordinate(2, 0)));
        assertFalse(b.checkMoveOverPawn(new Coordinate(0, 0), new Coordinate(0, 3)));
        assertTrue(b.checkMoveOverPawn(new Coordinate(0, 0), new Coordinate(0, 8)));

        //Attack move
        assertFalse(b.checkMoveOverPawn(new Coordinate(0, 0), new Coordinate(0, 4)));
        assertFalse(b.checkMoveOverPawn(new Coordinate(0, 0), new Coordinate(1, 0)));
        assertFalse(b.checkMoveOverPawn(new Coordinate(1, 0), new Coordinate(0, 0)));

        //Same coordinate
        assertFalse(b.checkMoveOverPawn(new Coordinate(0, 0), new Coordinate(0, 0)));


    }

}

