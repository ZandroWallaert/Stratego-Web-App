package be.howest.ti.project1.stratego.stratego.pawns_stratego;

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
                //If ranks are equal, nobody wins
                return null;
            }

        }

    }

}

