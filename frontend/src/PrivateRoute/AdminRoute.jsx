import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "@/components/shared/Spinner/Spinner";

export default function AdminRoute({ children }) {
  const { loggedUser } = useSelector((state) => state.user);
  const location = useLocation();

  let admin =
    loggedUser?.data?.role === "admin" ||
    loggedUser?.data?.role === "superAdmin";

  if (!loggedUser?.success) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!admin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && admin) return children;

  return <Spinner />;
}
