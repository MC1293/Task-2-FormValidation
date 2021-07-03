import { useState } from "react";

const useInputdropdown1 = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");

  const valueIsValid = validateValue(enteredValue);

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const reset = (event) => {
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    valueChangeHandler,
    reset,
  };
};

export default useInputdropdown1;
