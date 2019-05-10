package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns.Infiltrator;
import be.howest.ti.project1.stratego.stratego.pawns.Miner;
import be.howest.ti.project1.stratego.stratego.pawns.Pawn;
import be.howest.ti.project1.stratego.stratego.pawns.Pilot;
import org.junit.Test;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;


public class PawnCollectionTest {

    @Test
    public void testSetPawnToPlace() {
        PawnCollection classic = new PawnCollection(GameMode.CLASSIC);
        assertEquals(24, classic.getToPlace().size());
        assertTrue(1 == classic.getToPlace().get(new Pawn("flag", 1, 0, 0)));
        assertTrue(1 == classic.getToPlace().get(new Pawn("marshal", 2, 10)));
        assertTrue(4 == classic.getToPlace().get(new Pawn("sergeant", 1, 4)));

        PawnCollection duel = new PawnCollection(GameMode.DUEL);
        assertEquals(14, duel.getToPlace().size());
        assertTrue(2 == duel.getToPlace().get(new Pawn("scout", 1, 2, 10)));
        assertTrue(2 == duel.getToPlace().get(new Miner(1)));

        PawnCollection infiltrator = new PawnCollection(GameMode.INFILTRATOR);
        assertEquals(26, infiltrator.getToPlace().size());
        assertTrue(7 == infiltrator.getToPlace().get(new Pawn("scout", 1, 2, 10)));
        assertTrue(5 == infiltrator.getToPlace().get(new Miner(1)));
        assertTrue(1 == infiltrator.getToPlace().get(new Infiltrator(2)));

        PawnCollection airborn = new PawnCollection(GameMode.AIRBORN);
        assertEquals(26, airborn.getToPlace().size());
        assertTrue(3 == airborn.getToPlace().get(new Pilot(1)));
        assertTrue(4 == classic.getToPlace().get(new Pawn("sergeant", 1, 4)));
        assertTrue(5 == infiltrator.getToPlace().get(new Miner(2)));

    }


}
