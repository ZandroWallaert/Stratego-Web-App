package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.stratego.GameMode;
import be.howest.ti.project1.stratego.stratego.Player;
import be.howest.ti.project1.stratego.stratego.Stratego;
import be.howest.ti.project1.stratego.stratego.Token;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import org.pmw.tinylog.Logger;

import java.util.*;


class Controller {
    private Map<Token, Stratego> games;
    private int counter;

    Controller() {
        games = new HashMap<>();
        counter = 0;
    }

    private void sendJson(HttpServerResponse res, Object object) {
        res.putHeader("Content-Type", "application/json; charset=utf-8")
                .end(Json.encodePrettily(object));
    }

    void installRoutes(Router router) {
        //get
        router.get("/api/games/new").handler(this::gameManager);
        router.get("/assets/json/gameModes").handler(this::loadGameModes);

        //post
        router.post("/api/games").handler(this::gameManager);

        //put
        router.put("/api/games/:gameToken/gamemode").handler(BodyHandler.create()).handler(this::setGameMode);

        //patch
        router.patch("/api/games/:gameToken/players").handler(BodyHandler.create()).handler(this::patchPlayer);
    }

    private void patchPlayer(RoutingContext routingContext) {

        String body = routingContext.getBodyAsString();
        CreatePlayerRequest req = Json.decodeValue(body, CreatePlayerRequest.class);

        Token gametoken = new Token(routingContext.request().getParam("gameToken"));

        if (games.containsKey(gametoken)) {
            processOngoingGame(routingContext, req, gametoken);
        } else {
            sendJson(routingContext.response()
                    .setStatusCode(401), "game token incorrect");
        }
    }

    private void processOngoingGame(RoutingContext routingContext, CreatePlayerRequest req, Token gametoken) {
        Stratego game = games.get(gametoken);
        int player = req.getPlayer();

        if (player == 1 || player == 2) {
            processPlayer(routingContext, req, gametoken, game, player);
        } else {
            sendJson(routingContext.response()
                    .setStatusCode(400), String.format("Player %d does not exist", player));
        }
    }

    private void processPlayer(RoutingContext routingContext, CreatePlayerRequest req, Token gametoken, Stratego game, int player) {
        if (game.getPlayer(player) != null) {
            game.setPlayer(player, new Player(req.getName(), req.getAge()));
            sendJson(routingContext.response()
                    .setStatusCode(201), game.getPlayer(player));

            Logger.info(String.format("Player %d has been set for game %s", player, gametoken));
        } else {
            sendJson(routingContext.response()
                    .setStatusCode(405), String.format("Player %d is already set", player));
        }
    }

    private void setGameMode(RoutingContext routingContext) {
        Token gameToken = new Token(routingContext.request().getParam("gameToken"));
        String body = routingContext.getBodyAsString();
        CreateGameModeRequest gameMode = Json.decodeValue(body, CreateGameModeRequest.class);

        controlGameToken(routingContext, gameToken);

        if (games.get(gameToken).getGameMode() != null) {
            sendJson(routingContext.response()
                    .setStatusCode(405), "Game mode already set");
        } else {
            GameMode converted = string2GameMode(gameMode.getGameMode());
            if (converted == null) {
                sendJson(routingContext.response()
                        .setStatusCode(400), "this game mode doesn't exist");
            } else {
                games.get(gameToken).setGameMode(converted);
                Logger.info(games.get(gameToken).getGameMode());
                sendJson(routingContext.response()
                        .setStatusCode(201), "game mode set to " + gameMode);
            }
        }


    }

    private void controlGameToken(RoutingContext routingContext, Token token) {
        if (!games.containsKey(token)) {
            sendJson(routingContext.response()
                    .setStatusCode(401), "Game token incorrect");
        }

    }

    private GameMode string2GameMode(String string) {
        switch (string) {
            case "classic":
                return GameMode.CLASSIC;

            case "duel":
                return GameMode.DUEL;

            case "infiltrator":
                return GameMode.INFILTRATOR;

            default:
                return null;
        }
    }

    private void gameManager(RoutingContext routingContext) {
        counter += 1;
        if (counter % 2 == 1) {
            Stratego newGame = new Stratego();
            games.put(newGame.getToken(), newGame);

            Logger.info(newGame.getToken());

            NewGame jsonBody = new NewGame(newGame.getToken(), "gameModes.html");

            sendJson(routingContext.response()
                    .setStatusCode(201), jsonBody);
        } else {
            for (Stratego game : games.values()) {
                if (game.getPlayer2() == null) {
                    game.setPlayer2(new Player());

                    Logger.info(game.getToken());

                    NewGame jsonBody = new NewGame(game.getToken(), "joinRandomGame.html");

                    sendJson(routingContext.response()
                            .setStatusCode(200), jsonBody);
                }
            }
        }
    }

    private void loadGameModes(RoutingContext routingContext) {

        Set<GameMode> jsonBody = new HashSet<>(Arrays.asList(GameMode.values()));
        sendJson(routingContext.response().setStatusCode(200), jsonBody);
    }
}

