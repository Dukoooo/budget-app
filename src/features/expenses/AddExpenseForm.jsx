import styles from "./AddExpenseForm.module.css";
import useExpenses from "../../hooks/useExpenses";
import { useState } from "react";
import Button from "../../components/IU/Button";

function AddExpenseForm({ onHandleModal }) {
  const { addExpense } = useExpenses();

  const [expText, setExpText] = useState("");
  const [expCategory, setExpCategory] = useState("");
  const [expValue, setExpValue] = useState("");
  const [expStatus, setExpStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const textOnlyRegex = /^[A-Za-z\s\']+$/;

    if (!textOnlyRegex.test(expText)) {
      alert(
        "Expense name must contain only letters without numbers or symbols."
      );
      return;
    }

    const newExpense = {
      expText,
      expCategory,
      expValue: Number(expValue),
      expStatus,
      createdAt: new Date(),
    };

    addExpense(newExpense);
    setExpText("");
    setExpCategory("");
    setExpValue("");
    setExpStatus("");
    onHandleModal(false);
  }

  return (
    <div className={styles.add__form_container}>
      <form className={styles.add__form} onSubmit={handleSubmit}>
        <h3 className={styles.add__from_title}>Add new expense</h3>
        <button className="close__btn" onClick={() => onHandleModal(false)}>
          ❌
        </button>

        <label htmlFor="exp__text" className={styles.add__label}>
          What's the expense?
        </label>
        <input
          type="text"
          id="exp__text"
          placeholder="Enter expense name..."
          required
          value={expText}
          onChange={(e) => setExpText(e.target.value)}
          className={styles.add__input}
        />

        <label htmlFor="exp__category" className={styles.add__label}>
          Which category of the expense?
        </label>
        <select
          id="exp__category"
          value={expCategory}
          onChange={(e) => setExpCategory(e.target.value)}
          className={styles.add__input}
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

        <label htmlFor="exp__value" className={styles.add__label}>
          Value of the expense?
        </label>
        <input
          type="number"
          id="exp__value"
          placeholder="Enter the amount..."
          value={expValue}
          onChange={(e) => setExpValue(e.target.value)}
          required
          className={styles.add__input}
        />

        <label htmlFor="exp__status" className={styles.add__label}>
          Status of the expense?
        </label>
        <select
          id="exp__status"
          value={expStatus}
          onChange={(e) => setExpStatus(e.target.value)}
          className={styles.add__input}
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

export default AddExpenseForm;
