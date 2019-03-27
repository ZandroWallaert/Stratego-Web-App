package be.howest.ti.project1.stratego.people;

class GameBoard {
    private final PlayerBoard b1;
    private final PlayerBoard b2;
    private String[] board;


    GameBoard(PlayerBoard b1, PlayerBoard b2) {
        this.b1 = b1;
        this.b2 = b2;
    }

    public String[] getBoard() {
        return board;
    }

    public void setBoard(String[] board) {
        this.board = board;
    }
}

