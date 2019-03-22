package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.people.Player;

class CreatePersonRequest {

    private String token;
    private Player person;

    public CreatePersonRequest() {
        // needed for vertx to create CreatePersonRequest from JSON.
    }


    public Player getPerson() {
        return person;
    }

    public String getToken() {
        return token;
    }
}
