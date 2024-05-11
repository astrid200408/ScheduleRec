package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.Exceptions.CourseDatasourceException;
import edu.brown.cs.student.main.server.Exceptions.RecommendCourseException;
import edu.brown.cs.student.main.server.Utils.CourseObject;
import edu.brown.cs.student.main.server.Utils.RecCourse;
import edu.brown.cs.student.main.server.Utils.moshiAdapter;
import java.util.*;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * this class recommends courses using our algorithm using inputted information
 */
public class RecCourseHandler implements Route {
  CourseObject classes;

  public RecCourseHandler(CourseObject myClasses) {
    this.classes = myClasses;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();

    /**
     * grab course information such as: difficulty of current schedule, any included classes, filter, and total classes
     * needed
     */
    int currSchedDiffic = Integer.parseInt(request.queryParams("current_schedule_difficulty"));
    int classTotal = Integer.parseInt(request.queryParams("class_amt_wanted"));
    String schedDiffic = request.queryParams("schedule_diffic_wanted");
    String class1 = request.queryParams("class_one");
    String class2 = request.queryParams("class_two");
    String class3 = request.queryParams("class_three");
    String class4 = request.queryParams("class_four");
    String class5 = request.queryParams("class_five");

    // department filter
    String deptFilter = request.queryParams("filter");
    List<String> givenClasses = Arrays.asList(class1, class2, class3, class4, class5);
    RecCourse recommender = new RecCourse(this.classes);

    try {
      try {
        responseMap.put("request", "success");

        //grab recommended classes
        responseMap.put(
            "courses_recommended",
            recommender.getRecCourses(
                givenClasses, schedDiffic, classTotal, currSchedDiffic, deptFilter));
      } catch (RecommendCourseException e) {
        responseMap.put("request", "failure");
        responseMap.put("error", e.getMessage());
      }
    } catch (CourseDatasourceException c) {
      responseMap.put("request", "failure");
      responseMap.put("error", c.getMessage());
    }

    return moshiAdapter.toMoshiJson(responseMap);
  }
}
