package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns.Pawn;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Stratego {
    private Player player1;
    private Player player2;
    private Token token;
    private List<Move> moveHistory;
    private Board gameBoard;
    private GameMode gameMode;
    private PawnCollection pawns;


    public Stratego() {
        token = new Token();
        this.moveHistory = new ArrayList<>();
        this.gameBoard = new Board();
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

    public void setGameMode(GameMode gameMode) {
        this.gameMode = gameMode;
        this.pawns = new PawnCollection(gameMode);
    }

    public Token getToken() {
        return token;
    }

    public Board getGameBoard() {
        return gameBoard;
    }

    public List<Move> getMoveHistory() {
        return Collections.unmodifiableList(moveHistory);
    }


    public boolean placePawn(Pawn pawn, Coordinate position) {
        if (gameBoard.isValidPlacement(pawn, position)) {
            gameBoard.placePawn(pawn, position);
            this.gameBoard.placePawn(pawn, position);

            return true;


        } else {
            return false;
        }

    }


    public boolean movePawn(Coordinate startCo, Coordinate destCo) {
        if (this.gameBoard.isValidMove(startCo, destCo)) {
            Pawn currentPawn = gameBoard.getPawnOnPosition(startCo);
            int currentPlayer = currentPawn.getPlayer();
            if (madeMoveLessNthTimes(currentPlayer, currentPawn, startCo, destCo)) {
                addMove(new Move(currentPawn, startCo, destCo));
                return gameBoard.movePawn(startCo, destCo);
            }
        } else {
            return false;
        }
        return false;
    }


    public boolean madeMoveLessNthTimes(int player, Pawn pawn, Coordinate start, Coordinate dest) {

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

