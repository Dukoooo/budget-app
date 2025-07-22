import styles from "./SignUp.module.css";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

function SignUp() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  }

  return (
    <>
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

        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default SignUp;
