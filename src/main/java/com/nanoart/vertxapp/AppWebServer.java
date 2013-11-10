/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nanoart.vertxapp;


import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.platform.Verticle;
import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.VoidHandler;

public class AppWebServer extends Verticle {

  private static final String webroot = "webapp/";

  public void start() {
    vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
      public void handle(final HttpServerRequest req) {
        if (req.path().equals("/")) {
          req.response().sendFile(webroot + "index.html");
        }
		else if (req.path().equals("/doauth")){
			final Buffer body = new Buffer(0);
			req.dataHandler(new Handler<Buffer>() {
				public void handle(Buffer buffer) {
//					log.info('I received ' + buffer.length() + ' bytes');
					body.appendBuffer(buffer);
				}
			});		
			req.endHandler(new VoidHandler() {
				public void handle() {
                    String strContent = "The total body received was " + body.length() + " bytes";
                    req.response().end(strContent);
				  // The entire body has now been received
//				  log.info("The total body received was " + body.length() + " bytes");    
				}
			});
		
		}
		else {
          //Clearly in a real server you would check the path for better security!!
          req.response().sendFile(webroot + req.path());
        }
      }
    }).listen(8080);
  }
}