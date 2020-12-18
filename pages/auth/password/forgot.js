import { useState, useEffect } from "react";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import Router from "next/router";
import ForgotPasswordForm from "../../../components/forms/ForgotPasswordForm";

import React from "react";

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    token: "",
    buttonText: "Forgot Password",
    success: "",
    error: "",
  });

  const { email, buttonText, success, error } = state;

  return (
    <>
    <div className="row">

      <div className="col-md-6 offset-md-3 text-center">
        <h1>Password Recovery</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <ForgotPasswordForm state={state} setState={setState} />
        <br />
        {/* {JSON.stringify(state)} */}
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
