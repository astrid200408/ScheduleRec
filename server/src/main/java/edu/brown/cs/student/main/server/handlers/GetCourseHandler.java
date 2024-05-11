package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.Utils.CourseObject;
import edu.brown.cs.student.main.server.Utils.CourseObject.Course;
import edu.brown.cs.student.main.server.Utils.moshiAdapter;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/** this class takes in a course code and grabs class information for it */
public class GetCourseHandler implements Route {
  CourseObject classes;

  public GetCourseHandler(CourseObject classesInput) {
    this.classes = classesInput;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();

    // grab class code
    String classCode = request.queryParams("class_code");
    Course returnable = null;

    // find course from code
    for (Course course : this.classes.courses) {
      if (classCode.equals(course.code)) {
        returnable = course;
        break;
      }
    }

    // if found return it, else produce an error
    if (returnable != null) {
      responseMap.put("request", "success");
      responseMap.put("course", returnable);
    } else {
      responseMap.put("request", "failure");
      responseMap.put("error", "course does not exist");
    }

    // use moshi and return the diffic
    return moshiAdapter.toMoshiJson(responseMap);
  }
}
