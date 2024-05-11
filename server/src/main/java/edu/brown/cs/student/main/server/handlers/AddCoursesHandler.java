package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.Utils.moshiAdapter;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/** This class adds a current schedule to a user's database file to retrieve later */
public class AddCoursesHandler implements Route {

  public StorageInterface storageHandler;

  public AddCoursesHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  /**
   * Invoked when a request is made on this route's corresponding path e.g. '/hello'
   *
   * @param request The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return The content to be set in the response
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      // collect parameters from the request
      String uid = request.queryParams("uid");
      String class1 = request.queryParams("class_one");
      String class2 = request.queryParams("class_two");
      String class3 = request.queryParams("class_three");
      String class4 = request.queryParams("class_four");
      String class5 = request.queryParams("class_five");

      Map<String, Object> data = new HashMap<>();
      data.put("one", class1);
      data.put("two", class2);
      data.put("three", class3);
      data.put("four", class4);
      data.put("five", class5);

      // get the current word count to make a unique word_id by index.
      int courseCount = this.storageHandler.getCollection(uid, "courses").size();
      String courseId = "course-" + courseCount;

      // use the storage handler to add the document to the database
      this.storageHandler.addDocument(uid, "courses", courseId, data);

      responseMap.put("response_type", "success");
      responseMap.put("one", class1);
      responseMap.put("two", class2);
      responseMap.put("three", class3);
      responseMap.put("four", class4);
      responseMap.put("five", class5);
    } catch (Exception e) {
      // error likely occurred in the storage handler
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }

    return moshiAdapter.toMoshiJson(responseMap);
  }
}
