// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGegBpQXBLClQ23UBNTRdYxctGO_rVCvI",
  authDomain: "code-compass-4dc03.firebaseapp.com",
  projectId: "code-compass-4dc03",
  storageBucket: "code-compass-4dc03.appspot.com",
  messagingSenderId: "254347470550",
  appId: "1:254347470550:web:5f4c85a70e7de0d179cb77",
  measurementId: "G-BP835RWKQM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// export const auth = firebase.auth();
// export const auth2 = getAuth(app);