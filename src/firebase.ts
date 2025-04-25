// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVV5jJrSIjZfqkVMXJDmkjt-6s1f9iBiw",
  authDomain: "academic-repo-f83f7.firebaseapp.com",
  projectId: "academic-repo-f83f7",
  storageBucket: "academic-repo-f83f7.firebasestorage.app",
  messagingSenderId: "330257142318",
  appId: "1:330257142318:web:1be2805ae9bd5b04bd45bf",
  measurementId: "G-19GHB42GXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
export { app, analytics, db };
