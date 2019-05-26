package be.howest.ti.project1.stratego.stratego.pawns;

import be.howest.ti.project1.stratego.stratego.Pawn;

public class Spy extends Pawn {
    public Spy(int player) {
        super("spy", player, 1, 1);
    }

    @Override
    public Pawn attack(Pawn enemy) {
        Pawn winner;
        switch (enemy.getName()) {
            case "flag":
            case "marshal":
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
}

