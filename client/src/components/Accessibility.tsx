import React, { useEffect } from "react";
import Mousetrap from "mousetrap";

export function Accessibility() {
  useEffect(() => {
    const handleCtrlIPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const inputElement = document.getElementById("include_input");
      if (inputElement) {
        inputElement.focus();
      }
    };

    const handleCtrlGPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const submitElement = document.getElementById("generate_button");
      if (submitElement) {
        submitElement.focus();
        submitElement.click();
      }
    };

    const handleOnePress = (e: KeyboardEvent) => {
      e.preventDefault();
      const oneClass = document.getElementById("one_class_button");
      if (oneClass) {
        oneClass.focus();
        oneClass.click();
      }
    };

    const handleTwoPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const twoClass = document.getElementById("two_classes_button");
      if (twoClass) {
        twoClass.focus();
        twoClass.click();
      }
    };

    const handleThreePress = (e: KeyboardEvent) => {
      e.preventDefault();
      const threeClass = document.getElementById("three_classes_button");
      if (threeClass) {
        threeClass.focus();
        threeClass.click();
      }
    };

    const handleFourPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const fourClass = document.getElementById("four_classes_button");
      if (fourClass) {
        fourClass.focus();
        fourClass.click();
      }
    };

    const handleFivePress = (e: KeyboardEvent) => {
      e.preventDefault();
      const fiveClass = document.getElementById("five_classes_button");
      if (fiveClass) {
        fiveClass.focus();
        fiveClass.click();
      }
    };

    const handleLeftPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const easyButton = document.getElementById(
        "less_than_twenty_hours_button"
      );
      if (easyButton) {
        easyButton.focus();
        easyButton.click();
      }
    };

    const handleUpPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const medButton = document.getElementById(
        "between_twenty_and_thirty_hours_button"
      );
      if (medButton) {
        medButton.focus();
        medButton.click();
      }
    };
    const handleRightPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const highButton = document.getElementById("thirty_plus_hours_button");
      if (highButton) {
        highButton.focus();
        highButton.click();
      }
    };

    const handleDownPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const anyButton = document.getElementById("any_amount_of_hours_button");
      if (anyButton) {
        anyButton.focus();
        anyButton.click();
      }
    };

    const handleCtrlSPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const saveButton = document.getElementById("save_button");
      if (saveButton) {
        saveButton.focus();
        saveButton.click();
      }
    };

    const handleCtrlPPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const previousButton = document.getElementById("previous_button");
      if (previousButton) {
        previousButton.focus();
        previousButton.click();
      }
    };

    const handleCtrlRPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const randomButton = document.getElementById("random_button");
      if (randomButton) {
        randomButton.focus();
        randomButton.click();
      }
    };

    Mousetrap.bind(["ctrl+i", "command+i"], handleCtrlIPress);
    Mousetrap.bind(["ctrl+g", "command+g"], handleCtrlGPress);
    Mousetrap.bind("1", handleOnePress);
    Mousetrap.bind("2", handleTwoPress);
    Mousetrap.bind("3", handleThreePress);
    Mousetrap.bind("4", handleFourPress);
    Mousetrap.bind("5", handleFivePress);
    Mousetrap.bind("left", handleLeftPress);
    Mousetrap.bind("up", handleUpPress);
    Mousetrap.bind("right", handleRightPress);
    Mousetrap.bind("down", handleDownPress);
    Mousetrap.bind(["ctrl+s", "command+s"], handleCtrlSPress);
    Mousetrap.bind(["ctrl+p", "command+p"], handleCtrlPPress);
    Mousetrap.bind(["ctrl+r", "command+r"], handleCtrlRPress);

    return () => {
      Mousetrap.unbind(["ctrl+i", "command+i"]);
      Mousetrap.unbind(["ctrl+g", "command+g"]);
      Mousetrap.unbind("1");
      Mousetrap.unbind("2");
      Mousetrap.unbind("3");
      Mousetrap.unbind("4");
      Mousetrap.unbind("5");
      Mousetrap.unbind("left");
      Mousetrap.unbind("up");
      Mousetrap.unbind("right");
      Mousetrap.unbind("down");
      Mousetrap.unbind(["ctrl+s", "command+s"]);
      Mousetrap.unbind(["ctrl+p", "command+p"]);
      Mousetrap.unbind(["ctrl+r", "command+r"]);
    };
  }, []);

  return null;
}
