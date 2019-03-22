package be.howest.ti.project1.stratego.people;

import org.junit.Test;

import static org.junit.Assert.*;

public class PeopleApplicationTest {


    @Test
    public void getPeople() {
        PlayerApplication app = new PlayerApplication();
        assertEquals(3, app.getPeople().size());
    }

    @Test
    public void find() {
        PlayerApplication app = new PlayerApplication();

        Player p = app.find("Bob");
        assertEquals("Bob", p.getNickname());

        try {
            app.find("Eve");
            fail();
        } catch (IllegalArgumentException ex) {
            // expected
        }

    }

    @Test
    public void add() {
        PlayerApplication app = new PlayerApplication();

        Player david = new Player("David", "the-super-secret", 23);
        int old = app.getPeople().size();
        app.add(david);
        assertEquals(old+1, app.getPeople().size());

        try {
            Player alice = new Player("Alice", "the-super-secret", 23);
            app.add(alice);
            fail();
        } catch (IllegalArgumentException ex) {
            // expected
            assertEquals(old+1, app.getPeople().size());
        }


    }
}