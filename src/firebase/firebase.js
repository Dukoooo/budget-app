//importing the function for running the firebase
import { initializeApp } from "firebase/app";

// importing the function getAuth for firebase authentication
import { getAuth } from "firebase/auth";

//function to initialize the firestore database
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
//main firebase app --> to handle other services
const app = initializeApp(firebaseConfig);

//initializing and connecting into my app
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
