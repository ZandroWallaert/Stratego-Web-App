package be.howest.ti.project1.stratego.stratego;

import be.howest.ti.project1.stratego.stratego.pawns_stratego.Pawn;
import org.junit.Test;

import static org.junit.Assert.*;

public class MoveTest {

    @Test
    public void testEquals() {

        Player p1 = new Player("p1", 10);
        Player p2 = new Player("p2", 10);

        Pawn spy = new Pawn("spy", 1, 10, 10);
        Pawn spy2 = new Pawn("spy", 2, 10, 10);

        Coordinate start1 = new Coordinate(0, 0);
        Coordinate dest1 = new Coordinate(0, 8);

        Coordinate start2 = new Coordinate(0, 0);
        Coordinate dest2 = new Coordinate(0, 8);

        Coordinate start3 = new Coordinate(0, 8);
        Coordinate dest3 = new Coordinate(0, 0);

        Coordinate start4 = new Coordinate(0, 8);
        Coordinate dest4 = new Coordinate(1, 5);


        Move m1 = new Move(spy, start1, dest1);
        Move m2 = new Move(spy, start2, dest2);
        Move m3 = new Move(spy, start3, dest3);
        Move m4 = new Move(spy, start4, dest4);

        //Move (to and back)
        assertEquals(m1, m2);
        assertEquals(m1, m3);

        assertNotEquals(m1, m4);

        //Other player
        Move m5 = new Move(spy2, start1, dest1);

        assertNotEquals(m5, m1);


    }

}
