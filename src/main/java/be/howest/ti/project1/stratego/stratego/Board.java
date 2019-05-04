package be.howest.ti.project1.stratego.stratego;


import be.howest.ti.project1.stratego.stratego.pawns_stratego.Pawn;

public class Board {

    private Pawn[][] gameBoard;

    public Board() {

        int boardSize = 10;
        this.gameBoard = new Pawn[boardSize][boardSize];

        for (int i = 0; i < boardSize; i++) {
            for (int j = 0; j < boardSize; j++) {
                setPosition(new Coordinate(j, i), null);
            }
        }
    }

    public Pawn[][] getGameBoard() {
        return gameBoard;
    }


    public Pawn getPawnOnPosition(int x, int y) {
        if (!isWater(x, y) && isInside(x, y)) {
            return this.gameBoard[y][x];
        }
        return null;
    }

    public Pawn getPawnOnPosition(Coordinate co) {
        return getPawnOnPosition(co.getX(), co.getY());
    }

    private void setPosition(Coordinate position, Pawn value) {
        this.gameBoard[position.getY()][position.getX()] = value;
    }


    public void placePawn(Pawn pawn, Coordinate co) {
        setPosition(co, pawn);
    }

    public boolean movePawn(Coordinate startCo, Coordinate destCo) {
        Pawn currentPawn = getPawnOnPosition(startCo);
        Pawn destination = getPawnOnPosition(destCo);

        if (destination == null) {
            setPosition(destCo, currentPawn);
            setPosition(startCo, null);
            return true;
        } else if (destination.getPlayer() == currentPawn.getPlayer()) {
            return false;
        } else {

            if (!currentPawn.getName().equals("infiltrator")) {
                setPosition(destCo, currentPawn.attack(destination));
                setPosition(startCo, null);
                return true;
            } else {
                //case pawn is infiltrator
            }
        }
        return false;
    }


    public boolean isWithinTravelDistance(Coordinate startCo, Coordinate destCo) {

        int startX = startCo.getX();
        int startY = startCo.getY();
        int destX = destCo.getX();
        int destY = destCo.getY();

        int maxTravelDist = getPawnOnPosition(startCo).getMaxTravelDistance();
        int distTraveled;
        if (startX == destX && startY == destY) {
            return false;
        } else if (startX == destX) {
            distTraveled = java.lang.Math.abs(destY - startY);
            return (maxTravelDist - distTraveled) >= 0;
        } else if (startY == destY) {
            distTraveled = java.lang.Math.abs(destX - startX);
            return (maxTravelDist - distTraveled) >= 0;
        }
        return false;

    }

    public boolean isValidPlacement(Pawn pawn, Coordinate co) {
        return (getPawnOnPosition(co) == null) &&
                isInside(co) &&
                getPawnOnPosition(co) == null &&
                !isWater(co) &&
                isCorrectSide(pawn, co.getY());
    }


    public boolean isValidMove(Coordinate startCo, Coordinate destCo) {
        return (getPawnOnPosition(startCo) != null) &&
                isMoveInsideOfBoard(startCo, destCo) &&
                !checkMoveOverWater(startCo, destCo) &&
                !checkMoveOverPawn(startCo, destCo) &&
                isWithinTravelDistance(startCo, destCo);

    }


    public boolean isMoveInsideOfBoard(Coordinate startCo, Coordinate destCo) {
        return isInside(startCo) && isInside(destCo);
    }


    public boolean isCorrectSide(Pawn pawn, int y) {

        int type = pawn.getPlayer();
        int boardLimit = getGameBoard().length;


        if (type == 1) {
            return 6 <= y && y < boardLimit;
        } else if (type == 2) {
            return 0 <= y && y <= 4;
        }
        return false;

    }

    public boolean isInside(int x, int y) {

        int boardLimit = getGameBoard().length;

        return (0 <= x && x < boardLimit) && (0 <= y && y < boardLimit);

    }

    public boolean isInside(Coordinate co) {
        return isInside(co.getX(), co.getY());
    }


    public boolean isWater(int x, int y) {
        if (4 <= y && y <= 5) {
            return (2 <= x && x <= 3) || (6 <= x && x <= 7);
        }
        return false;

    }

    public boolean isWater(Coordinate co) {
        return isWater(co.getX(), co.getY());
    }


    public boolean checkMoveOverWater(Coordinate startCo, Coordinate destCo) {

        int startX = startCo.getX();
        int startY = startCo.getY();
        int destX = destCo.getX();
        int destY = destCo.getY();

        if (startX == destX) {
            return movesVerticalOverWater(startX, Math.min(startY, destY), Math.max(startY, destY));
        } else if (startY == destY) {
            return movesHorizontalOverWater(Math.min(startX, destX), startY, Math.max(startX, destX));
        }
        return false;

    }

    public boolean checkMoveOverPawn(Coordinate startCo, Coordinate destCo) {

        int startX = startCo.getX();
        int startY = startCo.getY();
        int destX = destCo.getX();
        int destY = destCo.getY();

        if (startX == destX) {
            return movesVerticalOverPawn(startX, Math.min(startY, destY), Math.max(startY, destY));
        } else if (startY == destY) {
            return movesHorizontalOverPawn(Math.min(startX, destX), startY, Math.max(startX, destX));
        }
        return false;
    }


    public boolean movesVerticalOverWater(int startX, int startY, int destY) {
        for (int i = startY; i <= destY; i++) {
            if (isWater(startX, i)) {
                return true;
            }
        }
        return false;
    }

    public boolean movesHorizontalOverWater(int startX, int startY, int destX) {
        for (int i = startX; i <= destX; i++) {
            if (isWater(i, startY)) {
                return true;
            }
        }
        return false;
    }

    private boolean movesHorizontalOverPawn(int startX, int startY, int destY) {
        for (int i = startX + 1; i < destY; i++) {
            if (getPawnOnPosition(i, startY) != null) {
                return true;
            }
        }
        return false;
    }

    private boolean movesVerticalOverPawn(int x1, int y1, int y2) {
        for (int i = y1 + 1; i < y2; i++) {
            if (getPawnOnPosition(x1, i) != null) {
                return true;
            }
        }
        return false;
    }


    @Override
    public String toString() {

        StringBuilder res = new StringBuilder();

        for (int i = 0; i < this.gameBoard.length; i++) {
            for (int j = 0; j < this.gameBoard.length; j++) {
                if (isWater(j, i)) {
                    res.append("  w  ");
                } else {
                    res.append(gameBoard[i][j]).append(" ");
                }
            }
            res.append("\n\n");
        }

        return res.toString();
    }

}
