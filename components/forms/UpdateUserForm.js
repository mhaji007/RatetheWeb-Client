// Component for rendering register form
// used by register page
// state and setstate are passed down
// as props from register page

import axios from "axios";
import { useEffect } from "react";
import { isAuth, updateUser } from "../../helpers/auth";
import Router from "next/router";

function UpdateUserForm({ state, setState, token }) {
  // Dynamic onChange handler
  // used by all inputs
  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Update",
    });
  };

  // Function for adding toggled
  // checkboxes to categories array
  const handleToggle = (c) => (e) => {
    // Look to to see whether
    // category id of the item toggled
    // already exists in the category array
    // Return first index or -1
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log("all >> categories", all);
    setState({ ...state, categories: all, success: "", error: "" });
  };

  const displayCategories = () => {
    return (
      loadedCategories &&
      loadedCategories.map((c, i) => (
        <li className="list-unstyled" key={c._id}>
          {/* Regarding the check property:
          This is useful for when CategoryCheckboxForm is reused in
          user/link/[id] as part of prepopulating the old data in link update process.
          What it does it it loops through the whole loadedCategories from server and check
          if in a category array selected by the user, there is a category that has the same
          id of any loadedCategories is found. If true, set that category to checked  */}
          <input
            type="checkbox"
            onChange={handleToggle(c._id)}
            checked={categories.includes(c._id)}
          />
          <label className="form-check-label ml-2">{c.name}</label>
        </li>
      ))
    );
  };

  // Destructure state variables
  const {
    name,
    email,
    password,
    buttonText,
    categories,
    loadedCategories,
    error,
    success,
  } = state;

  // Using axios with async await
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({
    //   name,
    //   email,
    //   password,
    //   categories,
    // });
    setState({ ...state, buttonText: "Updating..." });
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/user`,
        {
          name,
          password,
          categories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      updateUser(response.data, () => {
        setState({
          ...state,
          success: "Your link was successfully updated",
          buttonText: "Updated",
        });
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Update",
        error: error.response.data.error,
      });
    }
  };

  // Using axios with promises

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setState({ ...state, buttonText: "Registering..." });
  //   // console.table({name, email, password});
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_API}/register`, {
  //       name,
  //       email,
  //       password,
  //     })
  //     .then((response) => {
  //       setState({
  //         ...state,
  //         name: "",
  //         email: "",
  //         password: "",
  //         buttonText: "Submitted",
  //         success: response.data.message,
  //       });
  //     })
  //     .catch((error) => {
  //       setState({
  //         ...state,
  //         buttonText: "Register",
  //         error: error.response.data.error,
  //       });
  //     });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={name}
          className="form-control"
          placeholder="Enter your name"
          required
          // pass name of each input to onChange handler
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          value={email}
          className="form-control"
          placeholder="Enter your email"
          required
          onChange={handleChange("email")}
          disabled
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          className="form-control"
          placeholder="Enter your password"
          onChange={handleChange("password")}
        />

        <div className="form-group mt-3  ">
          <p>Please select at least one category of interest</p>
          <ul
            style={{ maxHeight: "140px", overflowY: "scroll" }}
            className="p-0"
          >
            {displayCategories()}
          </ul>
          <div className="form-group ">
            <p className="text-center">
              <button className="btn btn-outline-primary">{buttonText}</button>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserForm;
