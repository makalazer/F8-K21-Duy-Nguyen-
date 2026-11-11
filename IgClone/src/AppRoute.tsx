import { Routes, Route } from "react-router-dom";
import LogingPage from "./page/LogingPage";
import VerifyEmail from "./page/VerifyEmail";
import Register from "./page/Register";
import ForgotPassword from "./page/ForgotPassword";
import NewFeed from "./page/NewFeed";
import AuthMiddleware from "./middleware/AuthMiddleware";

function AppRoutes() {
    return (
        <Routes>
            //TODO
            <Route element={<AuthMiddleware />}>
                <Route path="/" element={<NewFeed />} />
            </Route>
            <Route path="/login" element={<LogingPage />} />
            //TODO
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
