import { useState } from "react";
import styles from "./ExpenseItem.module.css";
import UpdateModal from "./UpdateModal";

function ExpenseItem({ onDelete, exp }) {
  const [isUpdating, setIsUpdating] = useState(false);

  function handleCloseModal() {
    setIsUpdating(false);
  }

  return (
    <>
      {isUpdating && <UpdateModal exp={exp} onCloseModal={handleCloseModal} />}

      <div className={styles.dash__exp_item} key={exp.id}>
        <span className={styles.dash__exp_text}>{exp.expText}</span>
        <span className={styles.dash__exp_category}>{exp.expCategory}</span>
        <span className={styles.dash__exp_amount}>{exp.expValue} €</span>
        <span className={styles.dash__exp_status}>
          {exp.expStatus || "one-time expense"}
        </span>
        <button
          onClick={() => setIsUpdating(true)}
          className={styles.dash__exp_updateBtn}
        >
          Update
        </button>
        <button
          onClick={() => onDelete(exp.id)}
          className={styles.dash__exp_btn}
        >
          ❌
        </button>
      </div>
    </>
  );
}

export default ExpenseItem;
