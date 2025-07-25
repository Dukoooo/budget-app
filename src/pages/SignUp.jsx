import styles from "./SignUp.module.css";
import React, { useState, usee } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { getFirebaseErrorMessage } from "../firebase/firebaseErrorMessage";
import logo from "../assets/logo.png";
import handImg from "../assets/login_hand.png";
import cirlceImg from "../assets/login_circle.png";
import Button from "../components/Button";

function SignUp() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Heslá sa nezhodujú!");
      return;
    }

    if (!isRegistering)
      try {
        setIsRegistering(true);
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        const message = getFirebaseErrorMessage(error.code);
        console.log("💥 Problem with signing in:", error);
        setErrorMessage(message);
      }
  }

  return (
    <section className={styles.sign__section}>
      <div className={styles.sign__left}>
        {userLoggedIn && <Navigate to={"/Dashboard"} replace={true} />}
        <img src={logo} alt="Logo" className="logo" />
        <form className={styles.sign__form} onSubmit={onSubmit}>
          <h1 className={styles.sign__title}>Sign up</h1>
          <p className={styles.sign__sub_title}>
            please enter your details down bellow
          </p>
          <label htmlFor="signEmail">Email</label>
          <input
            className={styles.sign__input_email}
            id="signEmail"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="signPassword">Password</label>
          <input
            className={styles.sign__input_password}
            id="signPassword"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && (
            <input
              className={styles.sign__input_password}
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {errorMessage && <p className="error__message">{errorMessage}</p>}
          <Button type="submit">Sign in</Button>
          <p className={styles.sign__change}>
            You already have an account?{" "}
            <Link to="/login" className={styles.sign__change_btn}>
              Log in
            </Link>{" "}
          </p>
        </form>
      </div>
      <div className={styles.sign__right}>
        <div className={styles.sign__circle}>
          <img src={cirlceImg} alt="circle" />
        </div>
        <div className={styles.sign__hand}>
          {" "}
          <img src={handImg} alt="hand " />
        </div>
      </div>
    </section>
  );
}

export default SignUp;
