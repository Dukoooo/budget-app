import styles from "./Dashboard.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";

function Dashboard() {
  const { currentUser } = useAuth();
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);

  function handleCloseModal() {
    setIsAddExpOpen(false);
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error signing out:", error);
    }
  }
  return (
    <div className={styles.dash__container}>
      <header className={styles.dash__header}>
        <aside className={styles.dash__header_info}>
          <h1 className={styles.dash__title}>
            Hello {currentUser?.name || "User"},
          </h1>
          <p className={styles.dash__sub_title}>
            summary of your financial status
          </p>
        </aside>

        <button type="submit" onClick={handleSignOut}>
          Log out
        </button>
      </header>
      <main className={styles.dash__main}>
        <div className={styles.dash__sum_container}>
          <div className={styles.dash__sum}>
            <span className={styles.dash__sum_title}>income</span>
            <p className={styles.dash__sum_num}>2500$</p>
          </div>
          <div className={styles.dash__sum}>
            <span className={styles.dash__sum_title}>Expenses</span>
            <p className={styles.dash__sum_num}>2500$</p>
          </div>
          <div className={styles.dash__sum}>
            <span className={styles.dash__sum_title}>Balance</span>
            <p className={styles.dash__sum_num}>2500$</p>
          </div>
        </div>
        {isAddExpOpen && <AddExpenseForm onClose={handleCloseModal}  />}
        <ExpenseList />
        <footer className={styles.dash__buttons}>
          <button onClick={() => setIsAddExpOpen(true)}>Add new exp +</button>
          <button>Add new income +</button>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
