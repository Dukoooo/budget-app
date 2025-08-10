import { db } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function useIncome() {
  const { currentUser } = useAuth();
  const [incomes, setIncomes] = useState([]);
  const [currentIncomeValue, setCurrentIncomeValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // ADD INCOME
  async function addIncome(incData) {
    if (!currentUser?.uid) return;
    try {
      const incomeRef = collection(db, "users", currentUser.uid, "incomes");
      await addDoc(incomeRef, incData);
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
