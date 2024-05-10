import React from "react";

interface UtilityButtonInterface {
    setClassNum: React.Dispatch<React.SetStateAction<number>>;
    setClassHours: React.Dispatch<React.SetStateAction<string>>;
    setIncludeString: React.Dispatch<React.SetStateAction<string>>;
}
export default function UtilityButton(
  props:UtilityButtonInterface
) {
  const apiCall = (number: number, classHours: string, include: string) => {
    props.setClassNum(number);
    props.setClassHours(classHours);
    props.setIncludeString(string);
  };
  return (
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
          className="random-button"
          aria-label="random button"
          aria-description="button to randomly generate a schedule"
          onClick={handleClick}
        >
          Random
        </button>
  );
}
