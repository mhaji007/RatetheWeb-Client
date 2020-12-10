// Component for rendering register form
// used by register page
// state and setstate are passed down
// as props from register page

import axios from "axios";

function RegisterForm({ state, setState }) {
  // Dynamic onChange handler
  // used by all inputs
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };
  // Destructure state variables
  const { name, email, password, error, success, buttonText } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Registering..." });
    // console.table({name, email, password});
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/register`, {
        name,
        email,
        password,
      })
      .then((response) => {
        setState({
          ...state,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
          success: response.data.message,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          buttonText: "Register",
          error: error.response.data.error,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={name}
          className="form-control"
          placeholder="Enter your name"
          // pass name of each input to onChange handler
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          value={email}
          className="form-control"
          placeholder="Enter your email"
          onChange={handleChange("email")}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          className="form-control"
          placeholder="Enter your password"
          onChange={handleChange("password")}
        />
        <div className="form-group"></div>
        <div className="form-group">
          <button className="btn-outline-primary">Register</button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
