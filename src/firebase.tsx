// /src/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi7FKvZBu6LOKSoOgIJQjT9huWe8bWOA4",
  authDomain: "authentecation-b0aad.firebaseapp.com",
  projectId: "authentecation-b0aad",
  storageBucket: "authentecation-b0aad.appspot.com",
  messagingSenderId: "314017999142",
  appId: "1:314017999142:web:d0f7d167e7d68ef68839e7"
};

// Initialize Firebase only if it's not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
