import { useState } from "react";

const useInputdropdown = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("male");

  const valueIsValid = validateValue(enteredValue);

  const hasError = !valueIsValid;
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const reset = () => {
    setEnteredValue("male");
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    reset,
  };
};

export default useInputdropdown;
