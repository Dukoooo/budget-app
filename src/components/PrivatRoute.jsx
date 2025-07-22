import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/AuthContext";

export default function PrivateRoute({ children }) {
  const { userLoggedIn, loading } = useAuth();

  if (loading) return <p>Nacitavam...</p>;

  return userLoggedIn ? children : <Navigate to="/login" replace />;
}
