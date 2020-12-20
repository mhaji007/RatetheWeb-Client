// Page responsible for displaying
// CreateCategoryForm

// used to make user and token available to the page
import withAdmin from "../../withAdmin";
import { useState } from "react";
import CreateCategoryForm from "../../../components/forms/CreateCategoryForm"
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";

// user and token are retrieved through
// the help of withAdmin
function Create({user, token}) {
  const [state, setState] = useState({
    name: "",
    content: "",
    error: "",
    success: "",
    // formData is a browser API
    // and is not available serverside
    // to have the formData we need
    // to make sure we are on browser side
    formData: process.browser && new FormData(),
    buttonText: "Create",
    // Text displayed on the image file picker
    imageUploadText: "Upload image",
  });
  // Destructure state variables for ease of usse
  const {
    success,
    error,
  } = state;

  return (
    <div>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1>Create Category</h1>
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <CreateCategoryForm state={state} setState={setState} token={token} />
        </div>
      </div>
    </div>
  );
}

export default withAdmin(Create);
