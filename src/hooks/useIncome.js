import { db } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  writeBatch,
} from "firebase/firestore";

function useIncome() {
  const { currentUser } = useAuth();
  const [incomes, setIncomes] = useState([]);
  const [currentIncomeValue, setCurrentIncomeValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // LISTEN FOR INCOME IN REAL TIME
  useEffect(() => {
    if (!currentUser?.uid) {
      setIncomes([]);
      setCurrentIncomeValue(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    const incomeRef = collection(db, "users", currentUser.uid, "incomes");
    const unsubscribe = onSnapshot(
      incomeRef,
      (snapshot) => {
        const incomeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIncomes(incomeList);

        const lastIncome =
          incomeList.length > 0 ? incomeList[incomeList.length - 1] : null;
        setCurrentIncomeValue(lastIncome ? Number(lastIncome.incomes) : null);

        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser]);

  // ADD INCOME + CLOSE PREVIOUS MONTH
  async function addIncome(incData) {
    if (!currentUser?.uid) return;

    try {
      // GET CURRENT EXPENSES
      const expensesRef = collection(db, "users", currentUser.uid, "expenses");
      const expensesSnap = await getDocs(expensesRef);
      const expensesList = expensesSnap.docs.map((doc) => doc.data());

      // GET LAST INCOME
      const oldIncome = currentIncomeValue || 0;
      const totalExpenses = expensesList.reduce(
        (sum, exp) => sum + Number(exp.expValue || 0),
        0
      );
      const oldBalance = oldIncome - totalExpenses;

      // SAVE SUMMARY
      const summaryRef = collection(db, "users", currentUser.uid, "summaries");
      await addDoc(summaryRef, {
        income: oldIncome,
        expenses: expensesList,
        totalExpenses,
        balance: oldBalance,
        dateClosed: new Date(),
      });

    
      // DELETE ALL DATA
      const batch = writeBatch(db);
      expensesSnap.forEach((doc) => batch.delete(doc.ref));

      const incomesRef = collection(db, "users", currentUser.uid, "incomes");
      const incomesSnap = await getDocs(incomesRef);
      incomesSnap.forEach((doc) => batch.delete(doc.ref));

      await batch.commit();

      //  ADD NEW INCOME
      await addDoc(incomesRef, incData);
    } catch (err) {
      setError(err);
    }
  }

  return {
    incomes,
    currentIncomeValue,
    isLoading,
    error,
    addIncome,
  };
}

export default useIncome;
