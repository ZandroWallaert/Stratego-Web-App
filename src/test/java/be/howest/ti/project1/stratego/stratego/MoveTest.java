package be.howest.ti.project1.stratego.stratego;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class MoveTest {

    @Test
    public void testEquals() {

        Pawn spy = new Pawn("spy", 1, 10, 10);
        Pawn spy2 = new Pawn("spy", 2, 10, 10);

        Coordinates start1 = new Coordinates(0, 0);
        Coordinates destination1 = new Coordinates(0, 3);

        Coordinates start2 = new Coordinates(0, 0);
        Coordinates destination2 = new Coordinates(0, 3);

        Coordinates start3 = new Coordinates(0, 3);
        Coordinates destination3 = new Coordinates(0, 0);

        Coordinates start4 = new Coordinates(0, 3);
        Coordinates destination4 = new Coordinates(1, 5);

        Move m1 = new Move(spy, start1, destination1);
        Move m2 = new Move(spy, start2, destination2);
        Move m3 = new Move(spy, start3, destination3);
        Move m4 = new Move(spy, start4, destination4);

        //Move
        assertEquals(m1, m2);
        assertEquals(m1, m3);
        assertNotEquals(m1, m4);

        //Other player
        Move m5 = new Move(spy2, start1, destination1);
        assertNotEquals(m5, m1);
    }
}

