// Page responsible for displaying update link
// form

// On naming the files:
// For pages that are to be displayed to user ==> slug
// For pages that are meant for update ==> id

import { useEffect, useState } from "react";
import axios from "axios";
import withUser from "../../withUser";
import UpdateLinkForm from "../../../components/forms/UpdateLinkForm";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import CategoryCheckboxForm from "../../../components/forms/CategoryCheckboxForm";
import TypeRadioForm from "../../../components/forms/TypeRadioForm";
import MediumRadioForm from "../../../components/forms/MediumRadioForm";

// isAuth is used for conditionally disabling the submit button
// to allow link submission by authenticated users only.
// If no authenticated user (no token) is found disable the button
import { getCookie, isAuth } from "../../../helpers/auth";

function Update({ oldLink, token }) {
  // State needed for creating the new link
  const [state, setState] = useState({
    title: oldLink.title,
    url: oldLink.url,
    // categories user picks
    // for creating a new link
    categories: oldLink.categories,
    // Array of categories
    // we have in application
    // displayed in the checkbox
    loadedCategories: [],
    buttonText: "Submit",
    success: "",
    error: "",
    type: oldLink.type,
    medium: oldLink.medium,
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
          <h1>Update Link</h1>
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <UpdateLinkForm state={state} setState={setState} token={token} oldLink={oldLink} />
        </div>
        {/* {JSON.stringify(type)}
        {JSON.stringify(medium)} */}
      </div>
    </>
  );
}
// req is avilable on context
Update.getInitialProps = async ({ req, token, query }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/link/${query.id}`);
  return {oldLink: response.data, token}
};

export default withUser(Update);
