// Component for rendering forgot password form
// used by forgot page in auth/password
// state and setstate are passed down
// as props from forgot page

import React from "react";
import axios from "axios";

function ForgotPasswordForm({ state, setState }) {
  // Success and error are set to empty on chanhe
  // to remove the success/error message displayed from prior input
  const handleChange = (e) => {
    setState({ ...state, email: e.target.value, success: "", error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/forgot-password`,
        {
          email,
        }
      );
      setState({
        ...state,
        email: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (error) {
      console.log("Forgot password error", error);
      setState({
        ...state,
        buttonText: "Forgot Password",
        error: error.response.data.error,
      });
    }
  };

  const { email, buttonText } = state;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          value={email}
          className="form-control"
          placeholder="Enter your email"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className=" btn btn-outline-primary">{buttonText}</button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
