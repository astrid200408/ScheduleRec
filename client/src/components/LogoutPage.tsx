import React, { useEffect, useState } from "react";
import "../styles/logoutpage.css";
import { ControlledInput } from "./ControlledInput";
import { NOMEM } from "dns";
import NumClassButton from "./NumClassButton";

const LogoutPage = () => {
  const [includeCommandString, setIncludeCommandString] = useState<string>("");
  const [monString, setMonString] = useState<string>("");
  const [classNum, setClassNum] = useState(0);

  const handleGenerate = (commandString: string) => {
    const [...args] = commandString.split(",");
    var box = document.getElementById("monbox") as HTMLInputElement;
    setMonString(args[0]);
    // box.textContent = args[0];
    setIncludeCommandString(" ");
  };

  const handleClick = () => {
    alert("Button clicked!");
  };

  const changeColor = (button: HTMLButtonElement) => {
    button.style.backgroundColor = "818589";
  };



  // useEffect(() => {
  //   alert(classNum);
  // }, [classNum]);

  interface Course {
    code: string;
    name: string;
    prof: string;
  }

  async function apiCall(): Promise<Course> {
    const ex: Course = {
      code: "CODE",
      name: "NAME",
      prof: "PROF",
    };

    const res = await fetch(
      "http://localhost:3232/recommend-courses?" +
        "schedule-diffic-wanted=LOW" +
        "&class-amt-wanted=" +
        { classNum } +
        "&current-schedule-difficulty=0" +
        "&class_one=PHIL150"
    );
    const json1 = await res.json();
    const result = json1.courses_recommended;
    const firstObj = result[0];
    console.log(firstObj);
    return ex;
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
          {/* <input
          
            className="include-input"
            aria-label="include input"
            aria-description="Type here to input desired classes. Input class codes separated by commas"
            type="text"
            id="include-id"
            placeholder="Type like this: csci1800,csci111,csci200"
          /> */}
          <ControlledInput
            value={includeCommandString}
            setValue={setIncludeCommandString}
            ariaLabel="include input"
            placeholder="Type like this: csci1800,csci111,csci200"
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
          <input
            className="department-input"
            aria-label="department input"
            aria-description="Type here to input desired departments. Input course codes separated by commas"
            type="text"
            placeholder="Type something like this: CSCI,ENGN,MATH"
          />
        </div>
      </div>

      <div className="button-div">
        <NumClassButton setClassNum={setClassNum} />
        <div className="hours-buttons">
          <p className="hours-text">Hours per week:</p>
          <button
            className="less20"
            aria-label="less than twenty hours button"
            aria-description="button for selecting less than twenty hours per week"
            onClick={handleClick}
          >
            &lt; 20
          </button>
          <button
            className="btwn2030"
            aria-label="between twenty and thirty hours button"
            aria-description="button for selecting between twenty and thirty hours per week"
            onClick={handleClick}
          >
            20-30
          </button>
          <button
            className="plus30"
            aria-label="thirty plus hours button"
            aria-description="button for selecting thirty or more hours per week"
            onClick={handleClick}
          >
            30 &#60;
          </button>
          <button
            className="any"
            aria-label="any amount of hours button"
            aria-description="button for selecting any amount of hours per week"
            onClick={handleClick}
          >
            any
          </button>
        </div>
      </div>

      <div className="schedule-div">
        <div className="back-rectangle">
          <div
            className="monbox"
            id="monbox"
            aria-label="monday box"
            aria-description="box containing Monday class"
          >
            <p className="monPar">{monString}</p>
          </div>
          <div
            className="tuesbox"
            aria-label="tuesday box"
            aria-description="box containing Tuesday class"
          ></div>
          <div
            className="wedbox"
            aria-label="wednesday box"
            aria-description="box containing Wednesday class"
          ></div>
          <div
            className="thursbox"
            aria-label="thursday box"
            aria-description="box containing Thursday class"
          ></div>
          <div
            className="fribox"
            aria-label="friday box"
            aria-description="box containing Friday class"
          ></div>
        </div>
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
          onClick={() => apiCall()}
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
