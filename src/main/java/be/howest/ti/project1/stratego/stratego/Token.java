package be.howest.ti.project1.stratego.stratego;

import java.util.HashSet;
import java.util.Objects;
import java.util.Random;
import java.util.Set;

public class Token {
    private static Set<String> inUse = new HashSet<>();
    private String myToken;

    public Token(String myToken) {
        this.myToken = myToken;
    }

    public Token() {
        StringBuilder res = new StringBuilder();
        Random rnd = new Random();
        String validChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        while (inUse.contains(res.toString()) || res.toString().equals("")) {
            res.setLength(0);
            for (int i = 0; i < 12; i++) {
                res.append(validChar.charAt(rnd.nextInt(validChar.length())));
            }
        }
        inUse.add(res.toString());
        myToken = res.toString();
    }

    public String getMyToken() {
        return myToken;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Token token1 = (Token) o;
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

