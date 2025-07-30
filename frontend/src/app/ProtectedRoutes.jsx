import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

// For all logged-in users
export const ProtectedRoute = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/*" replace />;
};

// For admin and educators
export const AdminRoute = () => {
    const { user } = useAuth();
    const hasRequiredRole = user?.role === "admin" || user?.role === "educator";
    return user && hasRequiredRole ? <Outlet /> : <Navigate to="/*" replace />;
};