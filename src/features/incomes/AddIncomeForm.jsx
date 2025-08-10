import styles from "./AddIncomeForm.module.css";
import { useState } from "react";
import Button from "../../components/IU/Button";
import useIncome from "../../hooks/useIncome";

function AddIncomeForm({ onHandleModal }) {
  const { addIncome } = useIncome();

  const [newIncome, setIncome] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newincome = {
      incomes: newIncome,
      createdAt: new Date(),
    };
    addIncome(newincome);
    onHandleModal(false);
  }

  return (
    <div className={styles.add__form_container}>
      <form className={styles.add__form} onSubmit={handleSubmit}>
        <h3 className={styles.add__from_title}>Add new Income</h3>
        <button className="close__btn" onClick={() => onHandleModal(false)}>
          ❌
        </button>
        <label htmlFor="exp__text" className={styles.add__label}>
          What's the expense?
        </label>
        <input
          type="number"
          name=""
          id=""
          value={newIncome}
          onChange={(e) => setIncome(e.target.value)}
        />
        <Button type="submit">Sumbit</Button>
      </form>
    </div>
  );
}

export default AddIncomeForm;
