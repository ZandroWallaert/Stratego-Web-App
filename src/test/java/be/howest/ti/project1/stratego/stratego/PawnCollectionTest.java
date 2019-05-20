package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.specialpawns.Infiltrator;
import be.howest.ti.project1.stratego.stratego.specialpawns.Miner;
import be.howest.ti.project1.stratego.stratego.specialpawns.Pilot;
import junit.framework.TestCase;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class PawnCollectionTest {

    @Test
    public void testSetPawnToPlace() {
        PawnCollection classic = new PawnCollection(GameMode.CLASSIC);
        assertEquals(24, classic.getPawnsToBePlaced().size());
        TestCase.assertEquals(1, (int) classic.getPawnsToBePlaced().get(new Pawn("flag", 1, 0, 0)));
        TestCase.assertEquals(1, (int) classic.getPawnsToBePlaced().get(new Pawn("marshal", 2, 10, 1)));
        TestCase.assertEquals(4, (int) classic.getPawnsToBePlaced().get(new Pawn("sergeant", 1, 4, 1)));

        PawnCollection duel = new PawnCollection(GameMode.DUEL);
        assertEquals(14, duel.getPawnsToBePlaced().size());
        TestCase.assertEquals(2, (int) duel.getPawnsToBePlaced().get(new Pawn("scout", 1, 2, 10)));
        TestCase.assertEquals(2, (int) duel.getPawnsToBePlaced().get(new Miner(1)));

        PawnCollection infiltrator = new PawnCollection(GameMode.INFILTRATOR);
        assertEquals(26, infiltrator.getPawnsToBePlaced().size());
        TestCase.assertEquals(7, (int) infiltrator.getPawnsToBePlaced().get(new Pawn("scout", 1, 2, 10)));
        TestCase.assertEquals(5, (int) infiltrator.getPawnsToBePlaced().get(new Miner(1)));
        TestCase.assertEquals(1, (int) infiltrator.getPawnsToBePlaced().get(new Infiltrator(2)));

        PawnCollection airborn = new PawnCollection(GameMode.AIRBORN);
        assertEquals(26, airborn.getPawnsToBePlaced().size());
        TestCase.assertEquals(3, (int) airborn.getPawnsToBePlaced().get(new Pilot(1)));
        TestCase.assertEquals(4, (int) classic.getPawnsToBePlaced().get(new Pawn("sergeant", 1, 4)));
        TestCase.assertEquals(5, (int) infiltrator.getPawnsToBePlaced().get(new Miner(2)));
    }
}

