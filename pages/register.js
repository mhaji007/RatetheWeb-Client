// Page responsible for displaying the register form

import { useState, useEffect } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import axios from "axios"
import {showSuccessMessage, showErrorMessage} from "../helpers/alerts"

const Register = () => {
  // State for storing all user input fields
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
    // Existing category
    // from server
    loadedCategories:[],
    // Selected categories to
    // be sent back to server
    categories:[]
  });

  // Load categories when component mounts using useEffect
  // Display categories on upon registering for user to
  // pick at least one from
  // Once another user posts a link in that category
  // our user will be notified via email
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/categories`
    );
    setState({ ...state, loadedCategories: response.data });
  };

  const { success, error } = state;

  return (
    <>
      <div className="col-md-6 offset-md-3 ">
        <h1 className="text-center mb-0">Register</h1>
        <br />
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <br />
        <RegisterForm state={state} setState={setState} />
        <br />
        {/* {JSON.stringify(state)} */}
      </div>
    </>
  );
}

export default Register
