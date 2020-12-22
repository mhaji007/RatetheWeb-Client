// Component for rendering create link form
// used by create page in pages/user/link/create
// state and setstate are passed down
// as props from create page

// Users can view this page without
// the need of being logged-in
// however they are reqiired to log-in
// to actually submit the links

// We can use withUser HOC to
// hide the page and only allow logged-in user to
// view the page

import axios from "axios";
import { useEffect } from "react";
import Link from "next/Link";
import Router from "next/router";

function CreateLinkForm({ state, setState }) {
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
    setState({...state, title: e.target.value, error:"", success:""})
   }

   const handleURLChange = (e) => {
    setState({...state, url: e.target.value, error:"", success:""})
   }

  // Using axios with async await
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Logging in..." });
    console.table({title, url, categories, type, medium})
    try {

    } catch (error) {
      console.log(error);
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
          required
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
          required
          onChange={handleURLChange}
        />
      </div>

      <div className="form-group">
        <button className="btn btn-outline-primary">{buttonText}</button>
      </div>
    </form>
  );
}

export default CreateLinkForm;
