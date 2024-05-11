package edu.brown.cs.student.main.server.Utils;

/**
 * enum used in RecCourse that provides range in course difficulty
 */
enum Difficulty {
  LOW,
  MEDIUM,
  HIGH;

  /**
   * grabs a score for an individual class that would be considered that difficulty
   * @return - score as an int
   */
  public int getDifficScore() {
    switch (this) {
      case LOW:
        return 20;

      case MEDIUM:
        return 50;

      case HIGH:
        return 80;

      default:
        return 0;
    }
  }

  /**
   * Takes in a number and assigns it a difficulty based on range
   * @param score - difficulty score of a class
   * @return - difficulty level
   */
  public static Difficulty getDifficulty(int score) {
    if (0 <= score && score <= 20) {
      return LOW;
    }
    if (20 < score && score <= 50) {
      return MEDIUM;
    }
    if (50 < score) {
      return HIGH;
    }
    throw new IllegalArgumentException("Course doesn't have proper difficulty score");
  }

  /**
   * takes in a string and returns a difficulty
   * @param text - string version of difficulty enum
   * @return - difficulty
   */
  public static Difficulty fromString(String text) {
    for (Difficulty difficulty : Difficulty.values()) {
      if (difficulty.toString().equalsIgnoreCase(text)) {
        return difficulty;
      }
    }
    throw new IllegalArgumentException("No constant with text " + text + " found");
  }
}
