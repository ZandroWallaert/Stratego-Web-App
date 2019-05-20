package be.howest.ti.project1.stratego.stratego;

import java.util.ArrayList;
import java.util.List;

public class SetupPawns {
    static List<String> pawnsList = new ArrayList<String>();

    public static List<String> getPawns() {
        return pawnsList;
    }

    public static void addToList(String pawns) {
        pawnsList.add(pawns);
    }
}
