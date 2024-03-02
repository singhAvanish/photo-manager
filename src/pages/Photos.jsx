import React from "react";
import { useFirebase } from "../context/Context";
import "../App.css";

const Photos = () => {
  const firebase = useFirebase();
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.UploadImage();
  };
  return (
    <div className="photo-main">
      <div className="photo-form">
        <input
          className="input photo-input"
          type="file"
          onChange={firebase.handleFileChange}
        ></input>
        <button className="btn" onClick={handleSubmit}>
          Upload Image
        </button>
      </div>
      <hr />

      <div className="photo">
        {firebase.imageList.map((url) => {
          return <img className="photos" src={url}></img>;
        })}
      </div>
    </div>
  );
};

export default Photos;
