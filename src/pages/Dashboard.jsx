import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext/AuthContext";
import useExpenses from "../hooks/useExpenses";
import useIncome from "../hooks/useIncome";
import ExpenseList from "../features/expenses/ExpenseList";
import AddExpenseForm from "../features/expenses/AddExpenseForm";
import Footer from "../components/IU/Footer";
import DisplayData from "../components/IU/DisplayData";
import AddIncomeForm from "../features/incomes/addIncomeForm";

function Dashboard() {
  const { currentUser } = useAuth();
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const [isAddIncomeOpen, setIsIncomeOpen] = useState(false);
  const { expensesSum } = useExpenses();
  const { currentIncomeValue } = useIncome();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(Number(currentIncomeValue) - Number(expensesSum));
  }, [currentIncomeValue, expensesSum]);

  
  function handleModal(decision) {
    setIsAddExpOpen(decision);
  }

  function handleAddIncome(decision) {
    setIsIncomeOpen(decision);
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
          <DisplayData data={currentIncomeValue} title={"income"} />
          <DisplayData data={expensesSum} title={"expenses"} />
          <DisplayData data={balance} title={"balance"} />
        </div>
        {isAddExpOpen && <AddExpenseForm onHandleModal={handleModal} />}
        {isAddIncomeOpen && <AddIncomeForm onHandleModal={handleAddIncome} />}
        <ExpenseList />
        <Footer onHandleModal={handleModal} onHanldeIncome={handleAddIncome} />
      </main>
    </div>
  );
}

export default Dashboard;
