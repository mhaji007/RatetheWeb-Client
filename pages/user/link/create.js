import {useEffect, useState} from 'react';
import axios from "axios";
import CreateLinkForm from "../../../components/forms/CreateLinkForm";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";


function create() {
// State needed for creating the new link
  const [state, setState] = useState({
    title:"",
    url:"",
    // categories user picks
    // for creating a new link
    categories:[],
    // Array of categories
    // we have in application
    // displayed in the checkbox
    loadedCategories:[],
    success:"",
    error:"",
    type:"",
    medium:""
  })

  const {title, url, categories, loadedCategories, success, error, type, medium} = state;

  // Load categories when component mounts using useEffect
  // and when user submits a link successfully (user might want
  // to submit more than one link)
  useEffect(() => {
    loadCategories();
  }, [success]);

  const loadCategories =async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/categories`);
    setState({...state, loadedCategories: response.data})
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Submit Link/URL</h1>
        <br />
        {JSON.stringify(loadedCategories)}
      </div>
    </div>
  );
}

export default create
