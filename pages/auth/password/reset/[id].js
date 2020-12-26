// Page for resetting user's password

import { useState, useEffect } from "react";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../../../../helpers/alerts";
import Router, { withRouter } from "next/router";
// for decoding and displaying the name of the user off token
import jwt from "jsonwebtoken";

import React from "react";
import ResetPasswordForm from "../../../../components/forms/ResetPasswordForm";


function ResetPassword({ router }) {
  const [state, setState] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Forgot Password",
    success: "",
    error: "",
  });

  const { name, token, newPassword, buttonText, success, error } = state;

  useEffect(() => {
    // Name is decoded off token just in case
    // we'd like to address the user by their name
    // that was used in token creation (i.e., better UI)
    const decoded = jwt.decode(router.query.id);
    if (decoded)
      setState({ ...state, name: decoded.name, token: router.query.id });
    return () => {};
  }, [router]);

  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1>Reset Password</h1>
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <ResetPasswordForm state={state} setState={setState} />
          <br />
          {/* {JSON.stringify(state)} */}
        </div>
      </div>
    </>
  );
}

export default withRouter(ResetPassword);
