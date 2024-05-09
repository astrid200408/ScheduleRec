package edu.brown.cs.student.main.server.Utils;

import edu.brown.cs.student.main.server.Exceptions.RecommendCourseException;
import edu.brown.cs.student.main.server.Utils.CourseObject.Course;
import java.util.*;

public class RecCourse {

  CourseObject classes;

  public RecCourse(CourseObject myClasses) {
    this.classes = myClasses;
  }

  public List<Course> getRecCourses(
      List<String> givenClasses,
      String schedDiffic,
      int classTotal,
      int currSchedDiffic,
      String filter)
      throws RecommendCourseException {

    int count =
        (int) givenClasses.stream().filter(item -> item != null && !item.equals("N")).count();
    int classesWanted = classTotal - count;
    if (classesWanted <= 0) {
      throw new RecommendCourseException("no room left to add classes in schedule");
    }

    Difficulty difficNeeded = null;

    if (schedDiffic != null && !schedDiffic.equals("ANY")) {

      int scoreWanted =
          Difficulty.fromString(schedDiffic).getDifficScore() * count - currSchedDiffic;

      // if scoreWanted is neg, we know that the difficulty is already too high
      if (scoreWanted < 0) {
        throw new RecommendCourseException("Workload not possible with given classes");
      }

      difficNeeded = Difficulty.getDifficulty(scoreWanted / classesWanted);
      // System.out.println(difficNeeded);

    }

    List<Course> filteredCourses = this.classes.courses;
    List<Course> toReturn = new ArrayList<>();

    // find courses that match this and any given filters
    if (filter != null) {
      filteredCourses = CourseDatasource.getCoursesByDepartment(this.classes, filter);
    }

    // randomize list of courses
    Collections.shuffle(filteredCourses);

    // grab needed courses
    for (Course course : filteredCourses) {
      if (classesWanted == 0) {
        break;
      }
      if (difficNeeded != null) {
        if (Difficulty.getDifficulty(course.difficultyScore)
            .toString()
            .equals(difficNeeded.toString())) {
          toReturn.add(course);
          classesWanted -= 1;
        }
      } else {
        toReturn.add(course);
        classesWanted -= 1;
      }
    }

    return toReturn;
  }
}
