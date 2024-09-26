import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

const AdminRoute = ({ children }) => {
  const { loggedUser } = useSelector((state) => state.user);
  const location = useLocation();
  const token = localStorage.getItem("eshop_jwt");
  let admin =
    loggedUser?.data?.role === "admin" ||
    loggedUser?.data?.role === "superAdmin";

  if (!loggedUser?.success || !token) {
    return <SkeletonLoader />;
  }

  if (!loggedUser?.success && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!admin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && admin) {
    return children;
  }

  return <SkeletonLoader />;
};

export default AdminRoute;
