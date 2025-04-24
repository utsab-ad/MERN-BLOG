// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "my-blog-f9c6d.firebaseapp.com",
  projectId: "my-blog-f9c6d",
  storageBucket: "my-blog-f9c6d.firebasestorage.app",
  messagingSenderId: "914839709184",
  appId: "1:914839709184:web:2788ab3ddddc4426b75ae5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}