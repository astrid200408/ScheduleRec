package edu.brown.cs.student.main.handlers.Utils;

import edu.brown.cs.student.main.handlers.CourseObject;
import edu.brown.cs.student.main.handlers.CourseObject.Course;
import java.util.*;

public class CalcDiffic {
  List<Course> classes;

  public CalcDiffic(CourseObject myClasses) {
    this.classes = myClasses.courses;
  }

  public int calculateScore(List<String> givenClasses) {
    // count how many courses the student provided
    int count = (int) givenClasses.stream().filter(item -> item != null).count();
    int currScore = 0;

    // grab courses from Course list
    for (int i = 0; i < count; i++) {
      String courseCode = givenClasses.get(i);
      for (Course course : this.classes) {
        if (course.code == courseCode) {
          // add up difficulty score
          currScore += course.difficulty_score;
        }
      }
    }

    return currScore;
  }
}
