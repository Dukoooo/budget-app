import styles from "./SignUp.module.css";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { getFirebaseErrorMessage } from "../firebase/firebaseErrorMessage";

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
        setErrorMessage(message);
        console.log(error);
      }
  }

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      {userLoggedIn && <Navigate to={"/Dashboard"} replace={true} />}
      <form className={styles.container} onSubmit={onSubmit}>
        <h1 className={styles.title}>Hello from Register</h1>
        <p>
          You already have an account? <Link to="/login">Log in</Link>{" "}
        </p>
        <input
          type="email"
          placeholder="your name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && (
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default SignUp;
