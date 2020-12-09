import { useState } from "react";
import RegisterForm from "../components/forms/RegisterForm"

const Register = () => {

    const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      error: "",
      success:"",
      buttonText:"Register"
    });

  return (
    <div className="col-md-6 offset-md-3 text-center">
      <h1>Register</h1>
      <br />
      <RegisterForm state={state} setState={setState} />
      <br />
      {JSON.stringify(state)}
    </div>
  );



}

export default Register
