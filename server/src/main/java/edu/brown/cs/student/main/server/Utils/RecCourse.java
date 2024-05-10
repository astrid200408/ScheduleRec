package edu.brown.cs.student.main.server.Utils;

import edu.brown.cs.student.main.server.Exceptions.CourseDatasourceException;
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
      throws RecommendCourseException, CourseDatasourceException {

    System.out.println(givenClasses.toString());
    int count =
        (int) givenClasses.stream().filter(item -> item != null && !item.equals("N")).count();
    int classesWanted = classTotal - count;
    Difficulty difficNeeded = null;

    System.out.println(count);

    if (!schedDiffic.equals("ANY")) {

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
    System.out.println("filtered courses: " + filteredCourses);

    // find courses that match this and any given filters
    System.out.println(filter);
    if (filter != null && !filter.equals("N")) {

      filteredCourses = CourseDatasource.getCoursesByDepartment(this.classes, filter);
    }

    // randomize list of courses
    Collections.shuffle(filteredCourses);
    System.out.println(filteredCourses.size());

    // grab needed courses
    for (Course course : filteredCourses) {
      if (classesWanted == 0) {
        break;
      }
      if (difficNeeded != null) {
        if (Difficulty.getDifficulty(course.difficultyScore)
            .toString()
            .equals(difficNeeded.toString())) {
          //        System.out.println(difficNeeded);
          System.out.println(Difficulty.getDifficulty(course.difficultyScore));
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
