package be.howest.ti.project1.stratego.people;

public class Game {
    private Player player1;
    private Player player2;
    private GameBoard gameboard;

    public Game(Player p1, Player p2, PlayerBoard b1, PlayerBoard b2) {
        player1 = p1;
        player2 = p2;
        gameboard = new GameBoard(b1, b2);
    }

    public Player getPlayer1() {
        return player1;
    }

    public void setPlayer1(Player player1) {
        this.player1 = player1;
    }

    public Player getPlayer2() {
        return player2;
    }

    public void setPlayer2(Player player2) {
        this.player2 = player2;
    }

    public GameBoard getGameboard() {
        return gameboard;
    }

}

