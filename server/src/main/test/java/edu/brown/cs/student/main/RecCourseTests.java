package edu.brown.cs.student.main;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.server.Utils.CourseDatasource;
import edu.brown.cs.student.main.server.Utils.CourseObject;
import edu.brown.cs.student.main.server.Utils.JSONParser;
import edu.brown.cs.student.main.server.handlers.*;
import edu.brown.cs.student.main.server.storage.FirebaseUtilities;
import okio.Buffer;
import org.junit.jupiter.api.*;
import spark.Spark;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RecCourseTests {

    private JsonAdapter<Map<String, Object>> responseAdapter =
            new Moshi.Builder().build().adapter(Types.newParameterizedType(Map.class, String.class, Object.class));

    @BeforeAll
    public static void setup_before_everything() throws IOException {

        // Remove the logging spam during tests
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
        JSONParser courseCreator = new JSONParser();
        courseCreator.createCourses();
        CourseObject courseObject = courseCreator.getParsedJSON();
        // here we can update our course object with our calculated scores method
        CourseDatasource.calcCourseDiffic(courseObject);
        FirebaseUtilities utils = new FirebaseUtilities();

        Spark.get("get-difficulty", new CalcDifficHandler(courseObject));
        Spark.get("add-courses", new AddCoursesHandler(utils));
        Spark.get("recommend-courses", new RecCourseHandler(courseObject));
        Spark.get("get-course-object", new GetCourseHandler(courseObject));
        Spark.get("get-saved-scheds", new GetDBCoursesHandler(utils));
        Spark.get("check-courses", new CheckCoursesHandler(courseObject));
        Spark.init();
        Spark.awaitInitialization(); // don't continue until the server is listening

    }

    @AfterAll
    public static void teardown() {
        // Gracefully stop Spark listening on both endpoints after each test
        Spark.unmap("get-difficulty");
        Spark.unmap("add-courses");
        Spark.unmap("recommend-courses");
        Spark.unmap("get-course-object");
        Spark.unmap("get-saved-scheds");
        Spark.unmap("check-courses");
        Spark.awaitStop(); // don't proceed until the server is stopped
    }

    private static HttpURLConnection tryRequest(String apiCall) throws IOException {
        // Configure the connection (but don't actually send the request yet)
        URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();

        // The default method is "GET", which is what we're using here.
        // If we were using "POST", we'd need to say so.
        clientConnection.setRequestMethod("GET");

        clientConnection.connect();
        return clientConnection;
    }

    //no input classes, easy difficulty, no filter, 4 classes
    @Test
    public void test4Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=4&schedule_diffic_wanted=LOW");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<Object> course = (List<Object>) responseBody.get("courses_recommended");
        assertEquals(4, course.size());

        connection.disconnect();
    }

    //2 input classes, med difficulty, no filter, 4 classes
    @Test
    public void test2Input4Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=4&schedule_diffic_wanted=MEDIUM&class_one=CSCI111&class_two=CHEM301");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<Object> course = (List<Object>) responseBody.get("courses_recommended");
        assertEquals(2, course.size());

        connection.disconnect();
    }

    //no input classes, med difficulty, filter, 2 classes
    @Test
    public void testFilter2Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=2&schedule_diffic_wanted=MEDIUM&filter=[\"CSCI\"]");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<Object> course = (List<Object>) responseBody.get("courses_recommended");
        assertEquals(2, course.size());

        connection.disconnect();
    }

    //any diffic, 4 classes
    @Test
    public void testAny4Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=4&schedule_diffic_wanted=ANY");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<Object> course = (List<Object>) responseBody.get("courses_recommended");
        assertEquals(4, course.size());

        connection.disconnect();
    }

    //3 input classes, 4 classes
    @Test
    public void test3Input4Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=4&schedule_diffic_wanted=MEDIUM&class_one=CSCI111&"+
                "class_two=CHEM301&class_three=CLPS440");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<Object> course = (List<Object>) responseBody.get("courses_recommended");
        assertEquals(1, course.size());

        connection.disconnect();
    }

    //3 input classes, 3 classes, should return an error
    @Test
    public void test3Input3Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=3&schedule_diffic_wanted=MEDIUM&class_one=CSCI111&class_two=CHEM301&class_three=CLPS440");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        assertEquals("no room left to add classes in schedule", responseBody.get("error"));

        connection.disconnect();
    }

    //0 classes
    @Test
    public void testNoInfo0Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=0");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        assertEquals("no room left to add classes in schedule", responseBody.get("error"));

        connection.disconnect();
    }

    //info with 0 classes
    @Test
    public void test0Classes() throws IOException {
        HttpURLConnection connection = tryRequest("/recommend-courses?current_schedule_difficulty=0"
                +"&class_amt_wanted=0&schedule_diffic_wanted=MEDIUM&class_one=CSCI111&class_two=CHEM301&class_three=CLPS440");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        assertEquals("no room left to add classes in schedule", responseBody.get("error"));

        connection.disconnect();
    }
}