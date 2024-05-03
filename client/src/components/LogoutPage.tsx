import React, { useState } from "react";
import "../styles/logoutpage.css";

const LogoutPage = () => {
  // const [commandString, setCommandString] = useState<string>("");
    
    const handleClick = () => {
      alert("Button clicked!");
    };

  return (
    <div className="logout-page">
      <div className="input-fields">
        <div className="include-div">
          <button className="include-button">Include</button>
          <input
            className="include-input"
            type="text"
            placeholder="Type like this: csci1800,csci111,csci200"
          />
        </div>

        <div className="department-div">
          <button className="department-button">Dept.</button>
          <input
            className="department-input"
            type="text"
            placeholder="Type something like this: CSCI,ENGN,MATH"
          />
        </div>
      </div>

      <div className="button-div">
        <div className="class-buttons">
          <button className="class-1" onClick={handleClick}>
            1
          </button>
          <button className="class-2" onClick={handleClick}>
            2
          </button>
          <button className="class-3" onClick={handleClick}>
            3
          </button>
          <button className="class-4" onClick={handleClick}>
            4
          </button>
          <button className="class-5" onClick={handleClick}>
            5
          </button>
        </div>

        <div className="hours-buttons">
          <button className="less20" onClick={handleClick}>
            &lt; 20
          </button>
          <button className="btwn2030" onClick={handleClick}>
            20-30
          </button>
          <button className="plus30" onClick={handleClick}>
            30 &#60;
          </button>
          <button className="any" onClick={handleClick}>
            any
          </button>
        </div>
      </div>

      <div className="schedule-div">
        <div className="back-rectangle">
          <div className="monbox"> </div>
          <div className="tuesbox"> </div>
          <div className="wedbox"> </div>
          <div className="thursbox"> </div>
          <div className="fribox"> </div>
        </div>
      </div>

      <div className="utility-buttons">
        <button className="previous-button" onClick={handleClick}>
          Previous
        </button>
        <button className="save-button" onClick={handleClick}>
          Save
        </button>
        <button className="random-button" onClick={handleClick}>
          Random
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
