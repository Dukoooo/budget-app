import styles from "./UpdateModal.module.css";
import Button from "../../components/IU/Button";
import { useState } from "react";
import useExpenses from "../../hooks/useExpenses";

function UpdateModal({ exp, onCloseModal }) {
  const { expCategory, expStatus, expText, expValue, id } = exp;

  const [updatedText, setUpdatedText] = useState(expText);
  const [updatedCategory, setUpdatedCategory] = useState(expCategory);
  const [updatedStatus, setUpdatedStatus] = useState(expStatus);
  const [updatedValue, setUpdatedValue] = useState(expValue);

  const { updateExpense } = useExpenses();

  function handleSubmit(e) {
    e.preventDefault();

    if (!exp) return;

    const textOnlyRegex = /^[A-Za-z\s\']+$/;

    if (!textOnlyRegex.test(updatedText)) {
      alert(
        "Expense name must contain only letters without numbers or symbols."
      );
      return;
    }

    const updatedExpenseObj = {
      expText: updatedText,
      expCategory: updatedCategory,
      expStatus: updatedStatus,
      expValue: Number(updatedValue),
    };

    updateExpense(id, updatedExpenseObj);
    onCloseModal();
  }

  return (
    <div className={styles.updated__container}>
      <form className={styles.updated__form} onSubmit={handleSubmit}>
        <button
          type="button"
          className="close__btn"
          onClick={() => onCloseModal()}
        >
          ❌
        </button>

        <label htmlFor="updated__text" className={styles.updated__label}>
          New name?
        </label>
        <input
          type="text"
          id="updated__text"
          placeholder="Enter expense name..."
          required
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className={styles.updated__input}
        />

        <label htmlFor="updated__category" className={styles.updated__label}>
          New category?
        </label>
        <select
          id="updated__category"
          value={updatedCategory}
          onChange={(e) => setUpdatedCategory(e.target.value)}
          className={styles.updated__input}
          required
        >
          <option value="">-- Select category --</option>
          <option value="housing">Housing / Rent</option>
          <option value="utilities">Utilities</option>
          <option value="food">Food & Groceries</option>
          <option value="transport">Transport</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="updated__value" className={styles.updated__label}>
          New value?
        </label>
        <input
          type="number"
          id="updated__value"
          placeholder="Enter the amount..."
          value={updatedValue}
          onChange={(e) => setUpdatedValue(e.target.value)}
          required
          className={styles.updated__input}
        />

        <label htmlFor="updated__status" className={styles.updated__label}>
          New status?
        </label>
        <select
          id="updated__status"
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
          className={styles.updated__input}
          required
        >
          <option value="">-- Select status --</option>
          <option value="recurring">Recurring</option>
          <option value="one-time">One-time</option>
        </select>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default UpdateModal;
