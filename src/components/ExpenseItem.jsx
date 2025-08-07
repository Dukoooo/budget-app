import styles from "./ExpenseItem.module.css";

function ExpenseItem({ onDelete, exp }) {
  return (
    <div className={styles.dash__exp_item} key={exp.id}>
      <span className={styles.dash__exp_text}>{exp.expText}</span>
      <span className={styles.dash__exp_category}>{exp.expCategory}</span>
      <span className={styles.dash__exp_amount}>{exp.expValue} €</span>
      <span className={styles.dash__exp_status}>
        {exp.expStatus || "one-time expense"}
      </span>
      <button onClick={() => onDelete(exp.id)}>❌</button>
    </div>
  );
}

export default ExpenseItem;
