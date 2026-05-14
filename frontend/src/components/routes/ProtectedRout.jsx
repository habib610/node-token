import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken } from "../../auth";

const ProtectedRoute = () => {
    const token = getAccessToken();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
