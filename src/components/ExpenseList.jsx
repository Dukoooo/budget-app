import styles from "./ExpenseList.module.css";
import useExpenses from "../hooks/useExpenses.js";

function ExpenseList() {
  const { expenses, isLoading, error, deleteExpense } = useExpenses();
  console.log(expenses);
  if (expenses.length === 0) return <p>No expense there yet...</p>;

  return (
    <div className={styles.dash__exp_container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error load expenses...</p>}

      {expenses.map((exp) => (
        <div className={styles.dash__exp_item} key={exp.id}>
          <span className={styles.dash__exp_text}>{exp.expText}</span>
          <span className={styles.dash__exp_category}>{exp.expCategory}</span>
          <span className={styles.dash__exp_amount}>{exp.expValue} €</span>
          <span className={styles.dash__exp_status}>
            {exp.expStatus || "one-time expense"}
          </span>
          <button onClick={() => deleteExpense(exp.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
