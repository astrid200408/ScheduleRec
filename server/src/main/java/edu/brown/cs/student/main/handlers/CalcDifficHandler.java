package edu.brown.cs.student.main.handlers;

import edu.brown.cs.student.main.handlers.Utils.CalcDiffic;
import java.util.*;
import spark.Request;
import spark.Response;
import spark.Route;

public class CalcDifficHandler implements Route {
  CourseObject classes;

  public CalcDifficHandler(CourseObject classesInput) {
    this.classes = classesInput;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();

    // try to grab all 5 classes
    String class1 = request.queryParams("class_one");
    String class2 = request.queryParams("class_two");
    String class3 = request.queryParams("class_three");
    String class4 = request.queryParams("class_four");
    String class5 = request.queryParams("class_five");

    List<String> givenClasses = Arrays.asList(class1, class2, class3, class4, class5);
    CalcDiffic calcSched = new CalcDiffic(this.classes);

    // give them to CalcDiffic to return a score
    responseMap.put("schedule_difficulty", calcSched.calculateScore(givenClasses));

    // use moshi and return the diffic
    return moshiAdapter.toMoshiJson(responseMap);
  }
}
