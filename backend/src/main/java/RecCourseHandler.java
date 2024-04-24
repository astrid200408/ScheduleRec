package edu.brown.cs.student.main.handlers;

import edu.brown.cs.student.main.handlers.Exceptions.RecommendCourseException;
import edu.brown.cs.student.main.handlers.utils.CourseObject;
import edu.brown.cs.student.main.handlers.utils.RecCourse;
import edu.brown.cs.student.main.handlers.utils.moshiAdapter;
import java.util.*;
import spark.Request;
import spark.Response;
import spark.Route;

public class RecCourseHandler implements Route {
  CourseObject classes;

  public RecCourseHandler(CourseObject myClasses) {
    this.classes = myClasses;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    // get params needed : current courseload difficulty, current classes in sched, how many total
    // courses wanted, wanted
    // courseload difficulty
    int currSchedDiffic = Integer.parseInt(request.queryParams("current-schedule-difficulty"));
    int classTotal = Integer.parseInt(request.queryParams("class-amt-wanted"));
    String schedDiffic = request.queryParams("schedule-diffic-wanted");
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
      responseMap.put("request", "success");
      responseMap.put(
          "courses_recommended",
          recommender.getRecCourses(
              givenClasses, schedDiffic, classTotal, currSchedDiffic, deptFilter));
    } catch (RecommendCourseException e) {
      responseMap.put("request", "failure");
      responseMap.put("error", e.getMessage());
    }

    return moshiAdapter.toMoshiJson(responseMap);
  }
}
