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
    int scoreWanted = Difficulty.fromString(schedDiffic).getDifficScore() - currSchedDiffic;

    // if scoreWanted is neg, we know that the difficulty is already too high
    if (scoreWanted < 0) {
      throw new RecommendCourseException("Workload not possible with given classes");
    }

    int count = (int) givenClasses.stream().filter(item -> item != null).count();
    // find out how many courses we need to recommend
    int classesWanted = classTotal - count; // if
    // around what difficulty should each be
    //    System.out.println("score wanted: " + scoreWanted );
    //    System.out.println("classes wanted: "+ classesWanted);
    Difficulty difficNeeded = Difficulty.getDifficulty(scoreWanted / classesWanted);
    System.out.println(difficNeeded);

    List<Course> filteredCourses = this.classes.courses;
    List<Course> toReturn = new ArrayList<>();
    System.out.println(filteredCourses);

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
      if (Difficulty.getDifficulty(course.difficulty_score)
          .toString()
          .equals(difficNeeded.toString())) {
        System.out.println(difficNeeded);
        System.out.println(Difficulty.getDifficulty(course.difficulty_score));
        toReturn.add(course);
        classesWanted -= 1;
      }
    }

    return toReturn;
  }
}
