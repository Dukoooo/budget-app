import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/AuthContext"; //custom hook
import { getFirebaseErrorMessage } from "../firebase/firebaseErrorMessage";
import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import handImg from "../assets/login_hand.png";
import cirlceImg from "../assets/login_circle.png";

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
        const message = getFirebaseErrorMessage(error.code);
        console.log("💥 Problem with signing in:", error);
        setErrorMessage(message);
      } finally {
        setIsSigningIn(false);
      }
    }
  }

  return (
    <section className={styles.login__section}>
      <div className={styles.login__left}>
        {errorMessage && (
          <p className={styles.error__message}>{errorMessage}</p>
        )}
        {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
        <img src={logo} alt="Logo" className="logo" />
        <form className={styles.login__form} onSubmit={onSubmit}>
          <h1 className={styles.login__title}>Welcome</h1>
          <p className={styles.login__sub_title}>please enter your details</p>
          <input
            type="email"
            placeholder="your name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.login__input_email}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.login__input_password}
          />

          <button type="submit">submit</button>
        </form>
        <p className={styles.login__change}>
          You dont have an account? Register yourselve here
          <Link to={"/signup"} className={styles.login__change_btn}>
            Sign up
          </Link>
        </p>
      </div>
      <div className={styles.login__right}>
        <div className={styles.login__circle}>
          <img src={cirlceImg} alt="circle" />
        </div>
        <div className={styles.login__hand}>
          {" "}
          <img src={handImg} alt="hand " />
        </div>
      </div>
    </section>
  );
}

export default Login;
