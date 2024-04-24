package Courses;

import static Courses.CourseDatasource.getCoursesByDepartment;

import Courses.CourseObject.Course;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

public class JSONParser {

  CourseObject parsedJSON;

  /**
   * Parses JSON data from a JsonReader and converts it to the specified target type.
   *
   * @param source The JsonReader containing the JSON data.
   * @param targetType The Class representing the target data type to convert the JSON to.
   * @param <T> The generic type of the target data.
   * @return An instance of the target data type parsed from the JSON.
   * @throws IOException if there's an error reading or parsing the JSON data.
   */
  public static <T> T fromJsonGeneral(String source, Class<T> targetType) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<T> adapter = moshi.adapter(targetType);
    //    source.setLenient(true);

    return adapter.fromJson(source);
  }

  public CourseObject getParsedJSON() {
    return this.parsedJSON;
  }

  public void createCourses() {
    String filePath = "data/mockCourses.json";
    try {
      // ***************** READING THE FILE *****************
      FileReader jsonReader = new FileReader(filePath);
      BufferedReader br = new BufferedReader(jsonReader);
      String fileString = "";
      String line = br.readLine();
      while (line != null) {
        fileString = fileString + line;
        line = br.readLine();
      }
      jsonReader.close();

      // ****************** CREATING THE ADAPTER **********
      this.parsedJSON = this.fromJsonGeneral(fileString, CourseObject.class);

    } catch (IOException e) {
      System.out.println(e.getMessage());
    }
  }

  public static void main(String[] args) throws FileNotFoundException {
    JSONParser myparser = new JSONParser();
    myparser.createCourses();
    List<Course> compCourses = getCoursesByDepartment(myparser.parsedJSON, "CS");
    for (CourseObject.Course course : compCourses) {
      System.out.println("Course Code: " + course.code);
      System.out.println("Course Name: " + course.name);
    }

    System.out.println("done");
  }
}