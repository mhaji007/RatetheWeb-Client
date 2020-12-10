// Page responsible for displaying the register form


import { useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import {showSuccessMessage, showErrorMessage} from "../helpers/alerts"

const Register = () => {
  // State for storing all user input fields
    const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      error: "",
      success:"",
      buttonText:"Register"
    });

    const {success, error} =state;

  return (
    <>
      <div className="col-md-6 offset-md-3 text-center">
        <h1>Register</h1>
        <br />
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <br />
        <RegisterForm state={state} setState={setState} />
        <br />
        {JSON.stringify(state)}
      </div>
    </>
  );



}

export default Register
