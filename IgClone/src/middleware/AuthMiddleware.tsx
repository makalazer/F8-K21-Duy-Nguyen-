import useUser from "@/components/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
    const { isAuthenticated, isLoading } = useUser();
    if (isLoading) {
        return;
    }
    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthMiddleware;
