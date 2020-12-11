import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";

import { withRouter } from "next/router";

// Token is availabe on id
const ActivateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = state;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      // JWT can be used both on the server and the client
      // The only  reason we are retrieving the decoded name
      // is to make our app more user friendly by addressing
      // users via their name
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, []);

  const clickSubmit = async (e) => {
    e.preventDefault();
    console.log("activate account");
    setState({ ...state, buttonText: "Activating..." });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register/activate`,
        { token }
      );
      setState({
        ...state,
        token: "",
        buttonText: "Activated",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Activate Account",
        error: error.response.data.error,
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Hello {name}, </h1>
          <p>Ready to activate your account? </p>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <button
            className="btn-outline-primary btn-block"
            onClick={clickSubmit}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(ActivateAccount);
