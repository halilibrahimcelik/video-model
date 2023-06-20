// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf0-EoHeiIkz7kPXzkAUbd60D9cMRzfms",
  authDomain: "video-model.firebaseapp.com",
  projectId: "video-model",
  storageBucket: "video-model.appspot.com",
  messagingSenderId: "525671363918",
  appId: "1:525671363918:web:c80048d0d0acc64f799a1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
