package be.howest.ti.project1.stratego.people;

// original --> person.java
public class Player {
    private String nickname;
    private String token;
    private int age;
    protected Pieces piece;

    public Player() {
        // needed for vertx to create person from JSON.
    }

    public Player(String nickname, String token, int age) {
        this.nickname = nickname;
        this.token = token;
        this.age = age;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Player person = (Player) o;

        return nickname.equals(person.nickname);
    }

    @Override
    public int hashCode() {
        return nickname.hashCode();
    }

}

