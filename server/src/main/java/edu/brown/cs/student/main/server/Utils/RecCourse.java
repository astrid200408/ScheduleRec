package edu.brown.cs.student.main.server.Utils;

import edu.brown.cs.student.main.server.Exceptions.CourseDatasourceException;
import edu.brown.cs.student.main.server.Exceptions.RecommendCourseException;
import edu.brown.cs.student.main.server.Utils.CourseObject.Course;
import java.util.*;

/** this class recommends courses */
public class RecCourse {

  CourseObject classes;

  /**
   * this class recommends courses
   *
   * @param myClasses - dataset stored in a courseObject
   */
  public RecCourse(CourseObject myClasses) {
    this.classes = myClasses;
  }

  /**
   * Grabs user input and recommends classes based on that
   *
   * @param givenClasses - classes a user wants to include
   * @param schedDiffic - how difficult a user wants a schedule to be
   * @param classTotal - how many total classes a user wants in their schedule or for the program to
   *     recommend
   * @param currSchedDiffic - how difficult is the current schedule
   * @param filter - for now, if there are any departments the user wants classes for
   * @return - an array of course objects
   * @throws RecommendCourseException - if there is no way to fit user needs to recommend courses
   * @throws CourseDatasourceException - if there is no proper input for filter, should be a list or
   *     "N" for none.
   */
  public List<Course> getRecCourses(
      List<String> givenClasses,
      String schedDiffic,
      int classTotal,
      int currSchedDiffic,
      String filter)
      throws RecommendCourseException, CourseDatasourceException {

    int count =
        (int) givenClasses.stream().filter(item -> item != null && !item.equals("N")).count();
    int classesWanted = classTotal - count;
    if (classesWanted <= 0) {
      throw new RecommendCourseException("no room left to add classes in schedule");
    }

    Difficulty difficNeeded = null;

    // if there is a specific schedule difficulty goal, incorporate that
    if (schedDiffic != null && !schedDiffic.equals("ANY")) {

      int scoreWanted =
          Difficulty.fromString(schedDiffic).getDifficScore() * count - currSchedDiffic;

      // if scoreWanted is neg, we know that the difficulty is already too high
      if (scoreWanted < 0) {
        throw new RecommendCourseException("Workload not possible with given classes");
      }

      difficNeeded = Difficulty.getDifficulty(scoreWanted / classesWanted);
    }

    List<Course> filteredCourses = this.classes.courses;
    List<Course> toReturn = new ArrayList<>();

    // find courses that match this and any given filters
    if (filter != null && !filter.equals("N")) {

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
