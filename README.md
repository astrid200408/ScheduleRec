# ScheduleRec

### Project Details
Our project, Schedule Recommender, allows for students at Brown University to choose courses based on difficulty
derived from course syllabi. We use a weighted algorithm in our backend server to calculate difficulty scores.

Users are able: 

    - include courses they know they need or want to take

    - filter by multiple departments at a time

    - choose the amount of courses recommended or that show up in the scheduler

    - choose difficulty of schedule recommended

    - save their most recent schedule and load it. 
    
    - generate a random schedule using the random button


#### Team members and contributions (include cs logins)

Astrid (armoreno): Mostly worked in backend with Mason. While he was involved with our algorithm and parsing data,
I created all handlers and logic for recommending courses after data has been parsed and assigned difficulty into our 
data structure. Was also heavily involved in integration including adding accessibility and our api call handlers.

Mason Lee (jlee704): Worked on backend with Astrid. Worked mostly on scoring each class and calculating the difficulty
based on the data. Also helped with debugging handlers and some integration with Simeon. Unit tested backend algo and other 
helper functions related to scoring classes. 

Simeon Dong (sdong22): I worked on front-end with Jordan. We mocked in figma together and then I created a revised figma 
mock. Then, I created the main webpages using HTML, CSS, and React. I created front end mocking to prepare for integration.
Worked on integrating front-end and back-end together with mason. Debugged front end issues.

Jordan Stornelli(jstornel): I worked on front-end with Simeon. I worked on rendering and arranging front-end elements 
initially. Then, I worked on adding functionality to the HTML elements and properly integrating the back-end server.  

#### Total estimated time : armoreno(30) + 
A link to your repo : https://github.com/astrid200408/ScheduleRec


### Design choices

Explain the relationships between classes/interfaces.
Discuss any specific data structures you used, why you created it, and other high level explanations.

#### Runtime Optimizations
talk about having our algorithm run only once at to run server instead of calculating a course everytime


### Tests -- Explain the testing suites that you implemented for your program and how each test ensures that a part of the program works.
Backend Tests: Tests for our backend test all handlers on multiple calls including: working simple request, working 
complex requests, and any error checking done to make sure it is done properly. We also have unit tests for calculating the score and the functions related
to that.

### How To

Run the tests you wrote/were provided

#### Build and run your program
To build the backend, cd into server, run mvn package, and then ./run


