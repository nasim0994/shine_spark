import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "@/components/shared/Spinner/Spinner";

export default function PrivateRoute({ children }) {
  const { loggedUser } = useSelector((state) => state.user);
  const location = useLocation();

  if (!loggedUser?.success || loggedUser == "undefined") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success) return children;

  return <Spinner />;
}
