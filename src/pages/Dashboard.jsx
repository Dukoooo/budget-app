import styles from "./Dashboard.module.css";
import displayStyles from "../components/IU/DisplayData.module.css";
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
import FilterData from "../components/IU/FilterData";
import Header from "../components/layout/Header";

function Dashboard() {
  const { currentUser, loading: loadingUser } = useAuth();
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const [isAddIncomeOpen, setIsIncomeOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  const {
    expenses,
    expensesSum,
    isLoading: loadingExpensesSum,
  } = useExpenses();
  const { currentIncomeValue, isLoading: loadingIncome } = useIncome();
  const { savings, isLoading: loadingSavingsValue } = useSavings();

  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const isLoading =
    loadingUser || loadingExpensesSum || loadingIncome || loadingSavingsValue;

  useEffect(() => {
    setBalance(Number(currentIncomeValue) - Number(expensesSum));
  }, [currentIncomeValue, expensesSum]);

  let filteredExpenses = [...expenses];
  if (filterType === "category" && filterCategory) {
    filteredExpenses = expenses.filter(
      (exp) => exp.expCategory === filterCategory
    );
  } else if (filterType === "big") {
    filteredExpenses.sort((a, b) => a.expValue - b.expValue);
  } else if (filterType === "small") {
    filteredExpenses.sort((a, b) => b.expValue - a.expValue);
  } else if (filterType === "alpha") {
    filteredExpenses.sort((a, b) => a.expText.localeCompare(b.expText));
  }

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
        <Header currentUser={currentUser} onSignOut={handleSignOut} />
        <main className={styles.dash__main}>
          <div className={styles.dash__sum_container}>
            <DisplayData data={currentIncomeValue} title={"income"} />
            <DisplayData data={expensesSum} title={"expenses"} />
            <DisplayData data={balance} title={"balance"} />
            {savings && (
              <DisplayData
                data={savings}
                title={"savings"}
                className={displayStyles.dash__sum_savings}
              />
            )}
          </div>

          {isAddExpOpen && <AddExpenseForm onHandleModal={handleModal} />}
          {isAddIncomeOpen && <AddIncomeForm onHandleModal={handleAddIncome} />}

          {expenses.length > 0 && (
            <FilterData
              filterType={filterType}
              onFilterChange={setFilterType}
              onCategoryChange={setFilterCategory}
            />
          )}

          <ExpenseList expenses={filteredExpenses} />

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
