package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns.Spy;
import org.junit.Test;

import static org.junit.Assert.*;

public class GameBoardTest {
    @Test
    public void testGetBoard() {
        GameBoard b = new GameBoard();
        assertEquals(10, b.getGameBoard().length);
        assertEquals(10, b.getGameBoard()[0].length);
        assertNull(b.getGameBoard()[0][1]);
        assertNull(b.getGameBoard()[1][0]);
    }

    @Test
    public void testIsWater() {
        GameBoard b = new GameBoard();
        assertFalse(b.isWater(0, 4));
        assertFalse(b.isWater(0, 5));
        assertFalse(b.isWater(1, 4));
        assertFalse(b.isWater(1, 5));
        assertTrue(b.isWater(2, 4));
        assertTrue(b.isWater(2, 5));
        assertTrue(b.isWater(3, 4));
        assertTrue(b.isWater(3, 5));
        assertFalse(b.isWater(4, 4));
        assertFalse(b.isWater(4, 5));
        assertFalse(b.isWater(5, 4));
        assertFalse(b.isWater(5, 5));
        assertTrue(b.isWater(6, 4));
        assertTrue(b.isWater(7, 5));
    }

    @Test
    public void testIsCorrectSide() {
        GameBoard b = new GameBoard();
        Pawn spy = new Spy(1);

        //test correct placement
        assertTrue(b.isCorrectSideOfBoard(spy, 6));
        assertTrue(b.isCorrectSideOfBoard(spy, 9));
        assertTrue(b.isCorrectSideOfBoard(spy, 8));

        //test wrong placement
        assertFalse(b.isCorrectSideOfBoard(spy, 4));
        assertFalse(b.isCorrectSideOfBoard(spy, 5));
    }

    @Test
    public void testIsInsideOfBoard() {
        GameBoard b = new GameBoard();
        assertTrue(b.isInsideBoard(0, 0));
        assertTrue(b.isInsideBoard(5, 5));
        assertTrue(b.isInsideBoard(9, 9));
        assertFalse(b.isInsideBoard(0, -1));
        assertFalse(b.isInsideBoard(-1, 0));
        assertFalse(b.isInsideBoard(10, 10));
    }

    @Test
    public void testGetPawnOnPosition() {
        GameBoard b = new GameBoard();
        Pawn spy = new Spy(1);
        Pawn spy2 = new Spy(2);

        Coordinates c1 = new Coordinates(7, 7);
        Coordinates c2 = new Coordinates(7, 2);

        b.placePawnOnPosition(spy, c1);
        b.placePawnOnPosition(spy2, c2);

        //pawns
        assertEquals(spy, b.getPawnOnPosition(7, 7));
        assertEquals(spy2, b.getPawnOnPosition(7, 2));

        //Null
        assertNull(b.getPawnOnPosition(9, 6));
        assertNull(b.getPawnOnPosition(7, 6));

        //Water
        assertNull(b.getPawnOnPosition(2, 4));
        assertNull(b.getPawnOnPosition(7, 5));

        //Out of bounds
        assertNull(b.getPawnOnPosition(0, -10));
        assertNull(b.getPawnOnPosition(-10, 0));
        assertNull(b.getPawnOnPosition(33, 44));
        assertNull(b.getPawnOnPosition(99, 99));
    }

    @Test
    public void testIsValidMove() {
        GameBoard b = new GameBoard();
        Pawn spy = new Spy(1);

        Coordinates c0 = new Coordinates(0, 0);
        Coordinates c1 = new Coordinates(9, 9);
        Coordinates c2 = new Coordinates(9, 8);
        Coordinates c4 = new Coordinates(8, 9);
        Coordinates c5 = new Coordinates(9, 10);

        b.placePawnOnPosition(spy, c1);

        //Correct moves
        assertTrue(b.isValidMove(c1, c2));
        assertTrue(b.isValidMove(c1, c4));

        //Range to big
        assertFalse(b.isValidMove(c1, c0));

        //Same place
        assertFalse(b.isValidMove(c1, c1));

        //Out of bounds
        assertFalse(b.isValidMove(c1, c5));
    }

    @Test
    public void testCheckMovesOverWater() {
        GameBoard b = new GameBoard();
        Coordinates c1 = new Coordinates(1, 1);
        Coordinates c2 = new Coordinates(6, 1);
        Coordinates c3 = new Coordinates(1, 4);
        Coordinates c4 = new Coordinates(3, 4);
        Coordinates c5 = new Coordinates(1, 8);

        //Same row
        assertFalse(b.checkIsMoveOverWater(c1, c2));
        assertFalse(b.checkIsMoveOverWater(c1, c1));
        assertFalse(b.checkIsMoveOverWater(c2, c1));
        assertTrue(b.checkIsMoveOverWater(c3, c4));
        assertTrue(b.checkIsMoveOverWater(c4, c3));

        //Same column
        assertFalse(b.checkIsMoveOverWater(c1, c5));
        assertFalse(b.checkIsMoveOverWater(c5, c5));
        assertFalse(b.checkIsMoveOverWater(c4, new Coordinates(4, 5)));
        assertTrue(b.checkIsMoveOverWater(new Coordinates(7, 1), new Coordinates(7, 8)));
        assertTrue(b.checkIsMoveOverWater(new Coordinates(7, 8), new Coordinates(7, 1)));
    }

    @Test
    public void testMovesOverPawn() {
        GameBoard b = new GameBoard();

        Pawn spy = new Spy(1);
        Pawn scout = new Pawn("scout", 1, 10, 2);
        Pawn scout2 = new Pawn("scout2", 2, 10, 1);

        b.placePawnOnPosition(spy, new Coordinates(1, 0));
        b.placePawnOnPosition(scout, new Coordinates(0, 0));
        b.placePawnOnPosition(scout2, new Coordinates(0, 4));

        //Normal move
        assertTrue(b.checkIsMoveOverPawn(new Coordinates(0, 0), new Coordinates(2, 0)));
        assertFalse(b.checkIsMoveOverPawn(new Coordinates(0, 0), new Coordinates(0, 3)));
        assertTrue(b.checkIsMoveOverPawn(new Coordinates(0, 0), new Coordinates(0, 8)));

        //Attack move
        assertFalse(b.checkIsMoveOverPawn(new Coordinates(0, 0), new Coordinates(0, 4)));
        assertFalse(b.checkIsMoveOverPawn(new Coordinates(0, 0), new Coordinates(1, 0)));
        assertFalse(b.checkIsMoveOverPawn(new Coordinates(1, 0), new Coordinates(0, 0)));

        //Same coordinate
        assertFalse(b.checkIsMoveOverPawn(new Coordinates(9, 9), new Coordinates(9, 9)));
    }
}
