// Component for rendering reset password form
// used by forgot page in auth/password/[id]
// state and setstate are passed down
// as props from forgot page

import React from "react";
import axios from "axios";


function ResetPasswordForm({ state, setState }) {
  // Success and error are set to empty on chanhe
  // to remove the success/error message displayed from prior input
  const handleChange = (e) => {
    setState({ ...state, newPassword: e.target.value, success: "", error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Sending" });
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/reset-password`,
        {
          resetPasswordLink: token,
          newPassword,
        }
      );
      setState({
        ...state,
        newPassword: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (error) {
      console.log("Reset password error", error);
      setState({
        ...state,
        buttonText: "Reset Password",
        error: error.response.data.error,
      });
    }
  };

  const { name, newPassword, token, error, success, buttonText } = state;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          value={newPassword}
          className="form-control"
          placeholder="Enter new password"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn-outline-primary">Reset Password</button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
