package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.Main;
import be.howest.ti.project1.stratego.people.PeopleApplication;
import be.howest.ti.project1.stratego.stratego.*;
import be.howest.ti.project1.stratego.stratego.pawns.*;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

import java.util.Arrays;

class EndpointDispatcher {

    private PeopleApplication peopleApplication;
    private Stratego strategoApplication;
    private GameBoard gameboard;
    private Pawn pawnApplication;
    private Spy spyApplication;
    private Miner minerApplication;
    private TurnRequest turn;
    private TurnRequest turn2;
    private MessageRequest blueSetup;
    private MessageRequest redSetup;
    private MessageRequest nextTurn1;
    private MessageRequest nextTurn2;


    public EndpointDispatcher() {
        peopleApplication = new PeopleApplication();
        gameboard = new GameBoard();
        strategoApplication = new Stratego();
        turn = new TurnRequest();
        turn2 = new TurnRequest();
        blueSetup = new MessageRequest();
        redSetup = new MessageRequest();
        nextTurn1 = new MessageRequest();
        nextTurn2 = new MessageRequest();
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

        router.post("/api/stratego/gameMode").handler(BodyHandler.create()).handler(this::setGameMode);
        router.post("/api/stratego/bluePawns").handler(BodyHandler.create()).handler(this::setupBluePawns);
        router.post("/api/stratego/redPawns").handler(BodyHandler.create()).handler(this::setupRedPawns);

        router.post("/api/next1").handler(BodyHandler.create()).handler(this::addTurnFrom2);
        router.post("/api/next2").handler(BodyHandler.create()).handler(this::addTurnFrom1);
        router.get("/api/next1").handler(this::getTurnFor1);
        router.get("/api/next2").handler(this::getTurnFor2);

        router.get("/api/blueSetup").handler(this::getBlueSetup);
        router.get("/api/redSetup").handler(this::getRedSetup);

        router.post("/api/nextTurn1").handler(BodyHandler.create()).handler(this::nextTurnFrom2);
        router.post("/api/nextTurn2").handler(BodyHandler.create()).handler(this::nextTurnFrom1);
        router.get("/api/nextTurn1").handler(this::getNextTurnFor1);
        router.get("/api/nextTurn2").handler(this::getNextTurnFor2);
    }


    private void setDetails(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreatePersonRequest data = Json.decodeValue(body, CreatePersonRequest.class);
        routingContext.response().end("\"Welcome, " + data.getPerson().getName() + "\"");
    }

    private void setGameMode(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreateGameModeRequest gameMode = Json.decodeValue(body, CreateGameModeRequest.class);
        boolean success = strategoApplication.setGameMode(gameMode.getGameMode());
        if (success) {
            routingContext.response().end("\"setGameMode Successful\"");
        } else {
            routingContext.response().end("\"setGameMode failed\"");
        }

        routingContext.response().end("\"received: " + gameMode.getGameMode() + "\"");
    }

