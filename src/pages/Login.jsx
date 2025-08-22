import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/AuthContext"; //custom hook
import { getFirebaseErrorMessage } from "../firebase/firebaseErrorMessage";
import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import handImg from "../assets/login_hand.png";
import cirlceImg from "../assets/login_circle.png";
import Button from "../components/IU/Button";

function Login() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        const message = getFirebaseErrorMessage(error.code);
        console.log("💥 Problem with loging in:", error);
        setErrorMessage(message);
      } finally {
        setIsSigningIn(false);
      }
    }
  }

  return (
    <section className={styles.login__section}>
      <div className={styles.login__left}>
        {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
        <img src={logo} alt="Logo" className="logo" />
        <form className={styles.login__form} onSubmit={onSubmit}>
          <h1 className={styles.login__title}>Welcome</h1>
          <p className={styles.login__sub_title}>
            please enter your details down bellow
          </p>
          <label htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            type="email"
            placeholder="your name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.login__input_email}
          />
          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.login__input_password}
          />
          {errorMessage && <p className="error__message">{errorMessage}</p>}
          <Button>Log in</Button>
          <p className={styles.login__change}>
            You dont have an account?
            <Link to={"/signup"} className={styles.login__change_btn}>
              Sign up now
            </Link>
          </p>
        </form>
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
