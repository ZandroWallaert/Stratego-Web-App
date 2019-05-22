package be.howest.ti.project1.stratego.stratego;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Stratego {
    private Player player1;
    private Player player2;
    private Token token;
    private PawnCollection pawns;
    private List<Move> moveHistory;
    private GameBoard gameBoard;
    private GameMode gameMode;


    public Stratego() {
        token = new Token();
        this.moveHistory = new ArrayList<>();
        this.gameBoard = new GameBoard();
        this.player1 = new Player();
        this.gameMode = null;
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

    public Player getPlayer(int playerNr) {
        if (playerNr == 1) {
            return getPlayer1();
        } else if (playerNr == 2) {
            return getPlayer2();
        }
        return null;
    }

    public void setPlayer(int playerNr, Player player) {
        if (playerNr == 1) {
            setPlayer1(player);
        } else if (playerNr == 2) {
            setPlayer2(player);
        }
    }

    public PawnCollection getPawns() {
        return pawns;
    }

    public void setPawns(PawnCollection pawns) {
        this.pawns = pawns;
    }

    public GameMode getGameMode() {
        return gameMode;
    }

    public boolean setGameMode(String gameMode) {
        switch (gameMode) {
            case "classic":
                this.gameMode = GameMode.CLASSIC;
                this.pawns = new PawnCollection(GameMode.CLASSIC);
                return true;

            case "duel":
                this.gameMode = GameMode.DUEL;
                this.pawns = new PawnCollection(GameMode.DUEL);
                return true;

            case "infiltrator":
                this.gameMode = GameMode.INFILTRATOR;
                this.pawns = new PawnCollection(GameMode.INFILTRATOR);
                return true;

            case "airborn":
                this.gameMode = GameMode.AIRBORNE;
                this.pawns = new PawnCollection(GameMode.AIRBORNE);
                return true;
            default:
                return false;
        }
    }

    public Token getToken() {
        return token;
    }

    public GameBoard getGameBoard() {
        return gameBoard;
    }

    public List<Move> getMoveHistory() {
        return Collections.unmodifiableList(moveHistory);
    }

    public boolean placePawn(Pawn pawn, Coordinates position) {
        if (gameBoard.isValidPlacement(pawn, position)) {
            gameBoard.placePawnOnPosition(pawn, position);
            this.gameBoard.placePawnOnPosition(pawn, position);
            return true;
        } else {
            return false;
        }
    }

    public boolean movePawn(Coordinates startCo, Coordinates destCo) {
        if (this.gameBoard.isValidMove(startCo, destCo)) {
            Pawn currentPawn = gameBoard.getPawnOnPosition(startCo);
            int currentPlayer = currentPawn.getPlayer();
            if (madeMoveLessNthTimes(currentPlayer, currentPawn, startCo, destCo)) {
                addMove(new Move(currentPawn, startCo, destCo));
                return gameBoard.movePawnTo(startCo, destCo);
            }
        } else {
            return false;
        }
        return false;
    }


    public boolean madeMoveLessNthTimes(int player, Pawn pawn, Coordinates start, Coordinates dest) {
        int historySize = 3;
        List<Move> history = getLatestHistoryMoves(player, historySize);

        if (history.size() >= historySize) {
            for (Move move : history) {
                if (!move.equals(new Move(pawn, start, dest))) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    public void addMove(Move move) {
        this.moveHistory.add(move);
    }

    private List<Move> getLatestHistoryMoves(int player, int amount) {

        int historySize = this.moveHistory.size();

        if (historySize < (amount * 2)) {
            return this.moveHistory;
        } else {
            List<Move> history = new ArrayList<>();
            for (int i = historySize - amount; i < historySize; i++) {
                if (player == (this.moveHistory.get(i).getPawn().getPlayer())) {
                    history.add(this.moveHistory.get(i));
                }
            }
            return Collections.unmodifiableList(history);
        }
    }
}

