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
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import spark.Spark;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DatabaseHandlersTests {

    private JsonAdapter<Map<String, Object>> responseAdapter =
            new Moshi.Builder().build().adapter(Types.newParameterizedType(Map.class, String.class, Object.class));
    static FirebaseUtilities utils;

    static {
        try {
            utils = new FirebaseUtilities();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @BeforeAll
    public static void setup_before_everything() throws IOException {

        // Remove the logging spam during tests
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
        JSONParser courseCreator = new JSONParser();
        courseCreator.createCourses();
        CourseObject courseObject = courseCreator.getParsedJSON();
        // here we can update our course object with our calculated scores method
        CourseDatasource.calcCourseDiffic(courseObject);


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

    //save 5 courses - clear
    @Test
    public void save5Courses() throws IOException {
        String uid = "tester";
        HttpURLConnection connection = tryRequest("/add-courses?uid="+uid+"&class_one=CSCI111"+
                "&class_two=APMA1650&class_three=CHEM301&class_four=CLPS440&class_five=BIOL210");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        assertEquals("success", responseBody.get("response_type"));

        utils.clearUser(uid);
        connection.disconnect();
    }

    //save and retrieve 5 courses - clear
    @Test
    public void saveGet5Courses() throws IOException {
        String uid = "tester";

        HttpURLConnection connection = tryRequest("/add-courses?uid="+uid+"&class_one=CSCI111"+
                "&class_two=APMA1650&class_three=CHEM301&class_four=CLPS440&class_five=BIOL210");
        assertEquals(200, connection.getResponseCode());
        connection.disconnect();

        connection = tryRequest("get-saved-scheds?uid="+uid);
        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<String> course = (List<String>) responseBody.get("courses");
        assertEquals("[{class_four=CLPS440, class_two=APMA1650, class_five=BIOL210, class_three=CHEM301, class_one=CSCI111}]"
                , course.toString());

        utils.clearUser(uid);
        connection.disconnect();
    }

    //retrieve no courses
    @Test
    public void get0Courses() throws IOException {
        String uid = "tester";
        HttpURLConnection connection = tryRequest("get-saved-scheds?uid="+uid);
        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<String> course = (List<String>) responseBody.get("courses");
        assertEquals("[]"
                , course.toString());

        utils.clearUser(uid);
        connection.disconnect();

    }

    //save null courses and retrieve - clear
    @Test
    public void saveGet0Courses() throws IOException {
        String uid = "tester";

        HttpURLConnection connection = tryRequest("/add-courses?uid="+uid);
        assertEquals(200, connection.getResponseCode());
        connection.disconnect();

        connection = tryRequest("get-saved-scheds?uid="+uid);
        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
        List<String> course = (List<String>) responseBody.get("courses");
        assertEquals("[]"
                , course.toString());

        utils.clearUser(uid);
        connection.disconnect();

    }
}
