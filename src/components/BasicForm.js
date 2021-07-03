import useInput from "../hooks/use-input";
import useInputRadiobtn from "../hooks/use-input-radio";
import useInputdropdown from "../hooks/use-input-dropdown";
import useInputdropdown1 from "../hooks/use-input-dropdown1";
import { useState } from "react";

const pattern = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,0-9.<>\/?]+/);
const isNotEmpty = (value) => value.trim() !== "" && !pattern.test(value);
const isAge = (value) => value > 15;
const isGender = (value) => value.trim() !== "";
const isAddress = (value) => value.trim() !== "";
const isMartialStatus = (value) => value.trim() !== "";
const isChild = (value) => value.trim() !== "";
let ismartialValue = false;
const BasicForm = (props) => {
  const [enterTermsVal, setenterTermsVal] = useState(false);
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: ageValue,
    isValid: ageIsValid,
    hasError: ageHasError,
    valueChangeHandler: ageChangeHandler,
    inputBlurHandler: ageBlurHandler,
    reset: resetAge,
  } = useInput(isAge);

  const {
    value: genderValue,
    isValid: genderIsValid,
    hasError: genderHasError,
    valueChangeHandler: genderChangeHandler,
    reset: resetGender,
  } = useInputdropdown(isGender);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isAddress);

  const {
    value: martialValue,
    isValid: martialIsValid,
    valueChangeHandler: martialChangeHandler,
    reset: resetMartial,
  } = useInputRadiobtn(isMartialStatus);

  const {
    value: childValue,
    valueChangeHandler: childChangeHandler,
    reset: resetChild,
  } = useInputdropdown1(isChild);

  if (martialValue === "married") {
    ismartialValue = true;
  } else {
    ismartialValue = false;
  }

  const handleTermsChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    //  const name = target.name;
    setenterTermsVal(value);
  };

  const resetTerms = () => {
    setenterTermsVal(false);
  };

  let formIsValid = false;
  if (
    firstNameIsValid &&
    lastNameIsValid &&
    ageIsValid &&
    genderIsValid &&
    addressIsValid &&
    martialIsValid &&
    enterTermsVal
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const formdata = {
      firstname: firstNameValue,
      lastname: lastNameValue,
      age: ageValue,
      gender: genderValue,
      address: addressValue,
      status: martialValue,
      children: childValue,
    };

    console.log("Submitted!");

    props.onSubmitData(formdata);

    resetFirstName();
    resetLastName();
    resetAge();
    resetGender();
    resetAddress();
    resetMartial();
    resetChild();
    resetTerms();
  };

  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const ageClasses = ageHasError ? "form-control invalid" : "form-control";
  const addressClasses = addressHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">
              Please enter a first name,*Without Numbers and SpecialCharacter.
            </p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">
              Please enter a last name,*Without Numbers and SpecialCharacter.
            </p>
          )}
        </div>
      </div>
      <div className="control-group">
        <div className={ageClasses}>
          <label htmlFor="name">Age</label>
          <input
            type="text"
            id="name"
            value={ageValue}
            onChange={ageChangeHandler}
            onBlur={ageBlurHandler}
          />
          {ageHasError && (
            <p className="error-text">
              Please enter a Valid Age,*Age must be above 15 Years.
            </p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="gender">Gender</label>
          <select onChange={genderChangeHandler} value={genderValue}>
            <option defaultValue value="male">
              Male
            </option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
          </select>
          {genderHasError && (
            <p className="error-text">Please select Gender.</p>
          )}
        </div>
      </div>
      <div>
        <div className={addressClasses}>
          <label htmlFor="address">
            Address
            <textarea
              id="address"
              rows={3}
              style={
                ({ minHeight: 100 },
                {
                  minWidth: 885,
                })
              }
              value={addressValue}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
            />
          </label>
          {addressHasError && (
            <p className="error-text">
              Please enter a Valid Address,*Address cannot be blank.
            </p>
          )}
        </div>
      </div>
      <div>
        <div onChange={martialChangeHandler} value={martialValue}>
          <input type="radio" value="single" name="gender" /> Single
          <input type="radio" value="married" name="gender" /> Married
        </div>
        <div>
          {ismartialValue && (
            <div>
              <label htmlFor="children">No of Children's</label>
              <select onChange={childChangeHandler} value={childValue}>
                <option value="zero">0</option>
                <option value="one">1</option>
                <option value="two">2</option>
                <option value="three">3</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <input type="checkbox" onChange={handleTermsChange} />
          Terms And Coditions ,Read the before Submitting the information
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
