// Returns an unordered list
// and is displayed in a ul in pages/user/link/create

import React from 'react'


function CategoryCheckboxForm({state, setState}) {
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

    // Function for adding toggled
    // checkboxes to categories array
    const handleToggle = (c) => (e) => {
    // Look to to see whether
    // category id of the item toggled
    // already exists in the category array
    // Return first index or -1
    const clickedCategory = categories.indexOf(c)
    const all = [...categories]

    if(clickedCategory === -1) {
      all.push(c)
    } else {
      all.splice(clickedCategory, 1)
    }
    console.log("all >> categories", all);
    setState({...state, categories: all, success:"", error:""})
  };

    // Function for displaying all
  // the available categories
  // for user to pick

    return (
      loadedCategories &&
      loadedCategories.map(
        (c, i) => (
        <li className="list-unstyled" key={c._id}>
          <input type="checkbox" onChange={handleToggle(c._id)} />
          <label className="form-check-label ml-2">{c.name}</label>
           </li>
      )
      )
    )

}

export default CategoryCheckboxForm

