package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.people.PeopleApplication;
import be.howest.ti.project1.stratego.stratego.Stratego;
import be.howest.ti.project1.stratego.stratego.pawns.Miner;
import be.howest.ti.project1.stratego.stratego.pawns.Pawn;
import be.howest.ti.project1.stratego.stratego.pawns.Spy;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;


import java.util.HashMap;
import java.util.Map;

class EndpointDispatcher {

    private PeopleApplication peopleApplication;
    private Stratego strategoApplication;
    private Pawn pawnApplication;
    private Spy spyApplication;
    private Miner minerApplication;

    public EndpointDispatcher() {
        peopleApplication = new PeopleApplication();
        strategoApplication = new Stratego();
    }

    private void sendJson(HttpServerResponse res, Object object) {
        res.putHeader("Content-Type", "peopleApplication/json; charset=utf-8")
                .end(Json.encodePrettily(object));
    }

    private void getPeople(RoutingContext routingContext) {
        sendJson(
                routingContext.response(),
                peopleApplication.getPeople()
        );
    }

    private void getPerson(RoutingContext routingContext) {
        String expectedName = routingContext.request().getParam("name");
        sendJson(
                routingContext.response(),
                peopleApplication.find(expectedName) // can fail !!!
        );
    }

    private void addPerson(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString(); // we know this will only be called when the method is POST
        CreatePersonRequest req = Json.decodeValue(body, CreatePersonRequest.class);


        if (req.getToken().equals("the-super-secret")) { // we only accept request where the 'token' is correct
            try {
                peopleApplication.add(req.getPerson());
                sendJson(routingContext.response()
                        .setStatusCode(201), "Person added.");
            } catch (IllegalArgumentException ex) {
                sendJson(routingContext.response()
                        .setStatusCode(409), "Person already exists!");
            }
        } else {
            sendJson(routingContext.response()
                    .setStatusCode(401), "Invalid token!");
        }
    }

    void installRoutes(Router router) {
        router.get("/api/person").handler(this::getPeople);
        router.get("/api/person/:name").handler(this::getPerson);
        router.post("/api/person").handler(BodyHandler.create()).handler(this::addPerson);
        router.post("/api/details").handler(BodyHandler.create()).handler(this::setDetails);

        router.post("/api/stratego/gameMode").handler(BodyHandler.create()).handler(this::setGamemode);
        router.post("/api/stratego/bluePawns").handler(BodyHandler.create()).handler(this::setupBluePawns);
        router.post("/api/stratego/redPawns").handler(BodyHandler.create()).handler(this::setupRedPawns);
    }

    private void setDetails(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreatePersonRequest data = Json.decodeValue(body, CreatePersonRequest.class);
        System.out.println(data.getPerson().getName());
        routingContext.response().end("\"Welcome, " + data.getPerson().getName() + "\"");

    }

    private void setGamemode(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreateGameModeRequest gamemode = Json.decodeValue(body, CreateGameModeRequest.class);
        boolean succes = strategoApplication.setGameMode(gamemode.getGameMode());
        if (succes) {
            routingContext.response().end("\"setGamemode Successful\"");
        } else {
            routingContext.response().end("\"setGamemode failed\"");
        }

        routingContext.response().end("\"received: " + gamemode.getGameMode() + "\"");
    }

    private void setupBluePawns(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreateBluePawnRequest pawns = Json.decodeValue(body, CreateBluePawnRequest.class);
        System.out.println(pawns.getPawns());
        routingContext.response().end("\"received: " + pawns.getPawns() + "\"");
    }

    private void setupRedPawns(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreateRedPawnRequest pawns = Json.decodeValue(body, CreateRedPawnRequest.class);
        System.out.println(pawns.getPawns());
        routingContext.response().end("\"received: " + pawns.getPawns() + "\"");
    }
}