    private void setupRedPawns(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreateRedPawnRequest pawns = Json.decodeValue(body, CreateRedPawnRequest.class);
        System.out.println(pawns.getPawns());
        Main.main();
        String[] redPawnsArray = pawns.getPawns().split(",");
        redSetup.setData(Arrays.toString(redPawnsArray));
        System.out.println(Arrays.toString(redPawnsArray));
        int i = 0;
        int count = 0;
        for (int y = 0; y < 4; y++) {
            for (int j = 0; j < 10; j++, i++) {
                String pawn = redPawnsArray[i];
                switch (pawn) {
                    case "Spy":
                        Pawn spy = new Spy(2);
                        strategoApplication.placePawn(spy, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "Bomb":
                        Pawn bomb = new Bomb(2);
                        strategoApplication.placePawn(bomb, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "Flag":
                        Pawn flag = new Flag(2);
                        strategoApplication.placePawn(flag, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "2":
                        Pawn scout = new Scout(2);
                        strategoApplication.placePawn(scout, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "3":
                        Pawn miner = new Miner(2);
                        strategoApplication.placePawn(miner, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "4":
                        Pawn sergeant = new Sergeant(2);
                        strategoApplication.placePawn(sergeant, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "5":
                        Pawn lieutenant = new Lieutenant(2);
                        strategoApplication.placePawn(lieutenant, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "6":
                        Pawn captain = new Captain(2);
                        strategoApplication.placePawn(captain, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "7":
                        Pawn major = new Major(2);
                        strategoApplication.placePawn(major, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "8":
                        Pawn colonel = new Colonel(2);
                        strategoApplication.placePawn(colonel, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "9":
                        Pawn general = new General(2);
                        strategoApplication.placePawn(general, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "10":
                        Pawn marshall = new Marshall(2);
                        strategoApplication.placePawn(marshall, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                }
            }
        }
        System.out.println(strategoApplication.getGameBoard().toString());
        routingContext.response().end("\"received: " + pawns.getPawns() + "\"");
    }

    private void setupBluePawns(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        CreateBluePawnRequest pawns = Json.decodeValue(body, CreateBluePawnRequest.class);
        System.out.println(pawns.getPawns());
        String[] bluePawnsArray = pawns.getPawns().split(",");
        blueSetup.setData(Arrays.toString(bluePawnsArray));
        System.out.println(Arrays.toString(bluePawnsArray));
        int i = 0;
        int count = 0;
        for (int y = 6; y < 10; y++) {
            for (int j = 0; j < 10; j++, i++) {
                String pawn = bluePawnsArray[i];
                switch (pawn) {
                    case "Spy":
                        Pawn spy = new Spy(1);
                        strategoApplication.placePawn(spy, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "Bomb":
                        Pawn bomb = new Bomb(1);
                        strategoApplication.placePawn(bomb, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "Flag":
                        Pawn flag = new Flag(1);
                        strategoApplication.placePawn(flag, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "2":
                        Pawn scout = new Scout(1);
                        strategoApplication.placePawn(scout, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "3":
                        Pawn miner = new Miner(1);
                        strategoApplication.placePawn(miner, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "4":
                        Pawn sergeant = new Sergeant(1);
                        strategoApplication.placePawn(sergeant, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "5":
                        Pawn lieutenant = new Lieutenant(1);
                        strategoApplication.placePawn(lieutenant, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "6":
                        Pawn captain = new Captain(1);
                        strategoApplication.placePawn(captain, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "7":
                        Pawn major = new Major(1);
                        strategoApplication.placePawn(major, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "8":
                        Pawn colonel = new Colonel(1);
                        strategoApplication.placePawn(colonel, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "9":
                        Pawn general = new General(1);
                        strategoApplication.placePawn(general, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                    case "10":
                        Pawn marshall = new Marshall(1);
                        strategoApplication.placePawn(marshall, new Coordinates(j, y));
                        count++;
                        System.out.println(count);
                        break;
                }
            }
        }
        System.out.println(strategoApplication.getGameBoard().toString());
        routingContext.response().end("\"received: " + pawns.getPawns() + "\"");
    }

    private void addTurnFrom2(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        TurnRequest turnMessage = Json.decodeValue(body, TurnRequest.class);
        turn2.setData(turnMessage.getData());
        System.out.println(turn2.getData());
        routingContext.response().end("\"received: " + turn2.getData() + "\"");
    }

    private void addTurnFrom1(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        TurnRequest turnMessage = Json.decodeValue(body, TurnRequest.class);
        turn.setData(turnMessage.getData());
        System.out.println(turn.getData());
        routingContext.response().end("\"received: " + turn.getData() + "\"");
    }

    private void getTurnFor1(RoutingContext routingContext) {
        sendJson(routingContext.response(), turn2.getData());
    }

    private void getTurnFor2(RoutingContext routingContext) {
        sendJson(routingContext.response(), turn.getData());
    }

    private void getRedSetup(RoutingContext routingContext) {
        sendJson(routingContext.response(), redSetup.getData());
    }

    private void getBlueSetup(RoutingContext routingContext) {
        sendJson(routingContext.response(), blueSetup.getData());
    }

    private void nextTurnFrom1(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        MessageRequest data = Json.decodeValue(body, MessageRequest.class);
        nextTurn1.setData(data.getData());
        System.out.println(nextTurn1.getData());
        routingContext.response().end("\"received: " + nextTurn1.getData() + "\"");
    }

    private void nextTurnFrom2(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString();
        MessageRequest data = Json.decodeValue(body, MessageRequest.class);
        nextTurn2.setData(data.getData());
        System.out.println(nextTurn2.getData());
        routingContext.response().end("\"received: " + nextTurn2.getData() + "\"");
    }

    private void getNextTurnFor1(RoutingContext routingContext) {
        sendJson(routingContext.response(), nextTurn2.getData());
    }

    private void getNextTurnFor2(RoutingContext routingContext) {
        sendJson(routingContext.response(), nextTurn1.getData());
    }
}

