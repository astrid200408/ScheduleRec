import React, { useState } from "react";
import "../styles/logoutpage.css";
import { ControlledInput } from "./ControlledInput";

const LogoutPage = () => {
  const [includeCommandString, setIncludeCommandString] = useState<string>("");
  const [deptCommandString, setDeptCommandString] = useState<string>("");
  const [monString, setMonString] = useState<string>("");
  const [tuesString, setTuesString] = useState<string>("");
  const [wedString, setWedString] = useState<string>("");
  const [thursString, setThursString] = useState<string>("");
  const [friString, setFriString] = useState<string>("");
  const [oneBool, setOneBool] = useState<boolean>(false);

  const handleGenerate = (incString: string, deptString: string) => {
    const [...incArgs] = incString.split(",");
    const [...deptArgs] = deptString.split(",");
    // var box = document.getElementById("monbox") as HTMLInputElement;
    setMonString(incArgs[0]);
    setTuesString(deptArgs[0]);
    setIncludeCommandString(" ");
    setDeptCommandString(" ");
  };
  const handleRandom = (incString: string, deptString: string) => {
    const [...incArgs] = incString.split(",");
    const [...deptArgs] = deptString.split(",");
    setMonString(incArgs[1]);
    setTuesString(deptArgs[1]);
    setIncludeCommandString(" ");
    setDeptCommandString(" ");
  };
  // const changeBool = (buttonBool: boolean, setButtonBool: React.Dispatch<React.SetStateAction<boolean>>) => {
  //   if (buttonBool == true) {
  //     setButtonBool(false);
  //   }
  //   else {
  //     setButtonBool(true);
  //   }
  // };

  const handleClick = () => {
    alert("Button clicked!");
  };

  const changeColor = (button: HTMLButtonElement) => {
    button.style.backgroundColor = "818589";
  };

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
          <ControlledInput
            value={deptCommandString}
            setValue={setDeptCommandString}
            ariaLabel="department input"
            placeholder="Type like this: CSCI,ENGN,MATH"
            ariaDescription="Type here to input desired departments. Input class codes separated by commas"
            className="department-input"
          />{" "}
          {/*
          <input
            className="department-input"
            aria-label="department input"
            aria-description="Type here to input desired departments. Input course codes separated by commas"
            type="text"
            placeholder="Type something like this: CSCI,ENGN,MATH"
          /> */}
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
            // onClick={() => changeBool(oneBool, setOneBool)}
          >
            1
          </button>
          <button
            className="class-2"
            aria-label="two classes button"
            aria-description="button for selecting two classes per semester"
            onClick={handleClick}
          >
            2
          </button>
          <button
            className="class-3"
            aria-label="three classes button"
            aria-description="button for selecting three classes per semester"
            onClick={handleClick}
          >
            3
          </button>
          <button
            className="class-4"
            aria-label="four classes button"
            aria-description="button for selecting four classes per semester"
            onClick={handleClick}
          >
            4
          </button>
          <button
            className="class-5"
            aria-label="five classes button"
            aria-description="button for selecting five classes per semester"
            onClick={handleClick}
          >
            5
          </button>
        </div>

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
            id="tuesbox"
            aria-label="tuesday box"
            aria-description="box containing Tuesday class"
          >
            <p className="tuesPar">{tuesString}</p>
          </div>
          <div
            className="wedbox"
            id="wedbox"
            aria-label="wednesday box"
            aria-description="box containing Wednesday class"
          >
            <p className="wedPar">{wedString}</p>
          </div>
          <div
            className="thursbox"
            id="thursbox"
            aria-label="thursday box"
            aria-description="box containing Thursday class"
          >
            <p className="thursPar">{thursString}</p>
          </div>
          <div
            className="fribox"
            id="fribox"
            aria-label="friday box"
            aria-description="box containing Friday class"
          >
            <p className="friPar">{friString}</p>
          </div>
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
          onClick={() => handleRandom(includeCommandString, deptCommandString)}
        >
          Random
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
