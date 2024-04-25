package edu.brown.cs.student.main.server.Utils;

import java.util.List;

public class CourseObject {

  public List<Course> courses;

  public static class Course {
    public String code;
    public String name;
    public List<Schedule> schedule;

    public Integer difficulty_score;
    public String professor;
    public Boolean containsAdditionalComp;
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
}
