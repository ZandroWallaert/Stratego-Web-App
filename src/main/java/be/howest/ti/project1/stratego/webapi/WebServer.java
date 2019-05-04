package be.howest.ti.project1.stratego.webapi;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;


public class WebServer extends AbstractVerticle {

    @Override
    public void start() {
        final HttpServer server = vertx.createHttpServer();
        final Router router = Router.router(vertx);
        final EndpointDispatcher dispatcher = new EndpointDispatcher();
        final Controller controller = new Controller();

        // see: https://vertx.io/blog/some-rest-with-vert-x


        // Send IllegalArgument and IllegalStateException as json in response
        router.route().failureHandler(this::handleException);

        dispatcher.installRoutes(router);
        controller.installRoutes(router);

        // Serve all files in resources/webroot as static files
        router.route("/*").handler(StaticHandler.create());


        // Start Server at port 8000
        server.requestHandler(router).listen(8025);

    }

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
            routingContext.next();
        }
    }


}

