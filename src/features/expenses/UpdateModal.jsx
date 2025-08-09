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
        "Expense name must contain only letters without spaces, numbers, or symbols."
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
          new name?
        </label>
        <input
          type="text"
          id="updated__text"
          placeholder="Enter the value..."
          required
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className={styles.updated__input}
        />
        <label htmlFor="updated__category" className={styles.updated__label}>
          new category?
        </label>
        <select
          id="exp__category"
          value={updatedCategory}
          onChange={(e) => setUpdatedCategory(e.target.value)}
          className={styles.updated__input}
          required
        >
          <option value="">-- Select category --</option>
          <option value="home">Home</option>
          <option value="food">Food</option>
          <option value="hobby">Hobby</option>
          <option value="vehicle">Vehicle</option>
          <option value="fee">Fee</option>
        </select>
        <label htmlFor="updated__value" className={styles.updated__label}>
          {" "}
          new value?
        </label>
        <input
          type="number"
          id="updated__value"
          placeholder="Enter the value..."
          value={updatedValue}
          onChange={(e) => setUpdatedValue(e.target.value)}
          required
          className={styles.updated__input}
        />
        <label htmlFor="updated__status" className={styles.updated__label}>
          new status?
        </label>
        <select
          id="updated__status"
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
          className={styles.updated__input}
          required
        >
          <option value="">-- Select status --</option>
          <option value="monthly">Monthly</option>
          <option value="one-time">One-time</option>
          <option value="annual">Annual</option>
        </select>
        <Button type="submit">Sumbit</Button>
      </form>
    </div>
  );
}

export default UpdateModal;
