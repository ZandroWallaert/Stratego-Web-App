package be.howest.ti.project1.stratego.people;

public class PlayerBoard {
    private String[] board;
    private String jsonstring;

    public PlayerBoard(String jsonstring) { //Insert JSON in playerboard
        this.jsonstring = jsonstring;
    }

    public String[] getBoard() {
        return board;
    }

    public void setBoard(String[] board) {
        this.board = board;
    }

    public String getJsonstring() {
        return jsonstring;
    }

    public void setJsonstring(String jsonstring) {
        this.jsonstring = jsonstring;
    }
}

