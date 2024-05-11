package edu.brown.cs.student.main.UnitTest;

import static edu.brown.cs.student.main.server.Utils.CourseDatasource.normalize;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.main.server.Utils.CourseDatasource;
import edu.brown.cs.student.main.server.Utils.CourseObject;
import edu.brown.cs.student.main.server.Utils.CourseObject.Course;
import edu.brown.cs.student.main.server.Utils.JSONParser;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

public class TestScore {
  CourseObject testJSON;



  @Nested
  class NormalizationTest {
    @Test
    void testNormalizeBasic() {
      double[] input = {10, 20, 30, 40, 50};
      double[] expected = {0.0, 0.25, 0.5, 0.75, 1.0};
      assertArrayEquals(expected, normalize(input), 0.001);
    }

    @Test
    void testNormalizeNegValues() {
      double[] input = {-10, 0, 10};
      double[] expected = {0.0, 0.5, 1.0};
      assertArrayEquals(expected, normalize(input), 0.001);
    }

    @Test
    void testNormalizeSameValues() {
      double[] input = {5, 5, 5, 5, 5};
      double[] expected = {0.0, 0.0, 0.0, 0.0, 0.0};
      assertArrayEquals(expected, normalize(input), 0.001);
    }

    @Test
    void testNormalizeSingleValue() {
      double[] input = {10};
      double[] expected = {0.0};
      assertArrayEquals(expected, normalize(input), 0.001);
    }

    @Test
    void testNormalizeWNoValues() {
      double[] input = {};
      double[] expected = {};
      assertArrayEquals(expected, normalize(input), 0.001);
    }

    @Test
    void testNormalizeWZeros() {
      double[] input = {0, 0, 0};
      double[] expected = {0.0, 0.0, 0.0};
      assertArrayEquals(expected, normalize(input), 0.001);
    }


  }

  @Nested
  class CourseDatasourceTest {
    CourseObject testJSON;
    static CourseObject courseObject;

    @BeforeAll
    public static void setup() {
      JSONParser courseCreator = new JSONParser();
      courseCreator.createCourses();
      System.out.println("works");
      courseObject = courseCreator.getParsedJSON();
      System.out.println(courseObject);
    }

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

    public void createTestCourses() {
      String filePath = "src/main/java/edu/brown/cs/student/main/data/testCourses.json";
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
        this.testJSON = fromJsonGeneral(fileString, CourseObject.class);
        System.out.println(this.testJSON.courses.get(0).professor);

      } catch (IOException e) {
        System.out.println(e.getMessage());
      }
    }

    //    @Test
    //    void testGetCoursesByDepartment() throws CourseDatasourceException {
    //
    //      List<CourseObject.Course> departmentCourses =
    //          CourseDatasource.getCoursesByDepartment(courseObject,
    // String.valueOf(List.of("CLPS")));
    //
    //      assertEquals(2, departmentCourses.size());
    //      assertEquals("CS101", departmentCourses.get(0).code);
    //      assertEquals("CS102", departmentCourses.get(1).code);
    //    }

    //    @Test
    //    void testGetCoursesByInvalidDepartment() {
    //
    //      String departments = "[\"EE\"]";
    //      assertThrows(
    //          CourseDatasourceException.class,
    //          () -> {
    //            CourseDatasource.getCoursesByDepartment(courseObject, departments);
    //          });
    //    }

    @Test
    void testCalcCourseDiffic() {
      CourseDatasource.calcCourseDiffic(courseObject);
      Course courseOne = courseObject.courses.get(0);
      assertEquals(9, courseOne.difficultyScore);
    }

    @Test
    void testCalcCourseDifficEasyClassLow() {
      CourseDatasource.calcCourseDiffic(courseObject);
      Course courseOne = courseObject.courses.get(0);
      assertTrue(courseOne.difficultyScore < 25);
    }

    @Test
    void testCalcCourseDifficHardClassHard() {
      CourseDatasource.calcCourseDiffic(courseObject);
      Course courseOne = courseObject.courses.get(1);
      assertTrue(courseOne.difficultyScore > 90);
    }

    @Test
    void catchNullException() {
      createTestCourses();
      assertThrows(
          NullPointerException.class,
          () -> {
            CourseDatasource.calcCourseDiffic(testJSON);
          });
    }
    @Test
    void testEachHasScore() {
      CourseDatasource.calcCourseDiffic(courseObject);
      for (CourseObject.Course course : courseObject.courses) {
        assertTrue(course.difficultyScore >= 0 && course.difficultyScore <= 100);
        assertNotNull(course.difficultyScore);
      }
    }

  }
}
