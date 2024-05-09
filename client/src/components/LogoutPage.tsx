import React, { useEffect, useState } from "react";
import "../styles/logoutpage.css";
import { ControlledInput } from "./ControlledInput";
import { NOMEM } from "dns";
import {
  courseRecCall,
  curr_Sched,
  curr_sched_diffic,
  recCourseCall,
} from "./utils/api";
import NumClassButton from "./buttons/NumClassButton";
import ClassHoursButton from "./buttons/ClassHoursButton";
import Schedule from "./buttons/Schedule";
import { Accessibility } from "./Accessibility";

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

  const [classNum, setClassNum] = useState(0);
  const [classHours, setClassHours] = useState<string>("");

  async function handleGenerate(incString: string, deptString: string) {
    const split = incString.split(",");
    setClassesIncluded(split);
    let copy = ["N", "N", "N", "N", "N"];
    console.log(classesIncluded);
    for (let i = 0; i < split.length; i++) {
      copy[i] = split[i];
    }
    setClassesIncluded(copy.map((str) => str.trimStart()));
    console.log(copy.map((str) => str.trimStart()));

    setDeptIncluded(deptString.split(","));
    setMonString(classesIncluded[0]);
    setTuesString(deptIncluded[0]);
    setIncludeCommandString(" ");
    setDeptCommandString(" ");

    const listCourses = await getRecCourses();
    // if (listCourses.length != 0) {
    //   const course = listCourses[0];
    //   setMonString(listCourses.toString);
    // }
    // for (let i = 0; i < classNum - classesIncluded.length; i++) {

    // }
    console.log(listCourses);
  }

  const handleClick = () => {
    alert("Button clicked!");
  };

  async function getRecCourses() {
    //current schedule so far
    const sched: curr_Sched = {
      class_one: classesIncluded[0],
      class_two: classesIncluded[1],
      class_three: classesIncluded[2],
      class_four: classesIncluded[3],
      class_five: classesIncluded[4],
    };
    //find difficulty from current schedule
    const callDiffic = await curr_sched_diffic(sched);
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
      current_schedule_difficulty: diffic,
    };
    //grab recommendations
    const recommendedCourses = await courseRecCall(recCallProps);
    const coursesArray: [] = recommendedCourses.courses_recommended;

    for (let i = 0; i < 5; i++) {
      if (classesIncluded[i] != "N") {
        //get course info from handlers
      }
    }

    for (let j = 0; j < coursesArray.length; j++) {
      //call output method that formats data
      //takes in name, teacher, time, days

      //TODO: add in real data, not mocks
      printCourse("a", "b", 1, 20, 2, 30, ["Monday"]);
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
    //TODO: <br not working- try newlines?
    let formattedString =
      name +
      "<br>" +
      instructor +
      "<br>" +
      sHr +
      ":" +
      sMin +
      " - " +
      eHr +
      ":" +
      eMin;
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
          onClick={handleClick}
        >
          Previous
        </button>
        <button
          className="save-button"
          aria-label="save_button"
          id="save_button"
          aria-description="button to save your current generated schedule"
          onClick={handleClick}
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
          onClick={handleClick}
        >
          Random
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
