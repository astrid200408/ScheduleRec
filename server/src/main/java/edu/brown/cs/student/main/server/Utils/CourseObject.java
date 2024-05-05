package edu.brown.cs.student.main.server.Utils;

import java.util.List;

public class CourseObject {

  public List<Course> courses;

  public static class Course {
    public String code;
    public String name;
    public List<Schedule> schedule;

    public Integer difficultyScore;
    public String professor;
    public Boolean containsAdditionalComp;
    public List<Syllabus> syllabus;
  }

  public static class Schedule {
    public List<String> days;
    public List<TimeSlot> timeSlots;
  }

  public static class TimeSlot {
    public int startHour;
    public int startMinute;
    public int endHour;
    public int endMinute;

    public TimeSlot(int startHour, int startMinute, int endHour, int endMinute) {
      this.startHour = startHour;
      this.startMinute = startMinute;
      this.endHour = endHour;
      this.endMinute = endMinute;
    }
  }

  // Added Syllabus class
  public static class Syllabus {
    public List<Feedback> feedback;
    public List<Coursework> coursework;
  }

  // Added Feedback class
  public static class Feedback {
    public int avg;
    public int max;
  }

  // Added Coursework class
  public static class Coursework {
    public List<Assignment> assignments;
    public List<Project> projects;
    public List<Paper> papers;
    public List<Reading> readings;
    public List<Exam> exams;
    public String additionalComponent;
  }

  // Added Assignment class
  public static class Assignment {
    public int num;
    public int avg;
    public int weight;
  }

  // Added Project class
  public static class Project {
    public int num;
    public int avg;
    public int weight;
  }

  // Added Paper class
  public static class Paper {
    public int num;
    public int avg;
    public int weight;
  }

  // Added Reading class
  public static class Reading {
    public int num;
    public int avg;
    public int weight;
  }

  // Added Exam class
  public static class Exam {
    public int num;
    public int avg;
    public int weight;
  }
}
