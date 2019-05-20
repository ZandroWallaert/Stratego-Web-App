package be.howest.ti.project1.stratego;

import be.howest.ti.project1.stratego.stratego.Player;

public class Main {
    public static void main() {
        new Main().run();
    }

    private void run() {
        System.out.println("Game Started");
        Player player1 = new Player("P1", 22);
        Player player2 = new Player("P2", 23);
    }
}

