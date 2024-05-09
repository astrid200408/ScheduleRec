import React, { useEffect, useState } from "react";
import "../styles/logoutpage.css";
import { ControlledInput } from "./ControlledInput";
import { NOMEM } from "dns";
import {
  courseRecCall,
  curr_Sched,
  curr_sched_diffic,
  recCourseCall,
  getCourse,
} from "./utils/api";
import NumClassButton from "./buttons/NumClassButton";
import ClassHoursButton from "./buttons/ClassHoursButton";
import Schedule from "./buttons/Schedule";
import { Accessibility } from "./Accessibility";
import { previous, save } from "./Save&Previous";

const LogoutPage = () => {
  const [includeCommandString, setIncludeCommandString] = useState<string>("");
  const [deptCommandString, setDeptCommandString] = useState<string>("");

  const [monString, setMonString] = useState<string>("");
  const [tuesString, setTuesString] = useState<string>("");
  const [wedString, setWedString] = useState<string>("");
  const [thursString, setThursString] = useState<string>("");
  const [friString, setFriString] = useState<string>("");

  const [classesIncluded, setClassesIncluded] = useState<string[]>([]);
  const [deptIncluded, setDeptIncluded] = useState<string[]>([]);
  const [currSched, setCurrSched] = useState<string[]>([]);

  const [classNum, setClassNum] = useState(0);
  const [classHours, setClassHours] = useState<string>("");

  async function handleGenerate(incString: string, deptString: string) {
    const split = incString.split(",");
    setClassesIncluded(split);
    let copy = ["N", "N", "N", "N", "N"];
    if (split[0] != "" && split.length == 0) {
      for (let i = 0; i < split.length; i++) {
        copy[i] = split[i];
      }
    }
    setClassesIncluded(copy.map((str) => str.trimStart()));
    console.log(copy.map((str) => str.trimStart()));

    setDeptIncluded(deptString.split(","));
    setIncludeCommandString("");
    setDeptCommandString("");
  }

  useEffect(() => {
    const callFunction = async () => await getRecCourses();
    const listCourses = callFunction();
    console.log(listCourses);
  }, [classesIncluded]);

  function mergeAndPadClasses(
    userInput: string[],
    backendData: string[],
    size = 5
  ): string[] {
    // Filter out placeholders from user input
    const userClasses = userInput.filter((cls) => cls !== "N");

    // Combine user classes with backend classes
    const combinedClasses = [...userClasses, ...backendData];

    // Ensure the combined result is exactly 'size' long
    const result = combinedClasses.slice(0, size);

    // Fill the remaining slots with "N" if needed
    return [...result, ...Array(size - result.length).fill("N")];
  }

  async function getRecCourses() {
    const included_courses: curr_Sched = {
      class_one: classesIncluded[0],
      class_two: classesIncluded[1],
      class_three: classesIncluded[2],
      class_four: classesIncluded[3],
      class_five: classesIncluded[4],
    };

    //find difficulty from current schedule
    const callDiffic = await curr_sched_diffic(included_courses);
    const diffic = callDiffic.schedule_difficulty;

    //Recommender class info
    const recCallProps: recCourseCall = {
      sched_diffic_wanted: classHours,
      class_amt_wanted: classNum.toString(),
      class_one: classesIncluded[0],
      class_two: classesIncluded[1],
      class_three: classesIncluded[2],
      class_four: classesIncluded[3],
      class_five: classesIncluded[4],
      filter: deptIncluded.toString(),
      current_schedule_difficulty: diffic,
    };
    //grab recommendations
    const recommendedCourses = await courseRecCall(recCallProps);
    const coursesArray: [] = recommendedCourses.courses_recommended;
    const recCourseCodes = coursesArray.map(
      (course: { code: string }) => course.code
    );
    setCurrSched(mergeAndPadClasses(classesIncluded, recCourseCodes));
    for (let i = 0; i < 5; i++) {
      if (classesIncluded[i] != "N") {
        const courseCall = await getCourse(classesIncluded[i]);
        const courseInfo = courseCall.course;
        console.log(courseInfo);
        printCourse(
          courseInfo.name,
          courseInfo.professor,
          courseInfo.schedule[0].timeSlots[0].startHour,
          courseInfo.schedule[0].timeSlots[0].startMinute,
          courseInfo.schedule[0].timeSlots[0].endHour,
          courseInfo.schedule[0].timeSlots[0].endMinute,
          courseInfo.schedule[0].days
        );
      }
    }

    for (let j = 0; j < coursesArray.length; j++) {
      //call output method that formats data
      //takes in name, teacher, time, days
      //TODO: add in real data, not mocks
      // printCourse("a", "b", 1, 20, 2, 30, ["Thursday"]);
    }
    //return recommended courses
    return coursesArray;
  }

  enum Days {
    Monday = "monbox",
    Tuesday = "tuesbox",
    Wednesday = "wedbox",
    Thursday = "thursbox",
    Friday = "fribox",
  }

  function printCourse(
    name: string,
    instructor: string,
    sHr: number,
    sMin: number,
    eHr: number,
    eMin: number,
    days: string[]
  ) {
    let numDays = days.length;
    console.log(numDays);
    //TODO: <br not working- try newlines?
    const formattedString =
      name +
      "\n" +
      instructor +
      "\n" +
      sHr +
      ":" +
      sMin +
      " - " +
      eHr +
      ":" +
      eMin;

    // <div>
    //   {name} <br /> {instructor} <br /> {sHr}:{sMin} - eHr:eMin
    // </div>

    //instead of setting the string of the paragraph of the day boxes to values-
    //return a div that will represent a "class element" and reside in the day box?
    //how would i set that to be inside the day box? ->
    //should it have a border, color, text color, etc?
    //should each day box have hidden class boxes inside them that become visible when needed?
    //moving day boxes to diff class- what info do they need? ->
    //text- either big string w/ newlines or array<str> that is formatted in sched class

    console.log(formattedString);
    switch (days[0]) {
      case "Monday":
        setMonString(formattedString);
        break;
      case "Tuesday":
        setTuesString(formattedString);
        break;
      case "Wednesday":
        setWedString(formattedString);
        break;
      case "Thursday":
        setThursString(formattedString);
        break;
      case "Friday":
        setFriString(formattedString);
        break;
      default:
        console.log("invalid day of week");
        break;
    }
  }

  return (
    <div className="logout-page" aria-label="main page">
      <Accessibility />
      <div className="input-fields" aria-label="input section">
        <div className="include-div">
          <button
            className="include-button"
            aria-label="include button"
            aria-description="button to submit included classes"
          >
            Include
          </button>
          <ControlledInput
            value={includeCommandString}
            setValue={setIncludeCommandString}
            ariaLabel="include_input"
            id="include_input"
            placeholder="Type like this: CSCI0180,CSCI0111,CSCI0200"
            ariaDescription="Type here to input desired classes. Input class codes separated by commas"
            className="include-input"
          />
        </div>

        <div className="department-div">
          <button
            className="department-button"
            aria-label="department_button"
            id="department_button"
            aria-description="button to submit included departments"
          >
            Dept.
          </button>
          <ControlledInput
            value={deptCommandString}
            setValue={setDeptCommandString}
            ariaLabel="department_input"
            id="department_input"
            placeholder="Type like this: CSCI,ENGN,MATH"
            ariaDescription="Type here to input desired departments. Input class codes separated by commas"
            className="department-input"
          />{" "}
        </div>
      </div>

      <div className="button-div">
        <NumClassButton setClassNum={setClassNum} />
        <ClassHoursButton setClassHours={setClassHours} />
      </div>

      <div className="schedule-div">
        <Schedule
          mString={monString}
          tuString={tuesString}
          wString={wedString}
          thString={thursString}
          fString={friString}
        />
      </div>

      <div className="utility-buttons">
        <button
          className="previous-button"
          aria-label="previous_button"
          id="previous_button"
          aria-description="button to retrieve the last saved schedule"
          onClick={() => previous()}
        >
          Previous
        </button>
        <button
          className="save-button"
          aria-label="save_button"
          id="save_button"
          aria-description="button to save your current generated schedule"
          onClick={() => save(currSched)}
        >
          Save
        </button>
        <button
          className="generate-button"
          aria-label="generate_button"
          id="generate_button"
          aria-description="button to generate a schedule based on input data"
          onClick={() =>
            handleGenerate(includeCommandString, deptCommandString)
          }
        >
          Generate
        </button>
        <button
          className="random-button"
          aria-label="random_button"
          id="random_button"
          aria-description="button to randomly generate a schedule"
          //onClick={handleClick}
        >
          Random
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
