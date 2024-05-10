import React from "react";

/*
Class that contains the html elements for the buttons to select how many hours
 per week of work the user would like to have
*/

interface ClassHoursButtonInterface {
  setClassHours: React.Dispatch<React.SetStateAction<string>>;
}
export default function ClassHoursButton(props: ClassHoursButtonInterface) {
  const handleClassClick = (hoursString: string) => {
    props.setClassHours(hoursString);
  };
  return (
    <div className="hours-buttons">
      <p className="hours-text">Hours per week:</p>
      <button
        className="less20"
        aria-label="less_than_twenty_hours_button"
        id="less_than_twenty_hours_button"
        aria-description="button for selecting less than twenty hours per week"
        onClick={() => handleClassClick("LOW")}
      >
        &lt; 20
      </button>
      <button
        className="btwn2030"
        aria-label="between_twenty_and_thirty_hours_button"
        id="between_twenty_and_thirty_hours_button"
        aria-description="button for selecting between twenty and thirty hours per week"
        onClick={() => handleClassClick("MEDIUM")}
      >
        20-30
      </button>
      <button
        className="plus30"
        aria-label="thirty_plus_hours_button"
        id="thirty_plus_hours_button"
        aria-description="button for selecting thirty or more hours per week"
        onClick={() => handleClassClick("HIGH")}
      >
        30 &#60;
      </button>
      <button
        className="any"
        aria-label="any_amount_of_hours_button"
        id="any_amount_of_hours_button"
        aria-description="button for selecting any amount of hours per week"
        onClick={() => handleClassClick("ANY")}
      >
        any
      </button>
    </div>
  );
}
