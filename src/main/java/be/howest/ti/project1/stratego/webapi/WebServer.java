package be.howest.ti.project1.stratego.webapi;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;

import java.util.logging.Level;
import java.util.logging.Logger;


public class WebServer extends AbstractVerticle {

    @Override
    public void start() {
        final HttpServer server = vertx.createHttpServer();
        final Router router = Router.router(vertx);
        final EndpointDispatcher dispatcher = new EndpointDispatcher();

        // see: https://vertx.io/blog/some-rest-with-vert-x


        // Send IllegalArgument and IllegalStateException as json in response
        router.route().failureHandler(this::handleException);

        dispatcher.installRoutes(router);

        // Serve all files in resources/webroot as static files
        router.route("/*").handler(StaticHandler.create());


        // Start Server at port 8025
        server.requestHandler(router).listen(8025);

    }

    private static final Logger LOGGER = Logger.getLogger(WebServer.class.getSimpleName());

    private void handleException(RoutingContext routingContext) {
        Throwable failure = routingContext.failure();
        if (
                failure instanceof IllegalArgumentException ||
                        failure instanceof IllegalStateException
        ) {
            routingContext
                    .response()
                    .setStatusCode(403)
                    .putHeader("Content-Type", "application/json; charset=utf-8")
                    .end(Json.encodePrettily(failure));
        } else {
            LOGGER.log(Level.SEVERE, "unhandled exception", failure);
            routingContext.next();
        }
    }
}

