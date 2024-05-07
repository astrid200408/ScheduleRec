import React, { useEffect, useState } from "react";
import "../styles/logoutpage.css";
import { ControlledInput } from "./ControlledInput";
import { log } from "console";

const LogoutPage = () => {
  const [includeCommandString, setIncludeCommandString] = useState<string>("");
  const [monString, setMonString] = useState<string>("");
  const [classNum, setClassNum] = useState(0);
  const [diff, setDiff] = useState<string>("");

  const handleGenerate = (commandString: string) => {
    const [...args] = commandString.split(",");
    var box = document.getElementById("monbox") as HTMLInputElement;
    setMonString(args[0]);
    // box.textContent = args[0];
    setIncludeCommandString(" ");
  };

  const handleDiffClick = (s : string) => {
    setDiff(s);
  };

  const changeColor = (button: HTMLButtonElement) => {
    button.style.backgroundColor = "818589";
  };

  const handleClassClick = (number: number) => {
    setClassNum(number);
  };

  const handleClick = () => {
    alert("smt");
  }
  // useEffect(() => {
  //   alert(classNum);
  // }, [classNum]);

  interface Course {
    code: string;
    name: string;
    prof: string;
  }

  async function apiCall(): Promise<Array<Course>> {
    const ex: Course = {
      code: "CODE",
      name: "NAME",
      prof: "PROF",
    };

    try {
      const res = await fetch(
      "http://localhost:3232/recommend-courses?" +
        "schedule-diffic-wanted=" +
          diff +
        "&class-amt-wanted=" +
         classNum +
        "&current-schedule-difficulty=0" +
        "&class_one=PHIL150"
    ); 
    const res_list = [];
    const json1 = await res.json();
    const result = json1.courses_recommended;
    
    for (var i = 0; i < result.length; i++) {
      const obj = result[i];
      const ex: Course = {
        code: obj.code,
        name: obj.name,
        prof: obj.professor,
      };
      res_list.push(ex);
    }
    console.log(res_list);
    return res_list;

    } catch {
      alert("Courses Not Found")
      return [];
    } 
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
        <div
          className="class-buttons"
          aria-label="number of classes buttons"
          aria-description="buttons to select desired number of classes"
        >
          <p className="classes-text">Number of Classes:</p>
          <button
            className="class-1"
            id="1"
            aria-label="one class button"
            aria-description="button for selecting one class per semester"
            onClick={() => handleClassClick(1)}
          >
            1
          </button>
          <button
            className="class-2"
            aria-label="two classes button"
            aria-description="button for selecting two classes per semester"
            onClick={() => handleClassClick(2)}
          >
            2
          </button>
          <button
            className="class-3"
            aria-label="three classes button"
            aria-description="button for selecting three classes per semester"
            onClick={() => handleClassClick(3)}
          >
            3
          </button>
          <button
            className="class-4"
            aria-label="four classes button"
            aria-description="button for selecting four classes per semester"
            onClick={() => handleClassClick(4)}
          >
            4
          </button>
          <button
            className="class-5"
            aria-label="five classes button"
            aria-description="button for selecting five classes per semester"
            onClick={() => handleClassClick(5)}
          >
            5
          </button>
        </div>

        <div className="hours-buttons">
          <p className="hours-text">Difficulty:</p>
          <button
            className="less20"
            aria-label="less than twenty hours button"
            aria-description="button for selecting less than twenty hours per week"
            onClick={() => handleDiffClick("LOW")}
          >
            Low
          </button>
          <button
            className="btwn2030"
            aria-label="between twenty and thirty hours button"
            aria-description="button for selecting between twenty and thirty hours per week"
            onClick={() => handleDiffClick("MED")}
          >
            Med
          </button>
          <button
            className="plus30"
            aria-label="thirty plus hours button"
            aria-description="button for selecting thirty or more hours per week"
            onClick={() => handleDiffClick("HIGH")}
          >
            Hard
          </button>
          <button
            className="any"
            aria-label="any amount of hours button"
            aria-description="button for selecting any amount of hours per week"
            onClick={() => handleDiffClick("ANY")}
          >
            Any
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
