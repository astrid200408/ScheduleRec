package edu.brown.cs.student.main.server.Utils;

import edu.brown.cs.student.main.server.Utils.CourseObject.Course;
import java.util.*;

public class CalcDiffic {
  List<Course> classes;

  public CalcDiffic(CourseObject myClasses) {
    this.classes = myClasses.courses;
  }

  public int calculateScore(List<String> givenClasses) {
    // count how many courses the student provided
    int count = (int) givenClasses.stream().filter(item -> item != null).count();
    System.out.println(givenClasses);
    int currScore = 0;

    // grab courses from Course list
    for (int i = 0; i < count; i++) {
      String courseCode = givenClasses.get(i);
      for (Course course : this.classes) {
        if (course.code.equals(courseCode)) {
          // add up difficulty score
          currScore += course.difficulty_score;
        }
      }
    }

    return currScore;
  }
}
