package be.howest.ti.project1.stratego.stratego.specialpawns;

import be.howest.ti.project1.stratego.stratego.Pawn;

public class Miner extends Pawn {
    public Miner(int player) {
        super("miner", player, 3, 1);
    }

    @Override
    public Pawn attack(Pawn enemy) {
        if (enemy.getName().equals("flag") || enemy.getName().equals("bomb")) {
            return this;
        } else {
            if (this.getRank() > enemy.getRank()) {
                return this;
            } else if (this.getRank() < enemy.getRank()) {
                return enemy;
            } else {
                return null;
            }
        }
    }
}

