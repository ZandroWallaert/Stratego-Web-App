package be.howest.ti.project1.stratego.people;

import org.junit.Test;

import static org.junit.Assert.*;

public class PeopleApplicationTest {


    @Test
    public void getPeople() {
        PeopleApplication app = new PeopleApplication();
        assertEquals(3, app.getPeople().size());
    }

    @Test
    public void find() {
        PeopleApplication app = new PeopleApplication();

        Person p = app.find("Bob");
        assertEquals("Bob", p.getName());

        try {
            app.find("Eve");
            fail();
        } catch (IllegalArgumentException ex) {
            // expected
        }

    }

    @Test
    public void add() {
        PeopleApplication app = new PeopleApplication();

        Person david = new Person("David", 23);
        int old = app.getPeople().size();
        app.add(david);
        assertEquals(old+1, app.getPeople().size());

        try {
            Person alice = new Person("Alice", 23);
            app.add(alice);
            fail();
        } catch (IllegalArgumentException ex) {
            // expected
            assertEquals(old+1, app.getPeople().size());
        }


    }
}