import "../styles/controlledinput.css";
import { Dispatch, SetStateAction } from "react";


interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  ariaDescription: string;
  placeholder: string;
  className: string;
}

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  placeholder,
  className,
  ariaDescription,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
      aria-description={ariaDescription}
    ></input>
  );
}
