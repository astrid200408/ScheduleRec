import React, { useEffect, useState } from "react";
import "../styles/logoutpage.css";
import { ControlledInput } from "./ControlledInput";
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

  const [monString, setMonString] = useState<string[]>([]);
  const [tuesString, setTuesString] = useState<string[]>([]);
  const [wedString, setWedString] = useState<string[]>([]);
  const [thursString, setThursString] = useState<string[]>([]);
  const [friString, setFriString] = useState<string[]>([]);

  const [classesIncluded, setClassesIncluded] = useState<string[]>([]);
  const [deptIncluded, setDeptIncluded] = useState<string>("N");
  const [currSched, setCurrSched] = useState<string[]>([]);

  const [classNum, setClassNum] = useState(0);
  const [classHours, setClassHours] = useState<string>("");

  const [errString, setErrString] = useState<string>("");

  function clearBoxes() {
    setMonString([""]);
    setTuesString([""]);
    setWedString([""]);
    setThursString([""]);
    setFriString([""]);
  }

  async function handleGenerate(incString: string, deptString: string) {
    clearBoxes;
    const split = incString.split(",");
    setClassesIncluded(split);
    let copy = ["N", "N", "N", "N", "N"];
    //if there are no specified included classes, all classes should be N
    if (split[0] != "" && split.length != 0) {
      for (let i = 0; i < split.length; i++) {
        copy[i] = split[i];
      }
    }
    setClassesIncluded(copy.map((str) => str.trimStart()));

    setDeptIncluded(deptString.split(",").toString());
    setIncludeCommandString("");
    setDeptCommandString("");
  }

  useEffect(() => {
    const callFunction = async () => await getRecCourses();
    const listCourses = callFunction();
  }, [classesIncluded]);

  useEffect(() => {
    setTimeout(errString);
  }, [errString]);

  function mergeAndPadClasses(
    userInput: string[],
    backendData: string[],
    size = 5
  ): string[] {
    // Filter out placeholders from user input
    const userClasses = userInput.filter((cls) => cls !== "N");
    let a = userClasses.length;
    let b = backendData.length;
    let c = 5 - (a + b);
    let nStr = [];
    for (let i = 0; i < c; i++) {
      nStr[i] = "N";
    }

    // Combine user classes with backend classes
    const combinedClasses = [...userClasses, ...backendData, ...nStr];
    return combinedClasses;

    // // Ensure the combined result is exactly 'size' long
    // const result = combinedClasses.slice(0, size);

    // // Fill the remaining slots with "N" if needed
    // return [...result, ...Array(size - result.length).fill("N")];
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
      filter: deptIncluded ? deptIncluded.toString() : "N",
      current_schedule_difficulty: diffic,
    };
    //grab recommendations
    const recommendedCourses = await courseRecCall(recCallProps);
    const coursesArray: [] = recommendedCourses.courses_recommended;
    const recCourseCodes = coursesArray.map(
      (course: { code: string }) => course.code
    );
    console.log(recCourseCodes);
    //combines specified classes and recommended classes into one list
    await setCurrSched(mergeAndPadClasses(classesIncluded, recCourseCodes));
    console.log("mergepad = " + currSched);

    //goes through every valid class in schedule list and prints their course info
    for (let i = 0; i < 5; i++) {
      if (currSched[i] != "N") {
        const courseCall = await getCourse(classesIncluded[i]);
        const courseInfo = courseCall.course;
        console.log(courseInfo);
        printCourse(
          i,
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

    return coursesArray;
  }

  /* This method prints out a course in one of the schedule boxes. */
  function printCourse(
    index: number,
    name: string,
    instructor: string,
    sHr: number,
    sMin: number,
    eHr: number,
    eMin: number,
    days: string[]
  ) {
    let startMin = "";
    let endMin = "";
    //converting hours ending in 0 to a calendar format
    sMin == 0 ? (startMin = "00") : (startMin = sMin.toString());
    eMin == 0 ? (endMin = "00") : (endMin = eMin.toString());

    const formattedString = [
      name,
      instructor,
      sHr.toString(),
      startMin,
      eHr.toString(),
      endMin,
      days.map((day) => " " + day).toString(),
    ];

    switch (index) {
      case 0:
        setMonString(formattedString);
        break;
      case 1:
        setTuesString(formattedString);
        break;
      case 2:
        setWedString(formattedString);
        break;
      case 3:
        setThursString(formattedString);
        break;
      case 4:
        setFriString(formattedString);
        break;
      default:
        setErrString(
          "Encountered error reading classes. Please check text formatting and try again."
        );
        break;
    }
  }

  async function prev() {
    const classes = await previous();
    console.log(classes);
    for (let i = 0; i < 5; i++) {
      if (classes[i] != "N") {
        const courseCall = await getCourse(classesIncluded[i]);
        const courseInfo = courseCall.course;
        printCourse(
          i,
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
  }

  /* Timeout method to remove error message after specified interval */
  setTimeout((id: string) => {
    const elt = document.getElementById(id);
    elt
      ? elt.remove()
      : console.log("expected elt to remove, but encountered none");
  }, 3000);

  /* HTML Elements that make up front-end display of the web page*/
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

      <div className="err-div"> {errString} </div>

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
          onClick={() => prev()}
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
