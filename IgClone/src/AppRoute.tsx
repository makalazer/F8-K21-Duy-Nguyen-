import { Routes, Route } from "react-router-dom";
import LogingPage from "./page/LogingPage";
import VerifyEmail from "./page/VerifyEmail";
import Register from "./page/Register";
import ForgotPassword from "./page/ForgotPassword";

function AppRoutes() {
    return (
        <Routes>
            //TODO
            <Route path="/" element={<LogingPage />} />
            <Route path="/login" element={<LogingPage />} />
            //TODO
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
