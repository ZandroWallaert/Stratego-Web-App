package be.howest.ti.project1.stratego.stratego;


import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertFalse;


public class TokenTest {

    @Test
    public void tokenGenerating() {
        Set<Token> tokens = new HashSet<>();
        for (int i = 0; i < 100; i++) {
            Token newToken = new Token();
            assertFalse(tokens.contains(newToken));
            tokens.add(newToken);
        }
    }
}
