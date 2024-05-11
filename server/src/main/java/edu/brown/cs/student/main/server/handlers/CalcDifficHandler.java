package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.Utils.CalcDiffic;
import edu.brown.cs.student.main.server.Utils.CourseObject;
import edu.brown.cs.student.main.server.Utils.moshiAdapter;
import java.util.*;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * this class takes in included classes in a schedule and returns a calculated difficulty score for them
 */
public class CalcDifficHandler implements Route {
  CourseObject classes;

  public CalcDifficHandler(CourseObject classesInput) {
    this.classes = classesInput;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();

    try {
      // try to grab all 5 classes
      String class1 = request.queryParams("class_one");
      String class2 = request.queryParams("class_two");
      String class3 = request.queryParams("class_three");
      String class4 = request.queryParams("class_four");
      String class5 = request.queryParams("class_five");

      List<String> givenClasses = Arrays.asList(class1, class2, class3, class4, class5);
      CalcDiffic calcSched = new CalcDiffic(this.classes);

      // give them to CalcDiffic to return a score
      responseMap.put("request", "success");
      responseMap.put("schedule_difficulty", calcSched.calculateScore(givenClasses));
    } catch (Exception e) {
      responseMap.put("request", "failure");
    }

    // use moshi and return the diffic
    return moshiAdapter.toMoshiJson(responseMap);
  }
}
