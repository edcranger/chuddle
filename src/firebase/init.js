import firebase from "firebase";
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAEo7d0nLWqXbDbxEIJa5IPeJhozkf9vS4",
  authDomain: "chuddle-98081.firebaseapp.com",
  databaseURL: "https://chuddle-98081.firebaseio.com",
  projectId: "chuddle-98081",
  storageBucket: "",
  messagingSenderId: "286734645",
  appId: "1:286734645:web:f9b56cbcc806dad9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
