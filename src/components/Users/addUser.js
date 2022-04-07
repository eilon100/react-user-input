import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./addUser.module.css";
import Button from "../Button/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [enteredUserName, SetEnteredUserName] = useState("");
  const [enteredUserAge, SetEnteredUserAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    

    if (enteredUserName.trim() === 0 || enteredUserAge.trim() === 0) {
      setError({
        title: "Invalid Input",
        message: "please enter a valid name and age (non empty values)",
      });
      return;
    }

    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid Age",
        message: "please enter a valid Age(> 0).",
      });
      return;
    }

    props.onAddUser(enteredUserName, enteredUserAge);

    SetEnteredUserName("");
    SetEnteredUserAge("");
  };

  const userNameFunction = (event) => {
    SetEnteredUserName(event.target.value);
  };

  const userAgeFunction = (event) => {
    SetEnteredUserAge(event.target.value);
  };
  const ErrorMessageOnClick = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClick={ErrorMessageOnClick}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">userName</label>
          <input
            id="username"
            type="text"
            value={enteredUserName}
            onChange={userNameFunction}
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            value={enteredUserAge}
            onChange={userAgeFunction}
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
