package be.howest.ti.project1.stratego.stratego;

import java.util.Objects;

public class Pawn {
    private String name;
    private int player;
    private int rank;
    private int maxRangeDistance;

    public Pawn(String name, int player, int rank, int maxRangeDistance) {
        this.name = name;
        this.player = player;
        this.maxRangeDistance = maxRangeDistance;
        this.rank = rank;
    }

    public Pawn(String name, int player, int rank) {
        this(name, player, rank, 1);
    }

    public int getMaxRangeDistance() {
        return maxRangeDistance;
    }

    public int getPlayer() {
        return player;
    }

    public int getRank() {
        return rank;
    }

    public String getName() {
        return name;
    }

    public Pawn attack(Pawn enemy) {
        Pawn winner;
        switch (enemy.getName()) {
            case "flag":
                winner = this;
                break;
            case "bomb":
                winner = enemy;
                break;
            default:
                if (this.getRank() > enemy.getRank()) {
                    winner = this;
                } else if (this.getRank() < enemy.getRank()) {
                    winner = enemy;
                } else {
                    winner = null;
                }
                break;
        }
        return winner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pawn)) return false;
        Pawn pawn = (Pawn) o;
        return getPlayer() == pawn.getPlayer() &&
                getMaxRangeDistance() == pawn.getMaxRangeDistance() &&
                getRank() == pawn.getRank() &&
                Objects.equals(getName(), pawn.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getPlayer(), getMaxRangeDistance(), getRank());
    }

    @Override
    public String toString() {
        return this.name + "Pawn(" + rank + ")";
    }
}

