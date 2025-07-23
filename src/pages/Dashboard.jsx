import styles from "./Dashboard.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Dashboard() {
  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error signing out:", error);
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello from Dashboard</h1>

      <p>
        Log Out{" "}
        <button type="submit" onClick={handleSignOut}>
          Log out
        </button>{" "}
      </p>
    </div>
  );
}

export default Dashboard;
