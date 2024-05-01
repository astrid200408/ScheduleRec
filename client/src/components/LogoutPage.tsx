import React from 'react'
import "../styles/logoutpage.css";

const LogoutPage = () => {
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
          <button className="class-1">1</button>
          <button className="class-2">2</button>
          <button className="class-3">3</button>
          <button className="class-4">4</button>
          <button className="class-5">5</button>
        </div>

        <div className="hours-buttons">
          <button className="less20">&lt; 20</button>
          <button className="btwn2030">20-30</button>
          <button className="plus30">30 &#60;</button>
          <button className="any">
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
    </div>
  );
}

export default LogoutPage