import styles from "./Dashboard.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import useExpenses from "../hooks/useExpenses";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";
import ExpenseList from "../features/expenses/ExpenseList";
import AddExpenseForm from "../features/expenses/AddExpenseForm";
import Footer from "../components/IU/Footer";
import DisplayData from "../components/IU/DisplayData";

function Dashboard() {
  const { currentUser } = useAuth();
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const { expensesSum } = useExpenses();

  function handleModal(decision) {
    setIsAddExpOpen(decision);
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

        <button
          type="submit"
          onClick={handleSignOut}
          className={styles.dash__logOut_btn}
        >
          Log out
        </button>
      </header>
      <main className={styles.dash__main}>
        <div className={styles.dash__sum_container}>
          <DisplayData data={expensesSum} title={"income"} />
          <DisplayData data={expensesSum} title={"expenses"} />
          <DisplayData data={expensesSum} title={"balance"} />
        </div>
        {isAddExpOpen && <AddExpenseForm onHandleModal={handleModal} />}
        <ExpenseList />
        <Footer onHandleModal={handleModal} />
      </main>
    </div>
  );
}

export default Dashboard;
