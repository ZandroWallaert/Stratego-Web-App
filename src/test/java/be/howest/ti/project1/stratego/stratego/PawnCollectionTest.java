package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns.Infiltrator;
import be.howest.ti.project1.stratego.stratego.pawns.Miner;
import be.howest.ti.project1.stratego.stratego.pawns.Pilot;
import junit.framework.TestCase;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class PawnCollectionTest {

    @Test
    public void testSetPawnToPlace() {
        PawnCollection classic = new PawnCollection(GameMode.CLASSIC);
        assertEquals(23, PawnCollection.getPawnsToBePlaced().size());
        TestCase.assertEquals(1, (int) PawnCollection.getPawnsToBePlaced().get(new Pawn("flag", 1, 0, 0)));
        TestCase.assertEquals(1, (int) PawnCollection.getPawnsToBePlaced().get(new Pawn("marshal", 2, 10, 1)));
        TestCase.assertEquals(4, (int) PawnCollection.getPawnsToBePlaced().get(new Pawn("sergeant", 1, 4, 1)));

        PawnCollection duel = new PawnCollection(GameMode.DUEL);
        assertEquals(13, PawnCollection.getPawnsToBePlaced().size());
        TestCase.assertEquals(2, (int) PawnCollection.getPawnsToBePlaced().get(new Pawn("scout", 1, 2, 10)));
        TestCase.assertEquals(2, (int) PawnCollection.getPawnsToBePlaced().get(new Miner(1)));

        PawnCollection infiltrator = new PawnCollection(GameMode.INFILTRATOR);
        assertEquals(25, PawnCollection.getPawnsToBePlaced().size());
        TestCase.assertEquals(7, (int) PawnCollection.getPawnsToBePlaced().get(new Pawn("scout", 1, 2, 10)));
        TestCase.assertEquals(5, (int) PawnCollection.getPawnsToBePlaced().get(new Miner(1)));
        TestCase.assertEquals(1, (int) PawnCollection.getPawnsToBePlaced().get(new Infiltrator(2)));

        PawnCollection airborn = new PawnCollection(GameMode.AIRBORNE);
        assertEquals(25, PawnCollection.getPawnsToBePlaced().size());
        TestCase.assertEquals(3, (int) PawnCollection.getPawnsToBePlaced().get(new Pilot(1)));
        TestCase.assertEquals(4, (int) PawnCollection.getPawnsToBePlaced().get(new Pawn("sergeant", 1, 4)));
        TestCase.assertEquals(5, (int) PawnCollection.getPawnsToBePlaced().get(new Miner(2)));
    }
}

