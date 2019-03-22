package be.howest.ti.project1.stratego.people;

import org.junit.Test;

import static org.junit.Assert.*;

public class PersonTest {

    @Test
    public void testEqualPerson(){
        String alice = "Alice";

        Player theRealAlice = new Player(alice, "the-super-secret", 32);

        assertEquals(theRealAlice, theRealAlice);

        assertEquals(theRealAlice, new Player(alice, "the-super-secret", 32));
        assertEquals(new Player(alice, "the-super-secret", 32), new Player(alice, "the-super-secret", 23));
    }

    @Test
    public void testConstructor(){
        String alice = "Alice";
        assertEquals(alice, new Player(alice, "the-super-secret", 32).getNickname());
        assertEquals(32, new Player(alice, "the-super-secret", 32).getAge());
    }

}