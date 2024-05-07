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

    int count = (int) givenClasses.stream().filter(item -> item != null).count();
    int scoreWanted = Difficulty.fromString(schedDiffic).getDifficScore() * count - currSchedDiffic;

    // if scoreWanted is neg, we know that the difficulty is already too high
    if (scoreWanted < 0) {
      throw new RecommendCourseException("Workload not possible with given classes");
    }

    // find out how many courses we need to recommend
    int classesWanted = classTotal - count; // if

    Difficulty difficNeeded = Difficulty.getDifficulty(scoreWanted / classesWanted);

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
      if (Difficulty.getDifficulty(course.difficultyScore)
          .toString()
          .equals(difficNeeded.toString())) {
        toReturn.add(course);
        classesWanted -= 1;
      }
    }

    return toReturn;
  }
}
