package edu.brown.cs.student.main.server.Utils;

import java.util.ArrayList;
import java.util.List;

public class CourseDatasource {

  public static List<CourseObject.Course> getCoursesByDepartment(
      CourseObject courseObject, String department) {
    List<CourseObject.Course> departmentCourses = new ArrayList<>();

    if (courseObject.courses != null) {
      for (CourseObject.Course course : courseObject.courses) {
        if (course.code.startsWith(department)) {
          departmentCourses.add(course);
        }
      }
    }

    return departmentCourses;
  }

  /**
   * Calculates difficulty score for each course and updates the CourseObject difficulty score field
   *
   * @param courseObject
   * @return
   */
  public static void calcCourseDiffic(CourseObject courseObject) {
    for (CourseObject.Course course : courseObject.courses) {

      // feedback returns has avg hours, max hours
      // coursework has list of components each with score including additional components

    }
  }
}
