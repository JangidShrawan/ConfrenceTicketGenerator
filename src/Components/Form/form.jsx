import React, { useState, useRef } from "react";
import "./form.css";
import { images } from "../../assets/images/images";

const Form = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    avatarFile: {
      value: null,
      error: "",
    },
    userName: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    gitHubName: {
      value: "",
      error: "",
    },
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: {
            value: type === "file" ? (files.length > 0 ? files[0] : null) : value,
            error: "",  // Clear previous error when changing value
        },
    }));
  };


  const fileInputRef = useRef(null);

  const handleDropAreaClick = () => {

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeAvatar = () => {

    setFormData((prevData) => ({
       ...prevData,
        avatarFile: {
            value: null,
            error: "",
        },
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let isValidName = true;
    let isValidEmail = true;
    let isValidFile = true;
    let isValidGit = true;
  
    // Create a temporary variable to hold updated state
    let updatedData = { ...formData };
  
    // Validate username
    if (!updatedData.userName.value.trim()) {
      updatedData.userName.error = "Username is required";
      isValidName = false;
    } else {
      updatedData.userName.error = "";
    }
  
    // Validate email
    if (!updatedData.email.value.trim()) {
      updatedData.email.error = "Email is required";
      isValidEmail = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(updatedData.email.value)) {
      updatedData.email.error = "Please enter a valid email address.";
      isValidEmail = false;
    } else {
      updatedData.email.error = "";
    }
  
    // Validate GitHub username
    if (!updatedData.gitHubName.value.trim()) {
      updatedData.gitHubName.error = "GitHub username is required";
      isValidGit = false;
    } else {
      updatedData.gitHubName.error = "";
    }
  
    // Validate file
    const file = updatedData.avatarFile.value;
    if (!file) {
      updatedData.avatarFile.error = "Avatar file is required";
      isValidFile = false;
    } else if (!['image/png', 'image/jpeg'].includes(file.type)) {
      updatedData.avatarFile.error = "Only PNG and JPG files are allowed.";
      isValidFile = false;
    } else if (file.size > 500 * 1024) {
      updatedData.avatarFile.error = "File too large, please upload a photo under 500kb.";
      isValidFile = false;
    } else {
      updatedData.avatarFile.error = "";
    }
  
    // Update state after all validations
    setFormData(updatedData);
  
    // Submit if all validations pass
    if (isValidFile && isValidEmail && isValidGit && isValidName) {
      onSubmit(updatedData);  // Use updatedData here instead of formData
    }
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
      <p>Secure your spot at next year's biggest coding confrence.</p>
      <div className="input-fields input-field1">
        <label htmlFor="avatar">Upload Avatar</label>
        <div className="drop-area" id="dropArea" onClick={handleDropAreaClick}>
          <input
            type="file"
            name="avatarFile"
            id="avatar"
            ref={fileInputRef}
            onChange={handleChange}
            required
          />
          {
            formData.avatarFile.value? (
              <img
                src={URL.createObjectURL(formData.avatarFile.value)}
                alt=""
                className="preview-avatar" style={{width:'50px', height:'50px', borderRadius:'15%', border: '1px solid hsl(252, 6%, 83%)', marginTop:'6px'}} />) 
                :
            <img src={images.drop} alt="" className="upload-icon" />
          }
          {
            formData.avatarFile.value? 
            <div style={{display:'flex', margin:'7px 0 6px', justifyContent:'center', gap:'7px'}}>
              <button type="button" onClick={(e) =>  {e.stopPropagation(); removeAvatar()}} style={{fontSize:'10px', color:'white', backgroundColor:'hsl(244, 12.20%, 46.50%)', border:'1px solid hsl(245, 19.40%, 73.70%)', borderRadius:'2px', padding:'2px 4px', cursor:'pointer'}}>Remove image</button>
              <button type="button" onClick={(e) =>  {e.stopPropagation(); handleDropAreaClick()}} style={{fontSize:'10px', color:'white', backgroundColor:'hsl(244, 12.20%, 46.50%)', border:'1px solid hsl(245, 19.40%, 73.70%)', borderRadius:'2px', padding:'2px 4px', cursor:'pointer'}}>Change image</button>
            </div> :
            <p className="drop-area-text">Drag and drop or click to upload</p>
          }
        </div>
          {formData.avatarFile.error ? <p style={{ color: "red", fontSize: "12px" }}>{formData.avatarFile.error}</p> : (
            <p className="error-avatar err-message">
              <>
                {" "}
                <img src={images.info} alt="" />{" "}
                <span>Upload your photo (JPG or PNG, max size: 500KB).</span>{" "}
              </>
            </p>
          )}
      </div>
      <div className="input-fields">
        <label htmlFor="userName">Full Name</label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={handleChange}
          value={formData.userName.value}
          required
        />
        {formData.userName.error && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {formData.userName.error}
          </p>
        )}
      </div>
      <div className="input-fields">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email.value}
          placeholder="example@gmail.com"
          required
        />
        {formData.email.error && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {formData.email.error}
          </p>
        )}
      </div>
      <div className="input-fields">
        <label htmlFor="gitHubName">GitHub Username</label>
        <input
          type="text"
          name="gitHubName"
          id="gitHubName"
          onChange={handleChange}
          value={formData.gitHubName.value}
          placeholder="@yourusername"
          required
        />
        {formData.gitHubName.error && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {formData.gitHubName.error}
          </p>
        )}
      </div>
      <div className="input-fields">
        <button type="submit">Generate My Ticket</button>
      </div>
    </form>
  );
};

export default Form;
