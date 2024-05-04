package edu.brown.cs.student.main.server;

import static spark.Spark.after;

import edu.brown.cs.student.main.server.Utils.CourseObject;
import edu.brown.cs.student.main.server.Utils.JSONParser;
import edu.brown.cs.student.main.server.handlers.AddCoursesHandler;
import edu.brown.cs.student.main.server.handlers.CalcDifficHandler;
import edu.brown.cs.student.main.server.handlers.GetCourseHandler;
import edu.brown.cs.student.main.server.handlers.RecCourseHandler;
import edu.brown.cs.student.main.server.storage.FirebaseUtilities;
import java.io.IOException;
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
    try {
      JSONParser courseCreator = new JSONParser();
      courseCreator.createCourses();
      CourseObject courseObject = courseCreator.getParsedJSON();
      // here we can update our course object with our calculated scores method
      FirebaseUtilities utils = new FirebaseUtilities();

      // creating handlers here
      Spark.get("", new CalcDifficHandler(courseObject));
      Spark.get("add-courses", new AddCoursesHandler(utils));
      Spark.get("recommend-courses", new RecCourseHandler(courseObject));
      Spark.get("get-course-object", new GetCourseHandler(courseObject));

      Spark.notFound(
          (request, response) -> {
            response.status(404); // Not Found
            System.out.println("ERROR");
            return "404 Not Found - The requested endpoint does not exist.";
          });
      Spark.init();
      Spark.awaitInitialization();

      System.out.println("Server started at http://localhost:" + port);
    } catch (IOException e) {
      e.printStackTrace();
      System.err.println(
          "Error: Could not initialize Firebase. Likely due to firebase_config.json not being found. Exiting.");
      System.exit(1);
    }
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
