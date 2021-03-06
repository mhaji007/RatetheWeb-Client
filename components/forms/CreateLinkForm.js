// Component for rendering create link form
// used by create page in pages/user/link/create
// state and setstate are passed down
// as props from create page


import axios from "axios";
import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../helpers/auth";

function CreateLinkForm({ state, setState, token }) {
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Submit",
    });
  };
  // Destructure state variables
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

  const handletitleChange = (e) => {
    setState({ ...state, title: e.target.value, error: "", success: "" });
  };

  const handleURLChange = (e) => {
    setState({ ...state, url: e.target.value, error: "", success: "" });
  };

  // Using axios with async await
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Submitting..." });
    // console.table({title, url, categories, type, medium})
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/link`,
        {
          title,
          url,
          categories,
          type,
          medium,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setState({
        ...state,
        title: "",
        url: "",
        success: "Your link was successfully submitted",
        error: "",
        loadedCategories:[],
        categories:[],
        medium:"",
        type:"",
        buttonText:"Submitted"
      });
    } catch (error) {
      console.log("Link submission error", error);
      setState({
        ...state,
        buttonText: "Submit",
        error: error.response.data.error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          value={title}
          className="form-control"
          placeholder="Enter a title"
          // If required is set
          // and we also have our own validation
          // message, the default form html validation message
          // take precedence
          // required
          onChange={handletitleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">URL</label>
        <input
          type="url"
          value={url}
          className="form-control"
          placeholder="Enter a link"
          // If required is set
          // and we also have our own validation
          // message, the default form html validation message
          // take precedence
          // required
          onChange={handleURLChange}
        />
      </div>

      <div className="form-group">
        <button disabled={!token} className="btn btn-outline-primary">
          {isAuth() || token ? `${buttonText}` : "Log in to post"}
        </button>
      </div>
    </form>
  );
}

export default CreateLinkForm;
