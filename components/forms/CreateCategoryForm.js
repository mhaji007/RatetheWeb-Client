import React from "react";
import axios from "axios";

function CreateCategoryForm({ state, setState, token }) {
  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    const imageName =
      name === "image" ? event.target.files[0].name : "Upload image";
    // Set dynamic name and value in formData
    // have the formData ready to send to backend
    // on submit
    formData.set(name, value);

    setState({
      ...state,
      [name]: value,
      error: "",
      success: "",
      imageUploadText: imageName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Change the button text upon submitting
    setState({ ...state, buttonText: "Creating" });
    // Image will be uploaded to S3 from server
    // slug, timpestamps and id are dynamically generated
    // There is only a need for sending name. content and
    // the actual raw image path
    // console.log(...formData);

    // Send form data (name and content) to server
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category create response", response);
      setState({
        ...state,
        name: "",
        formData: "",
        buttonText: "Created",
        imageUploadText: "Upload image",
        success:`Category ${response.data.name} successfully created`
      });
    } catch (error) {
      console.log("Category create error", error);
      setState({
        ...state,
        name: "",
        buttonText: "Create",
        error: error.response.data.error,
      });
    }
  };

  const { name, content, error, success, formData, buttonText, imageUploadText } = state;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Content</label>
        <textarea
          onChange={handleChange("content")}
          value={content}
          type="text"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label className="btn btn-outline-secondary">
          {imageUploadText}
          {/* No value prop here since
          value is used to calculate form data
          for content and name only */}
          <input
            onChange={handleChange("image")}
            type="file"
            accept="image/*"
            className="form-control"
            hidden
          />
        </label>
      </div>

      <div className="form-group">
        <button className="btn-outline-primary">{buttonText}</button>
      </div>
    </form>
  );
}

export default CreateCategoryForm;
