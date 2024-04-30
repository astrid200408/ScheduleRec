import React from 'react'
import "../styles/logoutpage.css";

const LogoutPage = () => {
  return (
    <div className="logout-page">
      <div className="input-fields">
        <div className="include-div">
          <button className="include-button">include</button>
          <input
            className="include-input"
            type="text"
            // value={inputValue}
            // onChange={handleChange}
            placeholder="Type something..."
          />
        </div>

        <div className="department-div">
          <button className="department-button">dept.</button>
          <input
            className="department-input"
            type="text"
            // value={inputValue}
            // onChange={handleChange}
            placeholder="Type something..."
          />
        </div>
      </div>

      <div className="button-div">
        <div className="class-buttons">
          <button className="class-1"></button>
          <button className="class-2"></button>
          <button className="class-3"></button>
          <button className="class-4"></button>
          <button className="class-5"></button>
        </div>

        <div className="hours-buttons">
          <button className="less20"></button>
          <button className="btwn2030"></button>
          <button className="plus30"></button>
          <button className="any"></button>
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