package be.howest.ti.project1.stratego.stratego;

public class Player {
    private String name;
    private int age;
    private Token token;

    public Player() {
        token = new Token();
    }

    public Player(String name, int age) {
        token = new Token();
        setName(name);
        setAge(age);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Token getToken() {
        return token;
    }
}

