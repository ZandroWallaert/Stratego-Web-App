package be.howest.ti.project1.stratego.people;

import java.util.List;

public class GameManager {
    private List<Game> gamesCount;

    public void addGame(Game g) {
        gamesCount.add(g);
    }

    public void setGame(int id, Game g) {
        if (id != 0 && g != null) {
            gamesCount.set(id, g);
        } else {
            throw new IllegalArgumentException("Game not set");
        }
    }

    public void deleteGame(int id) {
        gamesCount.remove(id);
    }
}

