package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns.Pawn;

import java.util.Objects;

public class Move {

    private Pawn pawn;
    private Coordinate start;
    private Coordinate destination;


    public Move(Pawn pawn, Coordinate start, Coordinate destination) {

        this.pawn = pawn;
        this.start = start;
        this.destination = destination;
    }


    public Pawn getPawn() {
        return pawn;
    }

    public Coordinate getStart() {
        return start;
    }

    public Coordinate getDestination() {
        return destination;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Move)) return false;
        Move move = (Move) obj;
        return Objects.equals(pawn.getPlayer(), move.getPawn().getPlayer()) &&
                Objects.equals(getPawn(), move.getPawn()) &&

                ((Objects.equals(getStart(), move.getStart()) &&
                        Objects.equals(getDestination(), move.getDestination()))

                        ||

                        (Objects.equals(getStart(), move.getDestination()) &&
                                Objects.equals(getDestination(), move.getStart())));
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPawn(), getStart(), getDestination());
    }

    @Override
    public String toString() {
        return pawn + ": " + start + " -> " + destination;
    }
}

