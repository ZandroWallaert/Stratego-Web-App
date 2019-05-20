package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.specialpawns.Infiltrator;
import be.howest.ti.project1.stratego.stratego.specialpawns.Miner;
import be.howest.ti.project1.stratego.stratego.specialpawns.Spy;
import be.howest.ti.project1.stratego.stratego.specialpawns.Pilot;

import java.util.Map;
import java.util.HashMap;

public class PawnCollection {
    private Map<Pawn, Integer> pawnsToBePlaced;
    private Map<Pawn, Integer> placed;
    private Map<Pawn, Integer> defeated;

    public PawnCollection(GameMode mode) {
        this.pawnsToBePlaced = new HashMap<>();
        this.placed = new HashMap<>();
        this.defeated = new HashMap<>();
        setPawnsToPlace(mode);
    }

    public Map<Pawn, Integer> getPawnsToBePlaced() {
        return pawnsToBePlaced;
    }

    public Map<Pawn, Integer> getPlaced() {
        return placed;
    }

    public Map<Pawn, Integer> getDefeated() {
        return defeated;
    }

    private void setPawnsToPlace(GameMode mode) {
        this.pawnsToBePlaced.put(new Pawn("general", 1, 9), 1);
        this.pawnsToBePlaced.put(new Pawn("general", 2, 9), 1);

        this.pawnsToBePlaced.put(new Pawn("flag", 1, 0, 0), 1);
        this.pawnsToBePlaced.put(new Pawn("flag", 2, 0, 0), 1);

        this.pawnsToBePlaced.put(new Pawn("marshal", 1, 10), 1);
        this.pawnsToBePlaced.put(new Pawn("marshal", 2, 10), 1);

        Pawn scout1 = new Pawn("scout", 1, 2, 10);
        Pawn scout2 = new Pawn("scout", 2, 2, 10);

        Pawn major1 = new Pawn("major", 1, 7);
        Pawn major2 = new Pawn("major", 2, 7);

        Pawn colonel1 = new Pawn("colonel", 1, 8);
        Pawn colonel2 = new Pawn("colonel", 2, 8);

        Pawn captain1 = new Pawn("captain", 1, 6);
        Pawn captain2 = new Pawn("captain", 2, 6);

        Pawn lieutenant1 = new Pawn("lieutenant", 1, 5);
        Pawn lieutenant2 = new Pawn("lieutenant", 2, 5);

        Pawn sergeant1 = new Pawn("sergeant", 1, 4);
        Pawn sergeant2 = new Pawn("sergeant", 2, 4);

        Pawn bomb1 = new Pawn("bomb", 1, 0, 0);
        Pawn bomb2 = new Pawn("bomb", 2, 0, 0);

        Pawn miner1 = new Miner(1);
        Pawn miner2 = new Miner(2);

        Pawn spy1 = new Spy(1);
        Pawn spy2 = new Spy(2);

        if (mode == GameMode.CLASSIC) {
            this.pawnsToBePlaced.put(major1, 3);
            this.pawnsToBePlaced.put(major2, 3);

            this.pawnsToBePlaced.put(captain1, 4);
            this.pawnsToBePlaced.put(captain2, 4);

            this.pawnsToBePlaced.put(colonel1, 2);
            this.pawnsToBePlaced.put(colonel2, 2);

            this.pawnsToBePlaced.put(lieutenant1, 4);
            this.pawnsToBePlaced.put(lieutenant2, 4);

            this.pawnsToBePlaced.put(sergeant1, 4);
            this.pawnsToBePlaced.put(sergeant2, 4);

            this.pawnsToBePlaced.put(miner1, 5);
            this.pawnsToBePlaced.put(miner2, 5);

            this.pawnsToBePlaced.put(scout1, 8);
            this.pawnsToBePlaced.put(scout2, 8);

            this.pawnsToBePlaced.put(spy1, 1);
            this.pawnsToBePlaced.put(spy2, 1);

            this.pawnsToBePlaced.put(bomb1, 6);
            this.pawnsToBePlaced.put(bomb2, 6);
        } else if (mode == GameMode.DUEL) {
            this.pawnsToBePlaced.put(bomb1, 2);
            this.pawnsToBePlaced.put(bomb2, 2);

            this.pawnsToBePlaced.put(miner1, 2);
            this.pawnsToBePlaced.put(miner2, 2);

            this.pawnsToBePlaced.put(scout1, 2);
            this.pawnsToBePlaced.put(scout2, 2);

            this.pawnsToBePlaced.put(spy1, 1);
            this.pawnsToBePlaced.put(spy2, 1);
        } else if (mode == GameMode.INFILTRATOR) {
            setPawnsToPlace(GameMode.CLASSIC);

            this.pawnsToBePlaced.put(scout1, 7);
            this.pawnsToBePlaced.put(scout2, 7);

            this.pawnsToBePlaced.put(new Infiltrator(1), 1);
            this.pawnsToBePlaced.put(new Infiltrator(2), 1);
        } else if (mode == GameMode.AIRBORN) {
            setPawnsToPlace(GameMode.CLASSIC);

            this.pawnsToBePlaced.put(scout1, 0);
            this.pawnsToBePlaced.put(scout2, 0);

            this.pawnsToBePlaced.put(new Pilot(1), 3);
            this.pawnsToBePlaced.put(new Pilot(2), 3);
        }
    }

    public void placePawn(Pawn pawn) {
        this.pawnsToBePlaced.remove(pawn);
        if (!this.placed.containsKey(pawn)) {
            this.placed.put(pawn, 0);
        }
        this.placed.put(pawn, this.placed.get(pawn) + 1);
    }

    public void defeatedPawn(Pawn pawn) {
        this.placed.remove(pawn);
        if (!this.defeated.containsKey(pawn)) {
            this.defeated.put(pawn, 0);
        }
        this.defeated.put(pawn, this.defeated.get(pawn) + 1);
    }
}

