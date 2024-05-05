package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.Utils.moshiAdapter;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetDBCoursesHandler implements Route {

  public StorageInterface storageHandler;

  public GetDBCoursesHandler(StorageInterface storageHandler) {
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
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");

      System.out.println("rendering classes for user: " + uid);

      // get all the courses
      List<Map<String, Object>> vals = this.storageHandler.getCollection(uid, "courses");
      List<String> class_one = getCoursesNum("one", vals);
      List<String> class_two = getCoursesNum("two", vals);
      List<String> class_three = getCoursesNum("three", vals);
      List<String> class_four = getCoursesNum("four", vals);
      List<String> class_five = getCoursesNum("five", vals);

      List<Map<String, Object>> courses = new ArrayList<>();
      for (int i = 0; i < class_one.size(); i++) {
        Map<String, Object> sched = new HashMap<String, Object>();
        sched.put("class_one", toPut(class_one, i));
        sched.put("class_two", toPut(class_two, i));
        sched.put("class_three", toPut(class_three, i));
        sched.put("class_four", toPut(class_four, i));
        sched.put("class_five", toPut(class_five, i));
        courses.add(sched);
      }

      responseMap.put("response_type", "success");
      responseMap.put("courses", courses);

    } catch (Exception e) {
      // error likely occurred in the storage handler
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }

    return moshiAdapter.toMoshiJson(responseMap);
  }

  private String toPut(List<String> courseList, int index) {
    String course;
    try {
      course = courseList.get(index);
    } catch (Exception e) {
      course = null;
    }
    return course;
  }

  private List<String> getCoursesNum(String course, List<Map<String, Object>> vals) {
    List<String> courses;
    try {
      courses = vals.stream().map(pin -> pin.get(course).toString()).toList();
    } catch (Exception e) {
      courses = null;
    }
    return courses;
  }
}
