// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSjWwQTwsnnFxMXeRmEj3vFzcHGNQwCeU",
  authDomain: "student-dashboard-12.firebaseapp.com",
  projectId: "student-dashboard-12",
  storageBucket: "student-dashboard-12.appspot.com", // fix the typo (use .appspot.com)
  messagingSenderId: "14433246627",
  appId: "1:14433246627:web:ccd25267d6969f00970e16",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth ,signInWithEmailAndPassword , createUserWithEmailAndPassword };
