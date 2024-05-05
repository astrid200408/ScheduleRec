package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.Utils.CourseObject;
import edu.brown.cs.student.main.server.Utils.CourseObject.Course;
import edu.brown.cs.student.main.server.Utils.moshiAdapter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class CheckCoursesHandler implements Route {
  CourseObject classes;

  public CheckCoursesHandler(CourseObject courseObject) {
    this.classes = courseObject;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    List<Course> returnList = new ArrayList<>();

    // find course from code
    for (Course course : this.classes.courses) {
      responseMap.put("request", "success");
      returnList.add(course);
    }
    responseMap.put("Courses", returnList);

    return moshiAdapter.toMoshiJson(responseMap);
  }
}
