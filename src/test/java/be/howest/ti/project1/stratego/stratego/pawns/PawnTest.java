package be.howest.ti.project1.stratego.stratego.pawns;

import be.howest.ti.project1.stratego.stratego.Player;
import be.howest.ti.project1.stratego.stratego.pawns_stratego.Infiltrator;
import be.howest.ti.project1.stratego.stratego.pawns_stratego.Miner;
import be.howest.ti.project1.stratego.stratego.pawns_stratego.Pawn;
import be.howest.ti.project1.stratego.stratego.pawns_stratego.Spy;
import org.junit.Test;

import static org.junit.Assert.*;

public class PawnTest {

    @Test
    public void testConstructor() {

        Player p1 = new Player("p1", 10);
        Pawn pawn = new Pawn("test", 1, 7, 5);

        assertEquals(7, pawn.getRank());
        assertEquals(5, pawn.getMaxTravelDistance());
        assertEquals(1, pawn.getPlayer());

        Pawn pawnShort = new Pawn("short", 1, 5);
        assertEquals(5, pawnShort.getRank());
        assertEquals(1, pawnShort.getMaxTravelDistance());
        assertEquals(1, pawnShort.getPlayer());

        Pawn spy = new Spy(1);
        assertEquals(1, spy.getPlayer());
        assertEquals(1, spy.getRank());
        assertEquals(1, spy.getMaxTravelDistance());

        Pawn miner = new Miner(1);
        assertEquals(1, miner.getMaxTravelDistance());
        assertEquals(3, miner.getRank());
        assertEquals(1, miner.getPlayer());

        Pawn infiltrator = new Infiltrator(1);
        assertEquals(1, infiltrator.getPlayer());
        assertEquals(2, infiltrator.getMaxTravelDistance());
        assertEquals(1, infiltrator.getRank());

    }

    @Test
    public void testAttack() {
        Player p1 = new Player("p1", 10);
        Pawn bomb = new Pawn("bomb", 1, 7, 5);
        Pawn miner = new Miner(1);
        Pawn infiltrator = new Infiltrator(1);
        Pawn spy = new Spy(1);

        Player p2 = new Player("p2", 10);
        Pawn marshal = new Pawn("marshal", 2, 10, 5);
        Pawn spy2 = new Spy(2);

        //attacking bomb and miner
        assertEquals(bomb, infiltrator.attack(bomb));
        assertEquals(miner, miner.attack(bomb));

        //attacking spy
        assertEquals(spy, spy.attack(marshal));
        assertEquals(marshal, marshal.attack(spy));
        assertNull(spy.attack(spy2));

    }


}
