// Component for rendering login form
// used by login page
// state and setstate are passed down
// as props from login page

import axios from "axios";
import Link from "next/Link";
import { authenticate } from "../../helpers/auth";
import Router from "next/router";

function LoginForm({ state, setState }) {
  // Dynamic onChange handler
  // used by all inputs
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Login",
    });
  };
  // Destructure state variables
  const { email, password, error, success, buttonText } = state;

  // Using axios with async await
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Logging in..." });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/Login`,
        {
          email,
          password,
        }
      );

      console.log("Response from login", response);
      authenticate(response, () => Router.push("/"));
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Login",
        error: error.response.data.error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          value={email}
          className="form-control"
          placeholder="Enter your email"
          required
          onChange={handleChange("email")}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          className="form-control"
          placeholder="Enter your password"
          required
          onChange={handleChange("password")}
        />
        <div className="form-group"></div>
        <div className="form-group">
          <button className="btn-outline-primary">Login</button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
