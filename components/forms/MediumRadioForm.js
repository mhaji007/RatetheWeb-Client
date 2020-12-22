import React from 'react'

function MediumRadioForm({state, setState}) {
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
   const handleMediumClick = (e) => {
     setState({ ...state, medium: e.target.value, success: "", error: "" });
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
             onClick={handleMediumClick}
             checked={medium === "video"}
             value="video"
             className="form-check-input"
           />
           Video
         </label>
       </div>
       <div className="form-check pl-5">
         <label className="form-check-label ml-2">
           <input
             type="radio"
             onClick={handleMediumClick}
             checked={medium === "article"}
             value="article"
             className="form-check-input"
           />
           Article
         </label>
       </div>
     </>
   );
}

export default MediumRadioForm
