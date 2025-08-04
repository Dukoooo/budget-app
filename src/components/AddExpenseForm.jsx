import styles from "./AddExpenseForm.module.css";
import useExpenses from "../hooks/useExpenses";
import { useState } from "react";
function AddExpenseForm({ onClose }) {
  const { addExpense } = useExpenses();

  const [expText, setExpText] = useState("");
  const [expCategory, setExpCategory] = useState("");
  const [expValue, setExpValue] = useState("");
  const [expStatus, setExpStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

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
  }
  return (
    <div className={styles.add__form_container}>
      <form className={styles.add__form} onSubmit={handleSubmit}>
        <h3>Add new expense</h3>
        <label htmlFor="exp__text">What's the expense?</label>
        <input
          type="text"
          id="exp__text"
          placeholder="Enter the value..."
          required
          value={expText}
          onChange={(e) => setExpText(e.target.value)}
        />
        <label htmlFor="exp__category">Which category of the expense?</label>
        <select
          id="exp__category"
          value={expCategory}
          onChange={(e) => setExpCategory(e.target.value)}
        >
          <option value="">-- Select category --</option>
          <option value="home">Home</option>
          <option value="food">Food</option>
          <option value="hobby">Hobby</option>
          <option value="vehicle">Vehicle</option>
          <option value="fee">Fee</option>
        </select>
        <label htmlFor="exp__value">Value of the expense?</label>
        <input
          type="number"
          id="exp__value"
          placeholder="Enter the value..."
          value={expValue}
          onChange={(e) => setExpValue(e.target.value)}
          required
        />
        <label htmlFor="exp__status">Status of the expense?</label>
        <select
          id="exp__status"
          value={expStatus}
          onChange={(e) => setExpStatus(e.target.value)}
        >
          <option value="">-- Select status --</option>
          <option value="monthly">Monthly</option>
          <option value="one-time">One-time</option>
          <option value="annual">Annual</option>
        </select>
        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
}

export default AddExpenseForm;
