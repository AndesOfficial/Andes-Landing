// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAnrZ5IgF6-WZD-GOFHvtC6JIE7mLf85Co",
    authDomain: "andes-landing.firebaseapp.com",
    projectId: "andes-landing",
    storageBucket: "andes-landing.firebasestorage.app",
    messagingSenderId: "27437689894",
    appId: "1:27437689894:web:b4bcd7addc835eb0840ae7"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);