import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Spinner } from "react-bootstrap";

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    ); // or loading spinner

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null;

    const allowed = user?.role === "admin" || user?.role === "educator";

    return user && allowed ? <Outlet /> : <Navigate to="/login" replace />;
};
