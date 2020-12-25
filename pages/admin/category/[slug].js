// Page responsible for displaying the
// category update form

import axios from 'axios';
import { useState } from "react";
import UpdateCategoryForm from "../../../components/forms/UpdateCategoryForm";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import withAdmin from '../../withAdmin';

// oldCategory from getInitialProps and token from withAdmin
// are passed as props
const Update = ({ oldCategory, token }) => {
    const [state, setState] = useState({
        name: oldCategory.name,
        error: '',
        success: '',
        buttonText: 'Update',
        imagePreview: oldCategory.image.url,
        image: ''
    });
    const [content, setContent] = useState(oldCategory.content);
    const [imageUploadButtonName, setImageUploadButtonName] = useState('Update Image');

    const { success, error } = state;

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Update category</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <UpdateCategoryForm
            state={state}
            setState={setState}
            oldCategory={oldCategory}
            content={content}
            setContent={setContent}
            imageUploadButtonName={imageUploadButtonName}
            setImageUploadButtonName={setImageUploadButtonName}
            token={token}
          />
        </div>
      </div>
    );
};

// Need to grab slug from url make request to backend and prepopulate the form
// by the time user lands on the page. For this we use getInitialProps
// token is available via withAdmin HOC
Update.getInitialProps = async ({ req, query, token }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/category/${query.slug}`);
    return { oldCategory: response.data.category, token };
};

export default withAdmin(Update);
