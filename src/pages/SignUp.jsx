import styles from "./SignUp.module.css";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { getFirebaseErrorMessage } from "../firebase/firebaseErrorMessage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import logo from "../assets/logo.png";
import handImg from "../assets/login_hand.png";
import cirlceImg from "../assets/login_circle.png";
import Button from "../components/IU/Button";

function SignUp() {
  const { userLoggedIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords doesn't match!");
      return;
    }

    if (!isRegistering)
      try {
        setIsRegistering(true);
        //01. create a USER
        const userCredential = await doCreateUserWithEmailAndPassword(
          email,
          password
        );

        // 02. extracting the USER's object
        const user = userCredential.user;

        // 03. create your own object which you want to save in your database
        const userData = {
          uid: user.uid,
          name: name,
          email: user.email,
          createdAt: new Date(),
        };

        //04.  save it into FS database --> db, name of the collection, UID(user's identificator), and the object itself
        await setDoc(doc(db, "users", user.uid), userData);
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
          <label htmlFor="signName">Name</label>
          <input
            className={styles.sign__input_email}
            id="signName"
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="signEmail">Email</label>
          <input
            className={styles.sign__input_email}
            id="signEmail"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="signPassword">Password</label>
          <input
            className={styles.sign__input_password}
            id="signPassword"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="signConPassword">Confirm password</label>
          <input
            id="signConPassword"
            className={styles.sign__input_password}
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

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
