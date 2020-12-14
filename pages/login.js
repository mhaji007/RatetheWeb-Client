// Page responsible for displaying the login form

import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";


const Login = () => {
  // State for storing all user input fields
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const { success, error } = state;

  return (
    <>
      <div className="col-md-6 offset-md-3 text-center">
        <h1>Login</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <LoginForm state={state} setState={setState} />
        <br />
        {/* {JSON.stringify(state)} */}
      </div>
    </>
  );
};

export default Login;
