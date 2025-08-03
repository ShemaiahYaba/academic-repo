// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOPGVaV2TmaUaDSLV38Dq7HC_1oEPRy5U",
  authDomain: "academicrepo-98ad1.firebaseapp.com",
  projectId: "academicrepo-98ad1",
  storageBucket: "academicrepo-98ad1.firebasestorage.app",
  messagingSenderId: "348985238476",
  appId: "1:348985238476:web:ac79e2eaaa984f8a1d3369",
  measurementId: "G-4KHYQ7BPPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
export { app, analytics, db };
