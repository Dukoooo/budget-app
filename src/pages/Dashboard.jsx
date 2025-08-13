import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext/AuthContext";
import useExpenses from "../hooks/useExpenses";
import useIncome from "../hooks/useIncome";
import useSavings from "../hooks/useSavings";
import ExpenseList from "../features/expenses/ExpenseList";
import AddExpenseForm from "../features/expenses/AddExpenseForm";
import Footer from "../components/IU/Footer";
import DisplayData from "../components/IU/DisplayData";
import AddIncomeForm from "../features/incomes/addIncomeForm";
import Loader from "../components/IU/Loader";

function Dashboard() {
  const { currentUser, loading: loadingUser } = useAuth();
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const [isAddIncomeOpen, setIsIncomeOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const { expensesSum, isLoading: loadingExpensesSum } = useExpenses();
  const { currentIncomeValue, isLoading: loadingIncome } = useIncome();
  const { savings, isLoading: loadingSavingsValue } = useSavings();

  const isLoading =
    loadingUser || loadingExpensesSum || loadingIncome || loadingSavingsValue;

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
    <>
      {isLoading && <Loader />}
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
            {savings && <DisplayData data={savings} title={"savings"} />}
          </div>
          {isAddExpOpen && <AddExpenseForm onHandleModal={handleModal} />}
          {isAddIncomeOpen && <AddIncomeForm onHandleModal={handleAddIncome} />}
          <ExpenseList />
          <Footer
            onHandleModal={handleModal}
            onHanldeIncome={handleAddIncome}
          />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
