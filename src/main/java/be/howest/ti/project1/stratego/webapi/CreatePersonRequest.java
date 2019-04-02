package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.people.Person;

class CreatePersonRequest {

    private String token;
    private Person person;

    public CreatePersonRequest() {
        // needed for vertx to create CreatePersonRequest from JSON.
    }


    public Person getPerson() {
        return person;
    }

    public String getToken() {
        return token;
    }
}
