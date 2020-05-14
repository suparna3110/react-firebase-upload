import React, { useState } from 'react';
import {storage} from "./firebase";
import ReactDOM from 'react-dom';
import {useDropzone} from "react-dropzone";
import { render } from '@testing-library/react';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({multiple:true, maxSize:36700160});
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const uploadChange = (e) => {
    if (e.target.files[0]){
      setImage(e.target.files[0]);
    }
  };

  const onUpload = () => {
    const firebaseUpload = storage.ref(`images/${image.name}`).put(image);
    firebaseUpload.on("state_changed", snapshot => {}, error => {console.log(error);},() => {
      storage.ref("images").child(image.name).getDownloadURL().then(url => {
        console.log(url);
        setImageUrl(url);
      });
    });
  };

  return (
    <div>
      <input type="file" onChange={uploadChange}/>
      <button onClick={onUpload}>Upload Image</button>
      <img src={imageUrl} alt="Images" />
      <br/>
      <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
    </div>
    
  );
};

render(<UploadImage/>, document.querySelector("#root"));