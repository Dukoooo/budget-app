import styles from "./ExpenseList.module.css";
import useExpenses from "../hooks/useExpenses.js";
import ExpenseItem from "./ExpenseItem.jsx";

function ExpenseList() {
  const { expenses, isLoading, error, deleteExpense } = useExpenses();
  if (expenses.length === 0) return <p>No expense there yet...</p>;

  return (
    <div className={styles.dash__exp_container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error load expenses...</p>}

      {expenses.map((exp, index) => (
        <ExpenseItem exp={exp} onDelete={deleteExpense} key={index} />
      ))}
    </div>
  );
}

export default ExpenseList;
