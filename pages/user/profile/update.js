// Page responsible for displaying the register form

import { useState, useEffect } from "react";
import UpdateUserForm from "../../../components/forms/UpdateUserForm";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import withUser from "../../withUser"


const UpdateProfile = ({user, token}) => {
  // State for storing all user input fields
  const [state, setState] = useState({
    name: user.name,
    email: user.email,
    password: "",
    error: "",
    success: "",
    buttonText: "Update Profile",
    // Existing category
    // from server
    loadedCategories: [],
    // Selected categories to
    // be sent back to server
    categories: user.categories
  });

  // Load categories when component mounts using useEffect
  // Display categories upon registering for user to
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
        <h1 className="text-center mb-2">UpdateProfile</h1>
        <br />
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <UpdateUserForm state={state} setState={setState} token={token} />
        <br />
        {/* {JSON.stringify(state)} */}
      </div>
    </>
  );
};

export default withUser(UpdateProfile);
