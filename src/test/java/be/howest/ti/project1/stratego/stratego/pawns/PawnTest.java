package be.howest.ti.project1.stratego.stratego.pawns;

import be.howest.ti.project1.stratego.stratego.Pawn;
import be.howest.ti.project1.stratego.stratego.Player;
import org.junit.Test;

import static org.junit.Assert.*;

public class PawnTest {

    @Test
    public void testBuilder() {
        Player player1 = new Player("player1", 22);
        Player player2 = new Player("player2", 99);
        Pawn pawn = new Pawn("pawnTest", 1, 5, 2);

        assertEquals(5, pawn.getRank());
        assertEquals(2, pawn.getMaxRangeDistance());
        assertEquals(1, pawn.getPlayer());

        Pawn pawn2 = new Pawn("pawnTest2", 2, 9);
        assertEquals(9, pawn2.getRank());
        assertEquals(1, pawn2.getMaxRangeDistance());
        assertEquals(2, pawn2.getPlayer());

        Pawn miner = new Miner(2);
        assertEquals(1, miner.getMaxRangeDistance());
        assertEquals(3, miner.getRank());
        assertEquals(2, miner.getPlayer());

        Pawn spy = new Spy(1);
        assertEquals(1, spy.getPlayer());
        assertEquals(1, spy.getRank());
        assertEquals(1, spy.getMaxRangeDistance());

        Pawn infiltrator = new Infiltrator(2);
        assertEquals(2, infiltrator.getPlayer());
        assertEquals(1, infiltrator.getMaxRangeDistance());
        assertEquals(1, infiltrator.getRank());

        Pawn pilot = new Pilot(2);
        assertEquals(2, pilot.getPlayer());
        assertEquals(10, pilot.getMaxRangeDistance());
        assertEquals(2, pilot.getRank());
    }

    @Test
    public void testAttack() {
        Player player1 = new Player("player1", 22);
        Pawn bomb = new Pawn("bomb", 1, 11, 0);
        Pawn miner = new Miner(1);
        Pawn infiltrator = new Infiltrator(1);
        Pawn spy = new Spy(1);

        Player player2 = new Player("player2", 99);
        Pawn marshal = new Pawn("marshal", 2, 10, 1);
        Pawn miner2 = new Miner(2);
        Pawn infiltrator2 = new Infiltrator(2);
        Pawn spy2 = new Spy(2);

        //attacking bomb, miner and spy
        assertEquals(bomb, infiltrator.attack(bomb));
        assertEquals(miner, miner.attack(bomb));
        assertEquals(bomb, marshal.attack(bomb));
        assertEquals(spy, spy.attack(marshal));
        assertEquals(marshal, marshal.attack(spy));

        //attack itself
        assertNull(spy.attack(spy2));
        assertNull(miner.attack(miner2));
        assertNull(infiltrator.attack(infiltrator2));
    }
}

