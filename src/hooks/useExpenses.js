import { db } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

function useExpenses() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [expensesSum, setExpensesSum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch expenses in real-time
  useEffect(() => {
    if (!currentUser?.uid) {
      setExpenses([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const expensesRef = collection(db, "users", currentUser.uid, "expenses");
    const unsubscribe = onSnapshot(
      expensesRef,
      (snapshot) => {
        const expensesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expensesList);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser]);

  // Summ of expensesValue
  useEffect(() => {
    if (!expenses) {
      setExpensesSum(0);
      return;
    }

    const total = expenses.reduce((acc, expense) => {
      const value = Number(expense.expValue);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);

    setExpensesSum(total);
  }, [expenses]);

  // adding
  async function addExpense(expData) {
    if (!currentUser?.uid) return;

    try {
      const expenseRef = collection(db, "users", currentUser.uid, "expenses");
      await addDoc(expenseRef, expData);
    } catch (err) {
      setError(err);
    }
  }
  //delete
  async function deleteExpense(expID) {
    if (!currentUser?.uid) return;
    try {
      const expenseRef = doc(db, "users", currentUser.uid, "expenses", expID);
      await deleteDoc(expenseRef);
    } catch (err) {
      setError(err);
    }
  }

  //update
  async function updateExpense(expID, updatedData) {
    if (!currentUser?.uid) return;

    try {
      const expenseRef = doc(db, "users", currentUser.uid, "expenses", expID);
      await updateDoc(expenseRef, updatedData);
    } catch (err) {
      setError(err);
    }
  }

  return {
    expenses,
    expensesSum,
    isLoading,
    error,
    addExpense,
    deleteExpense,
    updateExpense,
  };
}

export default useExpenses;
