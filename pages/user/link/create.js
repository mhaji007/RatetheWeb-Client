// Parent component to
// CreateLinkForm
// MediumRadioForm
// TypeRadioForm
// State is passed down to all
// the above components
// each component handles
// onclicks separately and updates
// the state. All the updated values
// are then submitted via handleSubmit in
// CreateLinkForm

// Users can view this page without
// the need of being logged-in
// however they are reqiired to log-in
// to submit the links

// withUser HOC can be used to restrict access and
// hide the page and only allow logged-in user to
// view the page

import { useEffect, useState } from "react";
import axios from "axios";
import CreateLinkForm from "../../../components/forms/CreateLinkForm";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import CategoryCheckboxForm from "../../../components/forms/CategoryCheckboxForm";
import TypeRadioForm from "../../../components/forms/TypeRadioForm";
import MediumRadioForm from "../../../components/forms/MediumRadioForm";

// gitAuth is used for conditionally disabling the submit button
// to allow link submission by authenticated users only.
// If no authenticated user (no token) is found disable the button
import { getCookie, isAuth } from "../../../helpers/auth";

function Create({token}) {
  // State needed for creating the new link
  const [state, setState] = useState({
    title: "",
    url: "",
    // categories user picks
    // for creating a new link
    categories: [],
    // Array of categories
    // we have in application
    // displayed in the checkbox
    loadedCategories: [],
    buttonText: "Submit",
    success: "",
    error: "",
    type: "",
    medium: "",
  });

  const {
    title,
    url,
    categories,
    loadedCategories,
    buttonText,
    success,
    error,
    type,
    medium,
  } = state;

  // Load categories when component mounts using useEffect
  // and when user submits a link successfully to get the
  // fresh list of categories (user might want
  // to submit more than one link)
  useEffect(() => {
    loadCategories();
  }, [success]);

  const loadCategories = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/categories`
    );
    setState({ ...state, loadedCategories: response.data });
  };

  return (
    <>

      <div className="row">
        <div className="col-md-4 my-auto">
          {/* Display categories */}
          <h3 className="text-center">Categories</h3>
          <div className="form-control">
            <ul style={{ maxHeight: "140px", overflowY: "scroll" }}>
              <CategoryCheckboxForm state={state} setState={setState} />
            </ul>
          </div>
          {/* Display types */}
          <h3 className="text-center mt-2">Types</h3>
          <div className="form-control">
            <TypeRadioForm state={state} setState={setState} />
          </div>
          {/* Display medium */}
          <h3 className="text-center mt-2">Medium</h3>
          <div className="form-control">
            <MediumRadioForm state={state} setState={setState} />
          </div>
        </div>
        <div className="col-md-8 text-center">
          <h1>Submit Link</h1>
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <CreateLinkForm state={state} setState={setState} token={token} />
        </div>
        {/* {JSON.stringify(type)}
        {JSON.stringify(medium)} */}
      </div>
    </>
  );
}
// req is avilable on context
Create.getInitialProps = ({req}) =>{
  const token = getCookie("token", req);
  return {token}
}


export default Create;
