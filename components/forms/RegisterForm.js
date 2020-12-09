function RegisterForm({ state, setState }) {
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };

  const {name, email, password, error, success, buttonText} = state;

  const handleSubmit = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={name}
          className="form-control"
          placeholder="Enter your name"
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
