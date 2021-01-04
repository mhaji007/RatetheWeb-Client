// Component for create category form
// used by create in pages/admin/category/create

import dynamic from "next/dynamic";
// used to make user and token available to the page

// We need to use dynamic since React quill
// run in client-side mode by default
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import axios from "axios";
import "react-quill/dist/quill.bubble.css";

import Resizer from "react-image-file-resizer";

function CreateCategoryForm({
  state,
  setState,
  content,
  setContent,
  token,
  imageUploadButtonName,
  setImageUploadButtonName,
}) {
  const handleChange = (name) => (e) => {
    //================== Needed when uploading image via formData ============================ //

    // const value = name === "image" ? e.target.files[0] : e.target.value;
    // const imageName =
    //   name === "image" ? event.target.files[0].name : "Upload image";
    // Set dynamic name and value in formData
    // have the formData ready to send to backend
    // on submit
    // formData.set(name, value);

    // the value then is set in setState via [name]: value instead of e.target.value
    //    setState({
    //     ...state,
    //     [name]: vlaue,
    //     error: "",
    //     success: "",
    //     imageUploadText: imageName,
    //   });
    // };
    // ======================================================================================= //

    //================== Needed when uploading image via base64 data ============================ //
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
    });
    //=========================================================================================== //
  };

  const handleContent = (e) => {
    console.log(e);
    setContent(e);
    setState({ ...state, success: "", error: "" });
  };

  //================== Needed when uploading image via base64 data ============================ //

  // resize image client side
  const handleImage = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    setImageUploadButtonName(event.target.files[0].name);
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        //size
        300,
        300,
        "JPEG",
        //quality
        100,
        0,
        (uri) => {
          // console.log(uri);
          setState({ ...state, image: uri, success: "", error: "" });
        },
        "base64"
      );
    }
  };
  //============================================================================================= //

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

        // Needed when uploading image via formData
        // formData,

        // Needed when uploading image via base64
        { name, content, image },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category create response", response);
      // Needed when uploading image via base64
      // Revert image upload button to default text
      setImageUploadButtonName("Upload Image");

      // Clear rich text editor
      setContent("")

      setState({
        ...state,
        name: "",
        formData: "",
        buttonText: "Created",

        // Needed when uploading image via formData
        // imageUploadText: "Upload image",

        success: `Category ${response.data.name} successfully created`,
      });
    } catch (error) {
      console.log("Category create error", error);
      setState({
        ...state,
        buttonText: "Create",
        error: error.response.data.error,
      });
    }
  };

  const {
    name,
    error,
    success,
    formData,
    buttonText,
    imageUploadText,
    image,
  } = state;

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
        {/* <textarea
          onChange={handleChange("content")}
          value={content}
          type="text"
          className="form-control"
          required
        /> */}

        <ReactQuill
          value={content}
          onChange={handleContent}
          theme="bubble"
          placeholder="Enter content..."
          className="pb-5 mb-5"
          style={{ border: "1px solid #666" }}
        />
      </div>
      <div className="form-group">
        <label className="btn btn-outline-secondary">
          {/* Needed when uploading image via fileData */}
          {/* {imageUploadText} */}

          {/* Needed when uploading base64 image */}
          {imageUploadButtonName}

          {/* No value prop here since
          value is used to calculate form data
          for content and name only */}
          <input
            // Needed when uploading image via formData
            // onChange={handleChange("image")}

            // Needed when uploading image via base64 data
            onChange={handleImage}
            type="file"
            accept="image/*"
            className="form-control"
            hidden
          />
        </label>
      </div>

      <div className="form-group">
        <button className="btn btn-outline-primary">{buttonText}</button>
      </div>
    </form>
  );
}

export default CreateCategoryForm;
