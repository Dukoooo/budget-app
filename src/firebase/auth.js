// importing auth from my firebase.js in order to manage auth
import { auth } from "./firebase";

//importing function from library in order to handle authentication
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// down bellow --> my own functions to handle authentication

export async function doCreateUserWithEmailAndPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function doSignOut() {
  return auth.signOut();
}

export async function doSignInWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
// not using yet
// export function doPasswordReset(email) {
//   return sendPasswordResetEmail(auth, email);
// }
