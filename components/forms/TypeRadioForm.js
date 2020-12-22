import React from "react";

function TypeRadioForm({ state, setState }) {
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

  const handleTypeClick = (e) => {
    setState({...state, type:e.target.value, success:"", error:""})
  };

  return (
    <>
      <div className="form-check pl-5">
        <label className="form-check-label ml-2">
          {/* Radio buttons can be only checked one at a time.
           The value of checked is based on the state value of type
          if type has a value of free, checkbox is checked */}
          <input
            type="radio"
            onClick={handleTypeClick}
            checked={type === "free"}
            value="free"
            className="form-check-input"
          />
          Free
        </label>
      </div>
      <div className="form-check pl-5">
        <label className="form-check-label ml-2">
          <input
            type="radio"
            onClick={handleTypeClick}
            checked={type === "paid"}
            value="paid"
            className="form-check-input"
          />
          Paid
        </label>
      </div>
    </>
  );
}

export default TypeRadioForm;
