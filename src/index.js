import React, { useState, useCallback } from "react";
import { storage } from "./firebase";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
import { render } from "@testing-library/react";
import "./index.css";

//functional component for uploading image
const UploadImage = () => {
  const [dragImage, setDragImage] = useState("[]");
  const [imageUrl, setImageUrl] = useState("[]");
  const [temp, setTemp] = useState(null);

  //drag and drop multiple images functionality and set dragged images to a variable temp 
  //using react-drop-zone library
  const onDrop = useCallback((acceptedFiles) => {
    setDragImage(acceptedFiles);
    let di = acceptedFiles.map(di => {return(<li key={di.name}>{di.name}</li>)});
    setTemp(di);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 36700160,
    multiple: true,
  });

  //function for uploading dragged images to firebase storage
  let onUpload = () => {
    for (let i = 0; i < dragImage.length; i++) {
      let image= dragImage[i];
      let firebaseUpload = storage.ref(`images/${image.name}`).put(image);
      firebaseUpload.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setImageUrl(url);
            });
        }
      );
    }
  };

  return (
    <div className="container">
      <h1 className="text heading">Upload Images to Firebase</h1>
      <br />
      <div {...getRootProps()} className="dropzone-box">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text">Drop the files here ...</p>
        ) : (
          <p className="text">Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <p className="text">Dropped files -</p>     
      {temp}
      <button class="button" onClick={onUpload}>Upload Image to Firebase</button>
      <br />
      <img src={imageUrl} alt="Uploaded File" className="image "/>
    </div>
  );
};

render(<UploadImage />, document.querySelector("#root"));
