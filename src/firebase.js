// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJywH1ge1byWL8M8_DdrRE_HnrIJNWP2A",
  authDomain: "budgetvsconcert-ab087.firebaseapp.com",
  databaseURL: "https://budgetvsconcert-ab087-default-rtdb.firebaseio.com",
  projectId: "budgetvsconcert-ab087",
  storageBucket: "budgetvsconcert-ab087.appspot.com",
  messagingSenderId: "583553448877",
  appId: "1:583553448877:web:df96e06f6e5d69ae61bf24"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
