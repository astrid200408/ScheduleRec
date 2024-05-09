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
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalcDifficTests {

    private JsonAdapter<Map<String, Object>> responseAdapter = new Moshi.Builder().build().adapter(Types.newParameterizedType(Map.class, String.class, Object.class));;
    @BeforeAll
    public static void setup_before_everything() {

        // Remove the logging spam during tests
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger

    }
    @BeforeEach
    public void setup() throws IOException {
        // Re-initialize state, etc. for _every_ test method run
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

    @AfterEach
    public void teardown() {
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


    @Test
    public void testOneClassDiffic() throws IOException {
        HttpURLConnection connection = tryRequest("/get-difficulty?class_one=CSCI111");

        assertEquals(200, connection.getResponseCode());

        Map<String, Object> responseBody =
                this.responseAdapter.fromJson(new Buffer().readFrom(connection.getInputStream()));

        assertEquals(9.0, responseBody.get("schedule_difficulty"));

        connection.disconnect();
    }






}
