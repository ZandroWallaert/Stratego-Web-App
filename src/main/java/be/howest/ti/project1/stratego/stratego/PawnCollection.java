package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns.Infiltrator;
import be.howest.ti.project1.stratego.stratego.pawns.Miner;
import be.howest.ti.project1.stratego.stratego.pawns.Pawn;
import be.howest.ti.project1.stratego.stratego.pawns.Spy;
import be.howest.ti.project1.stratego.stratego.pawns.Pilot;

import java.util.HashMap;
import java.util.Map;

public class PawnCollection {
    private Map<Pawn, Integer> toPlace;
    private Map<Pawn, Integer> placed;
    private Map<Pawn, Integer> defeated;

    public PawnCollection(GameMode mode) {
        this.toPlace = new HashMap<>();
        this.placed = new HashMap<>();
        this.defeated = new HashMap<>();

        setPawnsToPlace(mode);
    }

    public Map<Pawn, Integer> getToPlace() {
        return toPlace;
    }

    public Map<Pawn, Integer> getPlaced() {
        return placed;
    }

    public Map<Pawn, Integer> getDefeated() {
        return defeated;
    }

    private void setPawnsToPlace(GameMode mode) {


        this.toPlace.put(new Pawn("general", 1, 9), 1);
        this.toPlace.put(new Pawn("general", 2, 9), 1);


        this.toPlace.put(new Pawn("flag", 1, 0, 0), 1);
        this.toPlace.put(new Pawn("flag", 2, 0, 0), 1);


        this.toPlace.put(new Pawn("marshal", 1, 10), 1);
        this.toPlace.put(new Pawn("marshal", 2, 10), 1);


        Pawn scout1 = new Pawn("scout", 1, 2, 10);
        Pawn scout2 = new Pawn("scout", 2, 2, 10);

        Pawn colonel1 = new Pawn("colonel", 1, 8);
        Pawn colonel2 = new Pawn("colonel", 2, 8);

        Pawn major1 = new Pawn("major", 1, 7);
        Pawn major2 = new Pawn("major", 2, 7);

        Pawn captain1 = new Pawn("captain", 1, 6);
        Pawn captain2 = new Pawn("captain", 2, 6);

        Pawn lieutenant1 = new Pawn("lieutenant", 1, 5);
        Pawn lieutenant2 = new Pawn("lieutenant", 2, 5);

        Pawn sergeant1 = new Pawn("sergeant", 1, 4);
        Pawn sergeant2 = new Pawn("sergeant", 2, 4);

        Pawn miner1 = new Miner(1);
        Pawn miner2 = new Miner(2);

        Pawn spy1 = new Spy(1);
        Pawn spy2 = new Spy(2);

        Pawn bomb1 = new Pawn("bomb", 1, 0, 0);
        Pawn bomb2 = new Pawn("bomb", 2, 0, 0);


        if (mode == GameMode.CLASSIC) {


            this.toPlace.put(colonel1, 2);
            this.toPlace.put(colonel2, 2);


            this.toPlace.put(major1, 3);
            this.toPlace.put(major2, 3);


            this.toPlace.put(captain1, 4);
            this.toPlace.put(captain2, 4);


            this.toPlace.put(lieutenant1, 4);
            this.toPlace.put(lieutenant2, 4);


            this.toPlace.put(sergeant1, 4);
            this.toPlace.put(sergeant2, 4);


            this.toPlace.put(miner1, 5);
            this.toPlace.put(miner2, 5);


            this.toPlace.put(scout1, 8);
            this.toPlace.put(scout2, 8);


            this.toPlace.put(spy1, 1);
            this.toPlace.put(spy2, 1);


            this.toPlace.put(bomb1, 6);
            this.toPlace.put(bomb2, 6);

        } else if (mode == GameMode.DUEL) {


            this.toPlace.put(bomb1, 2);
            this.toPlace.put(bomb2, 2);


            this.toPlace.put(miner1, 2);
            this.toPlace.put(miner2, 2);


            this.toPlace.put(scout1, 2);
            this.toPlace.put(scout2, 2);


            this.toPlace.put(spy1, 1);
            this.toPlace.put(spy2, 1);


        } else if (mode == GameMode.INFILTRATOR) {
            setPawnsToPlace(GameMode.CLASSIC);

            this.toPlace.put(scout1, 7);
            this.toPlace.put(scout2, 7);

            this.toPlace.put(new Infiltrator(1), 1);
            this.toPlace.put(new Infiltrator(2), 1);

        } else if (mode == GameMode.AIRBORN) {
            setPawnsToPlace(GameMode.CLASSIC);

            this.toPlace.put(scout1, 0);
            this.toPlace.put(scout2, 0);

            this.toPlace.put(new Pilot(1), 3);
            this.toPlace.put(new Pilot(2), 3);
        }
    }

    public void placePawn(Pawn pawn) {
        this.toPlace.remove(pawn);
        if (!this.placed.containsKey(pawn)) {
            this.placed.put(pawn, 0);
        }
        this.placed.put(pawn, this.placed.get(pawn) + 1);
    }

    public void defeatePawn(Pawn pawn) {
        this.placed.remove(pawn);
        if (!this.defeated.containsKey(pawn)) {
            this.defeated.put(pawn, 0);
        }
        this.defeated.put(pawn, this.defeated.get(pawn) + 1);
    }


}

