import styles from "./ExpenseList.module.css";
import ExpenseItem from "./ExpenseItem.jsx";

function ExpenseList({ expenses, isLoading, error, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return <p>No expense there yet...</p>;
  }

  return (
    <div className={styles.dash__exp_container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error load expenses...</p>}
      {expenses.map((exp) => (
        <ExpenseItem exp={exp} onDelete={onDelete} key={exp.id} />
      ))}
    </div>
  );
}

export default ExpenseList;
