package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns.Miner;
import org.junit.Test;
import static junit.framework.TestCase.*;

public class StrategoTest {
    @Test
    public void testPlacePawn() {
        Stratego s = new Stratego();
        Player player1 = new Player("player1", 22);
        Player player2 = new Player("player2", 99);
        Pawn miner = new Miner(1);
        Pawn miner2 = new Miner(2);
        Pawn miner3 = new Miner(2);

        Coordinates c1 = new Coordinates(8, 8);
        Coordinates c2 = new Coordinates(1, 2);
        Coordinates c3 = new Coordinates(2, 4);
        Coordinates c4 = new Coordinates(-1, 0);
        Coordinates c5 = new Coordinates(10, 10);
        Coordinates c6 = new Coordinates(1, 2);
        Coordinates c7 = new Coordinates(2, 5);

        assertTrue(s.placePawn(miner, c1));
        assertTrue(s.placePawn(miner2, c2));
        assertFalse(s.placePawn(miner2, c3));
        assertFalse(s.placePawn(miner3, c4));
        assertFalse(s.placePawn(miner3, c5));

        GameBoardTest b = s.getGameBoard();
        assertEquals(miner, b.getGameboard()[8][8]);
        assertEquals(miner2, b.getGameboard()[2][1]);
        assertNull(b.getGameboard()[7][2]);

        //On other pawn
        b.placePawnOnPosition(miner3, c6);
        b = s.getGameBoard();
        assertEquals(miner2, b.getGameboard()[2][1]);

        //In water
        b.placePawnOnPosition(miner3, c7);
        b = s.getGameBoard();
        assertNull(b.getPawnOnPosition(2, 5));
    }

    @Test
    public void testMovePawn() {
        Stratego s = new Stratego();
        Player player1 = new Player("player1", 22);
        Player player2 = new Player("player2", 99);

        Pawn sergeant = new Pawn("sergeant", 1, 4, 2);
        Pawn sergeant2 = new Pawn("sergeant2", 2, 4, 1);
        Pawn sergeant3 = new Pawn("sergeant3", 2, 5, 1);

        s.placePawn(sergeant, new Coordinates(0, 9));
        s.placePawn(sergeant2, new Coordinates(0, 0));
        s.placePawn(sergeant3, new Coordinates(1, 4));

        assertTrue(s.movePawn(new Coordinates(0, 0), new Coordinates(0, 1)));
        assertEquals(sergeant2, s.getGameBoard().getPawnOnPosition(new Coordinates(0, 1)));
        assertNull(s.getGameBoard().getPawnOnPosition(new Coordinates(0, 0)));

        assertTrue(s.movePawn(new Coordinates(0, 9), new Coordinates(0, 7)));
        assertEquals(sergeant, s.getGameBoard().getPawnOnPosition(new Coordinates(0, 7)));
        assertNull(s.getGameBoard().getPawnOnPosition(new Coordinates(0, 9)));

        assertTrue(s.movePawn(new Coordinates(0, 7), new Coordinates(0, 5)));
        assertTrue(s.movePawn(new Coordinates(0, 5), new Coordinates(1, 5)));
        assertNull(s.getGameBoard().getPawnOnPosition(0, 5));

        //Water
        assertFalse(s.movePawn(new Coordinates(1, 5), new Coordinates(3, 5)));
        assertEquals(sergeant, s.getGameBoard().getPawnOnPosition(1, 5));

        //Out of bounds
        assertFalse(s.movePawn(new Coordinates(0, 1), new Coordinates(-1, 1)));
        assertEquals(sergeant2, s.getGameBoard().getPawnOnPosition(0, 1));

        //Attack
        assertTrue(s.movePawn(new Coordinates(1, 5), new Coordinates(1, 4)));
        assertEquals(sergeant3, s.getGameBoard().getPawnOnPosition(1, 4));
        assertNull(s.getGameBoard().getPawnOnPosition(1, 5));

        Pawn scout = new Pawn("scout", 2, 2, 10);
        Pawn pawn = new Pawn("pawn", 1, 1, 1);
        Pawn pawn2 = new Pawn("pawn2", 1, 1, 10);
        Pawn pawn3 = new Pawn("pawn3", 2, 4, 1);

        assertTrue(s.placePawn(scout, new Coordinates(9, 3)));
        assertTrue(s.placePawn(pawn, new Coordinates(9, 6)));
        assertTrue(s.placePawn(pawn2, new Coordinates(8, 6)));
        assertTrue(s.placePawn(pawn3, new Coordinates(8, 3)));

        assertTrue(s.movePawn(new Coordinates(9, 3), new Coordinates(9, 6)));
        assertTrue(s.movePawn(new Coordinates(9, 6), new Coordinates(8, 6)));
        assertFalse(s.movePawn(new Coordinates(8, 6), new Coordinates(8, 3)));

        System.out.println(s.getGameBoard().toString());
    }
}

