import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/AuthContext"; //custom hook
import styles from "./Login.module.css";

function Login() {
  // tu si zavolam a destrukturururujem funkcie z useAuth hooku
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //submit funkcia... kde zistujem ci status signin existuje a ak nie tak to zmenim a volam funkciu prihlasenia s emailom a klucom
  async function onSubmit(e) {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        console.log("💥 Problem with signing in:", error);
        setIsSigningIn(false);
      }
    }
  }

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
      <form className={styles.container} onSubmit={onSubmit}>
        <h1 className={styles.title}>Hello from Login</h1>
        <input
          type="email"
          placeholder="your name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">submit</button>
      </form>
      <p>
        You dont have an account? Register yourselve here
        <Link to={"/signup"}>Sign up</Link>
      </p>
    </>
  );
}

export default Login;
