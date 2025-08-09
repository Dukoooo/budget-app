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

function useIncome() {
  const { currentUser } = useAuth();
  const [income, setIncome] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser?.uid) {
      setIncome([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const incomeRef = collection(db, "users", currentUser.uid, "income");
    const unsubscribe = onSnapshot(
      incomeRef,
      (snapshot) => {
        const incomeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncome(incomeList);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser]);

  // add income
  async function addIncome(incData) {
    if (!currentUser?.uid) return;
    try {
      const incomeRef = collection(db, "users", currentUser.uid, "income");
      await addDoc(incomeRef, incData);
    } catch (err) {
      setError(err);
    }
  }

  return {
    income,
    isLoading,
    error,
    addIncome,
  };
}
