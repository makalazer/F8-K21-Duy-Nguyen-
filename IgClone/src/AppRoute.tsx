import { Routes, Route } from "react-router-dom";
import LogingPage from "./page/LogingPage";
import Regidter from "./page/Regidter";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LogingPage />} />
            <Route path="/register" element={<Regidter />} />
        </Routes>
    );
}

export default AppRoutes;
