// Dynamic route for receiving the token.
// When user clicks on the verification email
// that contains the token, they land on this page
// where token is retrieved from the url and sent
// back to the server for registering the account
// and saving user information to the database

// Note to self:
// useRouter is a hook and can be used in functional components.
// It cannot however be used in class components.
// withRouter, on the other hand, can be used in both functional and class components,
// since it's a HOC, a higher order component. But with class components there
// is no other choice than to use withRouter.

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
    // Token is retrieved from the url via
    // withRouter HOC from next
    let token = router.query.id;
    if (token) {
      // JWT can be used both on the server and the client.
      // The only  reason we are retrieving the decoded name
      // is to make the app more user friendly by addressing
      // users via their name
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, [router]);

  // Function for making post request to backend
  // token is passed in and is decoded on the server
  // where name, username, and password is retrieved
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
          <p> You're almost there! Let's activate your account. </p>
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
