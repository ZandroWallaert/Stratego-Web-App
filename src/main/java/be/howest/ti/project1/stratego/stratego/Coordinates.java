package be.howest.ti.project1.stratego.stratego;

import java.util.Objects;

public class Coordinates {
    private int x;
    private int y;

    public Coordinates(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Coordinates)) return false;
        Coordinates that = (Coordinates) obj;
        return getX() == that.getX() &&
                getY() == that.getY();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getX(), getY());
    }

    @Override
    public String toString() {
        return this.x + "-" + this.y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}

