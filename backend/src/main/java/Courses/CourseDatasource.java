package Courses;

import Courses.CourseObject.Course;
import java.util.ArrayList;
import java.util.List;

public class CourseDatasource {

    public static List<CourseObject.Course> getCoursesByDepartment(CourseObject courseObject, String department) {
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


  }



