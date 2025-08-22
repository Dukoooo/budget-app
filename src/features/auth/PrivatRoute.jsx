import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/AuthContext";
import Loader from "../../components/IU/Loader";

export default function PrivateRoute({ children }) {
  const { userLoggedIn, loading } = useAuth();

  if (loading) return <Loader />;

  return userLoggedIn ? children : <Navigate to="/login" replace />;
}
