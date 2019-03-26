package be.howest.ti.project1.stratego.people;

import org.junit.Assert;
import org.junit.Test;

public class PersonTest {

    @Test
    public void testEqualPerson(){
        String alice = "Alice";

        Player theRealAlice = new Player(alice, "the-super-secret", 32);

        Assert.assertEquals(theRealAlice, theRealAlice);

        Assert.assertEquals(theRealAlice, new Player(alice, "the-super-secret", 32));
        Assert.assertEquals(new Player(alice, "the-super-secret", 32), new Player(alice, "the-super-secret", 23));
    }

    @Test
    public void testConstructor(){
        String alice = "Alice";
        Assert.assertEquals(alice, new Player(alice, "the-super-secret", 32).getNickname());
        Assert.assertEquals(32, new Player(alice, "the-super-secret", 32).getAge());
    }

}