// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;
