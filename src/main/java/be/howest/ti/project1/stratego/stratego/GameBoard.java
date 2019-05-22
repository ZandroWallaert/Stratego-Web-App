package be.howest.ti.project1.stratego.stratego;


public class Gameboard {
    private Pawn[][] gameboard;

    public Gameboard() {
        int boardSize = 10;
        this.gameboard = new Pawn[boardSize][boardSize];
        for (int i = 0; i < boardSize; i++) {
            for (int j = 0; j < boardSize; j++) {
                setPosition(new Coordinates(j, i), null);
            }
        }
    }

    public Pawn[][] getGameboard() {
        return gameboard;
    }

    public Pawn getPawnOnPosition(int x, int y) {
        if (!isWater(x, y) && isInsideBoard(x, y)) {
            return this.gameboard[y][x];
        }
        return null;
    }

    public Pawn getPawnOnPosition(Coordinates co) {
        return getPawnOnPosition(co.getX(), co.getY());
    }

    private void setPosition(Coordinates position, Pawn value) {
        this.gameboard[position.getY()][position.getX()] = value;
    }

    public void placePawnOnPosition(Pawn pawn, Coordinates co) {
        setPosition(co, pawn);
    }

    public boolean movePawnTo(Coordinates startCoordinate, Coordinates destCoordinate) {
        Pawn currentPawn = getPawnOnPosition(startCoordinate);
        Pawn destination = getPawnOnPosition(destCoordinate);
        if (destination == null) {
            setPosition(destCoordinate, currentPawn);
            setPosition(startCoordinate, null);
            return true;
        } else if (destination.getPlayer() == currentPawn.getPlayer()) {
            return false;
        } else {
            if (!currentPawn.getName().equals("infiltrator")) {
                setPosition(destCoordinate, currentPawn.attack(destination));
                setPosition(startCoordinate, null);
                return true;
            }
        }
        return false;
    }

    public boolean isWithinRange(Coordinates startCoordinate, Coordinates destCoordinate) {
        int startX = startCoordinate.getX();
        int startY = startCoordinate.getY();
        int destinationX = destCoordinate.getX();
        int destinationY = destCoordinate.getY();
        int maxRangeDistance = getPawnOnPosition(startCoordinate).getMaxRangeDistance();
        int rangeTraveled;
        if (startX == destinationX && startY == destinationY) {
            return false;
        } else if (startX == destinationX) {
            rangeTraveled = java.lang.Math.abs(destinationY - startY);
            return (maxRangeDistance - rangeTraveled) >= 0;
        } else if (startY == destinationY) {
            rangeTraveled = java.lang.Math.abs(destinationX - startX);
            return (maxRangeDistance - rangeTraveled) >= 0;
        }
        return false;
    }

    public boolean isValidPlacement(Pawn pawn, Coordinates coordinates) {
        return (getPawnOnPosition(coordinates) == null) &&
                isInsideBoard(coordinates) &&
                getPawnOnPosition(coordinates) == null &&
                !isWater(coordinates) &&
                isCorrectSideOfBoard(pawn, coordinates.getY());
    }

    public boolean isValidMove(Coordinates startCoordinate, Coordinates destCoordinate) {
        return (getPawnOnPosition(startCoordinate) != null) &&
                isMoveInsideOfBoard(startCoordinate, destCoordinate) &&
                !checkIsMoveOverWater(startCoordinate, destCoordinate) &&
                !checkIsMoveOverPawn(startCoordinate, destCoordinate) &&
                isWithinRange(startCoordinate, destCoordinate);
    }

    public boolean isMoveInsideOfBoard(Coordinates startCoordinate, Coordinates destinationCoordinate) {
        return isInsideBoard(startCoordinate) && isInsideBoard(destinationCoordinate);
    }

    public boolean isCorrectSideOfBoard(Pawn pawn, int y) {
        int type = pawn.getPlayer();
        int boardLimit = getGameboard().length;
        if (type == 1) {
            return 6 <= y && y < boardLimit;
        } else if (type == 2) {
            return 0 <= y && y <= 4;
        }
        return false;
    }

    public boolean isInsideBoard(int x, int y) {
        int boardLimit = getGameboard().length;
        return (0 <= x && x < boardLimit) && (0 <= y && y < boardLimit);
    }

    public boolean isInsideBoard(Coordinates coordinates) {
        return isInsideBoard(coordinates.getX(), coordinates.getY());
    }

    public boolean isWater(int x, int y) {
        if (4 <= y && y <= 5) {
            return (2 <= x && x <= 3) || (6 <= x && x <= 7);
        }
        return false;
    }

    public boolean isWater(Coordinates coordinates) {
        return isWater(coordinates.getX(), coordinates.getY());
    }

    public boolean checkIsMoveOverWater(Coordinates startCoordinate, Coordinates destCoordinate) {
        int startX = startCoordinate.getX();
        int startY = startCoordinate.getY();
        int destinationX = destCoordinate.getX();
        int destinationY = destCoordinate.getY();
        if (startX == destinationX) {
            return movesYOverWater(startX, Math.min(startY, destinationY), Math.max(startY, destinationY));
        } else if (startY == destinationY) {
            return movesXOverWater(Math.min(startX, destinationX), startY, Math.max(startX, destinationX));
        }
        return false;
    }

    public boolean checkIsMoveOverPawn(Coordinates startCoordinate, Coordinates destCoordinate) {
        int startX = startCoordinate.getX();
        int startY = startCoordinate.getY();
        int destinationX = destCoordinate.getX();
        int destinationY = destCoordinate.getY();
        if (startX == destinationX) {
            return movesYOverPawn(startX, Math.min(startY, destinationY), Math.max(startY, destinationY));
        } else if (startY == destinationY) {
            return movesXOverPawn(Math.min(startX, destinationX), startY, Math.max(startX, destinationX));
        }
        return false;
    }

    public boolean movesYOverWater(int startX, int startY, int destinationY) {
        for (int i = startY; i <= destinationY; i++) {
            if (isWater(startX, i)) {
                return true;
            }
        }
        return false;
    }

    public boolean movesXOverWater(int startX, int startY, int destinationX) {
        for (int i = startX; i <= destinationX; i++) {
            if (isWater(i, startY)) {
                return true;
            }
        }
        return false;
    }

    private boolean movesXOverPawn(int startX, int startY, int destinationX) {
        for (int i = startX + 1; i < destinationX; i++) {
            if (getPawnOnPosition(i, startY) != null) {
                return true;
            }
        }
        return false;
    }

    private boolean movesYOverPawn(int x1, int y1, int y2) {
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
        for (int i = 0; i < this.gameboard.length; i++) {
            for (int j = 0; j < this.gameboard.length; j++) {
                if (isWater(j, i)) {
                    res.append(" Water ");
                } else {
                    res.append(gameboard[i][j]).append(" ");
                }
            }
            res.append("\n\n");
        }
        return res.toString();
    }
}

