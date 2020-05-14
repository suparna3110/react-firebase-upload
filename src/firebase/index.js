import firebase from "firebase/app";
import "firebase/storage";

// configuration and initializing of firebase config

const firebaseConfig = {
    apiKey: "AIzaSyDmovE9oFj3jKsVTfm_nP-LF9kBV0P3Ncs",
    authDomain: "react-upload-image-7f38d.firebaseapp.com",
    databaseURL: "https://react-upload-image-7f38d.firebaseio.com",
    projectId: "react-upload-image-7f38d",
    storageBucket: "react-upload-image-7f38d.appspot.com",
    messagingSenderId: "37727385459",
    appId: "1:37727385459:web:02ef4b498641d59c473706",
    measurementId: "G-TEBPVC1BJJ"
  };

firebase.initializeApp(firebaseConfig);

// making storage
const storage = firebase.storage();

export {storage, firebase as default};