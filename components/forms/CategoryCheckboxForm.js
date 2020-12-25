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
          {/* Regarding the check property:
          This is useful for when CategoryCheckboxForm is reused in
          user/link/[id] as part of prepopulating the old data in link update process.
          What it does it it loops through the whole loadedCategories from server and check
          if in a category array selected by the user, there is a category that has the same
          id of any loadedCategories is found. If true, set that category to checked  */}
          <input type="checkbox" onChange={handleToggle(c._id)} checked={categories.includes(c._id)}/>
          <label className="form-check-label ml-2">{c.name}</label>
           </li>
      )
      )
    )

}

export default CategoryCheckboxForm

