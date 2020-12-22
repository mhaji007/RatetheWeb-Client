import { useEffect, useState } from "react";
import axios from "axios";
import CreateLinkForm from "../../../components/forms/CreateLinkForm";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import CategoryCheckboxForm from "../../../components/forms/CategoryCheckboxForm"

function create() {
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
  // and when user submits a link successfully (user might want
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
        <div className="col-md-6 offset-md-3">
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 my-auto pt-3">
            <h3 className="text-center">Categories</h3>
          <div className="form-control">
            <ul style={{maxHeight:"130px", overflowY:"scroll"}}><CategoryCheckboxForm state={state} setState={setState}/></ul>
          </div>
        </div>
        <div className="col-md-8 text-center">
          <h1>Submit Link/URL</h1>
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <CreateLinkForm state={state} setState={setState} />
        </div>
      </div>

    </>
  );
}

export default create;
