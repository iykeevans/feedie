// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAseiQabSxnYjX7Sw6pB0ItNJOnF_guyi4",
  authDomain: "feedie-903e4.firebaseapp.com",
  projectId: "feedie-903e4",
  storageBucket: "feedie-903e4.appspot.com",
  messagingSenderId: "424130807454",
  appId: "1:424130807454:web:b19e75167702cdffb89d8f",
  measurementId: "G-991FZ5EW3V",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// const app = initializeAdminApp({ projectId: "feedie-903e4" });
export const auth = getAuth(app);
const analytics = getAnalytics(app);
