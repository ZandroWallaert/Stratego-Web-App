package be.howest.ti.project1.stratego.people;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class PeopleApplication {

    private Set<Player> people;

    public PeopleApplication() {
        people = new HashSet<>();

        people.add(new Player("Alice", "the-super-secret", 20));
        people.add(new Player("Bob", "the-super-secret", 30));
        people.add(new Player("Carol", "the-super-secret", 40));
    }

    public Set<Player> getPeople() {
        return Collections.unmodifiableSet(people);
    }

    public Player find(String expectedName) {
        for (Player person : people) {
            if (person.getNickname().equals(expectedName)) {
                return person;
            }
        }
        throw new IllegalArgumentException("No such person found.");
    }

    public void add(Player person) {
        boolean success = people.add(person);
        if (!success) {
            throw new IllegalArgumentException("Person already exists.");
        }
    }
}
