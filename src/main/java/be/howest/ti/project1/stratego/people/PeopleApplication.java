package be.howest.ti.project1.stratego.people;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class PeopleApplication {

    private Set<Person> people;

    public PeopleApplication() {
        people = new HashSet<>();

        people.add(new Person("Alice", 20));
        people.add(new Person("Bob", 30));
        people.add(new Person("Carol", 40));
    }

    public Set<Person> getPeople() {
        return Collections.unmodifiableSet(people);
    }

    public Person find(String expectedName) {
        for (Person person : people) {
            if (person.getName().equals(expectedName)) {
                return person;
            }
        }
        throw new IllegalArgumentException("No such person found.");
    }

    public void add(Person person) {
        boolean success = people.add(person);
        if (!success) {
            throw new IllegalArgumentException("Person already exists.");
        }
    }
}
