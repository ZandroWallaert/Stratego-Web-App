package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.stratego.Token;

public class StrategoApp {
    private String token;
    private String link;

    StrategoApp() {
    }

    StrategoApp(Token token, String link) {
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

