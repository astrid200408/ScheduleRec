package edu.brown.cs.student.main.server.Utils;

enum Difficulty {
  LOW,
  MEDIUM,
  HIGH;

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

  public static Difficulty fromString(String text) {
    for (Difficulty difficulty : Difficulty.values()) {
      if (difficulty.toString().equalsIgnoreCase(text)) {
        return difficulty;
      }
    }
    throw new IllegalArgumentException("No constant with text " + text + " found");
  }
}
