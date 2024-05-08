import React from "react";

interface NumClassButtonInterface {
    setClassNum: React.Dispatch<React.SetStateAction<number>>;
}
export default function NumClassButton(
  props:NumClassButtonInterface
) {
  const handleClassClick = (number: number) => {
    props.setClassNum(number);
  };
  return (
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
  );
}
