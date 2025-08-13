import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";
import { db } from "../firebase/firebase";

function useSavings() {
  const { currentUser } = useAuth();
  const [savings, setSavings] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.uid) {
      setSavings(0);
      return;
    }

    async function fetchSavings() {
      setIsLoading(true);

      try {
        const summariesRef = collection(
          db,
          "users",
          currentUser.uid,
          "summaries"
        );
        const snapShot = await getDocs(summariesRef);
        let totalBalance = 0;

        snapShot.forEach((doc) => {
          const data = doc.data();
          if (data.balance) {
            totalBalance += Number(data.balance);
          }
        });

        setSavings(totalBalance);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSavings();
  }, [currentUser]);

  return { savings, isLoading, error };
}

export default useSavings;
