package edu.brown.cs.student.main.server.Utils;

import edu.brown.cs.student.main.server.Utils.CourseObject.Assignment;
import edu.brown.cs.student.main.server.Utils.CourseObject.Coursework;
import edu.brown.cs.student.main.server.Utils.CourseObject.Exam;
import edu.brown.cs.student.main.server.Utils.CourseObject.Paper;
import edu.brown.cs.student.main.server.Utils.CourseObject.Project;
import edu.brown.cs.student.main.server.Utils.CourseObject.Reading;
import java.util.ArrayList;
import java.util.Arrays;
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
   * Also scales from 0 - 100 with 100 being harder
   *
   * @param courseObject
   * @return
   */
  public static void calcCourseDiffic(CourseObject courseObject) {
    List<Double> componentScores = new ArrayList<>();
    for (CourseObject.Course course : courseObject.courses) {
      // feedback returns has avg hours, max hours
      // coursework has list of components each with score including additional components
      Integer avgHours = course.syllabus.get(0).feedback.get(0).avg;
      Integer maxHours = course.syllabus.get(0).feedback.get(0).max;
      Coursework coursework = course.syllabus.get(0).coursework.get(0);
      String additionalComponent = coursework.additionalComponent;

      double totalWeightedScore = getTotalWeightedScore(coursework, additionalComponent);
      componentScores.add(totalWeightedScore / avgHours); // should i use max hours?
    }

    double[] normalizedScores =
        normalize(componentScores.stream().mapToDouble(Double::doubleValue).toArray());

    int index = 0;
    for (CourseObject.Course course : courseObject.courses) {
      course.difficultyScore =
          (int) Math.ceil(normalizedScores[index++] * 100); // Scale to 0-100 range
    }
  }

  /**
   * Helper to get weighted score from syllabus info
   *
   * @param coursework
   * @param additionalComponent
   * @return weighted score
   */
  private static int getTotalWeightedScore(Coursework coursework, String additionalComponent) {
    double totalWeightedScore = 0.0;

    // assignments
    if (!coursework.assignments.isEmpty()) {
      Assignment assignment = coursework.assignments.get(0);
      totalWeightedScore += (assignment.avg * assignment.num) * assignment.weight;
    }

    // projects
    if (!coursework.projects.isEmpty()) {
      Project project = coursework.projects.get(0);
      totalWeightedScore += (project.avg * project.num) * project.weight;
    }

    // papers
    if (!coursework.papers.isEmpty()) {
      Paper paper = coursework.papers.get(0);
      totalWeightedScore += (paper.avg * paper.num) * paper.weight;
    }

    // readings
    if (!coursework.readings.isEmpty()) {
      Reading reading = coursework.readings.get(0);
      totalWeightedScore += (reading.avg * reading.num) * reading.weight;
    }

    // exams
    if (!coursework.exams.isEmpty()) {
      Exam exam = coursework.exams.get(0);
      totalWeightedScore += (exam.avg * exam.num) * exam.weight;
    }

    if (additionalComponent != null && !additionalComponent.isEmpty()) {
      if (additionalComponent.equalsIgnoreCase("yes")) {
        totalWeightedScore *= 1.2;
      }
    }
    return (int) Math.ceil(totalWeightedScore);
  }

  /**
   * Makes scores between 0 - 1
   *
   * @param values
   * @return
   */
  private static double[] normalize(double[] values) {
    // problem right now where the easiest class is 0 and best class is 100 -> is that something
    // that we want?
    double min = Arrays.stream(values).min().orElse(0);
    double max = Arrays.stream(values).max().orElse(0);

    if (min == 0 || max == 0) {
      // probs error?
      System.out.println("shouldn't happen");
    }

    // value to range [0, 1]
    double[] normalizedValues = new double[values.length];
    double range = max - min;
    for (int i = 0; i < values.length; i++) {
      normalizedValues[i] = (values[i] - min) / range;
    }

    return normalizedValues;
  }
}
