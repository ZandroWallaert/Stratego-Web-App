package be.howest.ti.project1.stratego.stratego;

import java.util.HashSet;
import java.util.Objects;
import java.util.Random;
import java.util.Set;

public class Token {
    private static Set<String> used = new HashSet<>();
    private String myToken;

    public Token(String myToken) {
        this.myToken = myToken;
    }

    public Token() {
        StringBuilder res = new StringBuilder();
        Random random = new java.util.Random();
        String validCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        while (used.contains(res.toString()) || res.toString().equals("")) {
            res.setLength(0);
            for (int i = 0; i < 12; i++) {
                res.append(validCharacters.charAt(random.nextInt(validCharacters.length())));
            }
        }
        used.add(res.toString());
        myToken = res.toString();
    }

    public String getMyToken() {
        return myToken;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Token token1 = (Token) obj;
        return Objects.equals(myToken, token1.myToken);
    }

    @Override
    public int hashCode() {
        return Objects.hash(myToken);
    }

    @Override
    public String toString() {
        return myToken;
    }
}

