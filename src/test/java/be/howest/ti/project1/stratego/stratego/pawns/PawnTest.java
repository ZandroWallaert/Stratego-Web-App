package be.howest.ti.project1.stratego.stratego.pawns;

import be.howest.ti.project1.stratego.stratego.Pawn;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class PawnTest {

    @Test
    public void testBuilder() {
        Pawn pawn = new Pawn("pawnTest", 1, 5, 2);

        assertEquals(5, pawn.getRank());
        assertEquals(2, pawn.getMaxRangeDistance());
        assertEquals(1, pawn.getPlayer());

        Pawn bomb = new Bomb(1);
        assertEquals(0, bomb.getMaxRangeDistance());
        assertEquals(11, bomb.getRank());
        assertEquals(1, bomb.getPlayer());

        Pawn captain = new Captain(2);
        assertEquals(1, captain.getMaxRangeDistance());
        assertEquals(6, captain.getRank());
        assertEquals(2, captain.getPlayer());

        Pawn sergeant = new Sergeant(1);
        assertEquals(1, sergeant.getMaxRangeDistance());
        assertEquals(4, sergeant.getRank());
        assertEquals(1, sergeant.getPlayer());

        Pawn colonel = new Colonel(1);
        assertEquals(1, colonel.getMaxRangeDistance());
        assertEquals(8, colonel.getRank());
        assertEquals(1, colonel.getPlayer());

        Pawn flag = new Flag(2);
        assertEquals(0, flag.getMaxRangeDistance());
        assertEquals(0, flag.getRank());
        assertEquals(2, flag.getPlayer());

        Pawn general = new General(1);
        assertEquals(1, general.getMaxRangeDistance());
        assertEquals(9, general.getRank());
        assertEquals(1, general.getPlayer());

        Pawn lieutenant = new Lieutenant(2);
        assertEquals(1, lieutenant.getMaxRangeDistance());
        assertEquals(5, lieutenant.getRank());
        assertEquals(2, lieutenant.getPlayer());

        Pawn major = new Major(1);
        assertEquals(1, major.getMaxRangeDistance());
        assertEquals(7, major.getRank());
        assertEquals(1, major.getPlayer());

        Pawn marshall = new Marshall(2);
        assertEquals(1, marshall.getMaxRangeDistance());
        assertEquals(10, marshall.getRank());
        assertEquals(2, marshall.getPlayer());

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
        Pawn bomb = new Pawn("bomb", 1, 11, 0);
        Pawn miner = new Miner(1);
        Pawn infiltrator = new Infiltrator(1);
        Pawn spy = new Spy(1);

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

