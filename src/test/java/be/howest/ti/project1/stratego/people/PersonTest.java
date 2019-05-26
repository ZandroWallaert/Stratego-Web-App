package be.howest.ti.project1.stratego.people;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class PersonTest {

    @Test
    public void testEqualPerson() {
        String alice = "Alice";

        Person theRealAlice = new Person(alice, 32);

        assertEquals(theRealAlice, theRealAlice);

        assertEquals(theRealAlice, new Person(alice, 32));
        assertEquals(new Person(alice, 32), new Person(alice, 23));
    }

    @Test
    public void testConstructor() {
        String alice = "Alice";
        assertEquals(alice, new Person(alice, 32).getName());
        assertEquals(32, new Person(alice, 32).getAge());
    }

}
