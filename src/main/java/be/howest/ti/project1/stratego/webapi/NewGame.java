package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.stratego.Token;

public class NewGame {
    private String token;
    private String link;

    NewGame() {
    }

    NewGame(Token token, String link) {
        this.token = token.getMyToken();
        this.link = link;
    }

    public String getToken() {
        return token;
    }

    public String getLink() {
        return link;
    }
}

