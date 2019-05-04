package be.howest.ti.project1.stratego.webapi;

import be.howest.ti.project1.stratego.people.PeopleApplication;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

class EndpointDispatcher {

    private PeopleApplication application;

    EndpointDispatcher() {
        application = new PeopleApplication();
    }

    private void sendJson(HttpServerResponse res, Object object) {
        res.putHeader("Content-Type", "application/json; charset=utf-8")
            .end(Json.encodePrettily(object));
    }

    private void getPeople(RoutingContext routingContext) {
        sendJson(
            routingContext.response(),
            application.getPeople()
        );
    }

    private void getPerson(RoutingContext routingContext) {
        String expectedName = routingContext.request().getParam("name");
        sendJson(
            routingContext.response(),
            application.find(expectedName) // can fail !!!
        );
    }

    private void addPerson(RoutingContext routingContext) {
        String body = routingContext.getBodyAsString(); // we know this will only be called when the method is POST
        CreatePersonRequest req = Json.decodeValue(body, CreatePersonRequest.class);

        if (req.getToken().equals("the-super-secret")) { // we only accept request where the 'token' is correct
            try {
                application.add(req.getPerson());
                sendJson(routingContext.response()
                    .setStatusCode(201), "person added");
            } catch (IllegalArgumentException ex) {
                sendJson(routingContext.response()
                    .setStatusCode(409), "person already exists");
            }
        } else {
            sendJson(routingContext.response()
                .setStatusCode(401),"invalid token");
        }
    }

    void installRoutes(Router router) {
        router.get("/api/person").handler(this::getPeople);
        router.get("/api/person/:name").handler(this::getPerson);
        router.post("/api/person").handler(BodyHandler.create()).handler(this::addPerson);
    }
}

