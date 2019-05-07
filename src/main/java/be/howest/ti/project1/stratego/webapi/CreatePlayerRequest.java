package be.howest.ti.project1.stratego.webapi;

class CreatePlayerRequest {

    private String name;
    private int age;
    private int player;

    public CreatePlayerRequest() {
        // needed for vertx to create CreatePersonRequest from JSON.
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public int getPlayer() {
        return player;
    }
}
