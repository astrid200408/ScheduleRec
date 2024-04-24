package edu.brown.cs.student.main.server;

import static spark.Spark.after;

import spark.Spark;

/** Top Level class for our project, utilizes spark to create and maintain our server. */
public class Server {

  public static void setUpServer() {
    int port = 3232;
    Spark.port(port);

    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
          response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        });

    // StorageInterface firebaseUtils;
    // try {
    // firebaseUtils = new FirebaseUtilities();

    // Spark.get("add-pin", new AddPin(firebaseUtils));
    // Spark.get("list-pins", new ListPinsHandler(firebaseUtils));
    // Spark.get("clear-user", new ClearUserHandler(firebaseUtils));
    // JSONParser parser = new JSONParser();
    // parser.createGeoJson();
    // Spark.get("bounding-box", new BoundingBoxHandler(parser.parsedJSON));
    // Spark.get("search", new SearchHandler(parser.parsedJSON));

    Spark.notFound(
        (request, response) -> {
          response.status(404); // Not Found
          System.out.println("ERROR");
          return "404 Not Found - The requested endpoint does not exist.";
        });
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
    // }
    // catch (IOException e) {
    //   e.printStackTrace();
    //   System.err.println(
    //       "Error: Could not initialize Firebase. Likely due to firebase_config.json not being
    // found. Exiting.");
    //   System.exit(1);
    // }
  }

  /**
   * Runs Server.
   *
   * @param args none
   */
  public static void main(String[] args) {
    setUpServer();
  }
}
