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

  const handleGenerate = (incString: string, deptString: string) => {
    const split = incString.split(",");
    setClassesIncluded(split);
    let copy = ["N", "N", "N", "N", "N"];
    console.log(classesIncluded);
    for (let i = 0; i < split.length; i++) {
      copy[i] = split[i];
    }
    setClassesIncluded(copy);
    console.log(copy);

    setDeptIncluded(deptString.split(","));
    setMonString(classesIncluded[0]);
    setTuesString(deptIncluded[0]);
    setIncludeCommandString(" ");
    setDeptCommandString(" ");

    const listCourses = getRecCourses();
    console.log(listCourses);
  };

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

    //return recommended courses
    return recommendedCourses.courses_recommended;
  }

  return (
    <div className="logout-page" aria-label="main page">
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
            ariaLabel="include input"
            placeholder="Type like this: CSCI0180,CSCI0111,CSCI0200"
            ariaDescription="Type here to input desired classes. Input class codes separated by commas"
            className="include-input"
          />
        </div>

        <div className="department-div">
          <button
            className="department-button"
            aria-label="department button"
            aria-description="button to submit included departments"
          >
            Dept.
          </button>
          <ControlledInput
            value={deptCommandString}
            setValue={setDeptCommandString}
            ariaLabel="department input"
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
          aria-label="previous button"
          aria-description="button to retrieve the last saved schedule"
          onClick={handleClick}
        >
          Previous
        </button>
        <button
          className="save-button"
          aria-label="save button"
          aria-description="button to save your current generated schedule"
          onClick={handleClick}
        >
          Save
        </button>
        <button
          className="generate-button"
          aria-label="generate button"
          aria-description="button to generate a schedule based on input data"
          onClick={() =>
            handleGenerate(includeCommandString, deptCommandString)
          }
        >
          Generate
        </button>
        <button
          className="random-button"
          aria-label="random button"
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
