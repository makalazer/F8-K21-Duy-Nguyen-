import { Routes, Route } from "react-router-dom";
import LogingPage from "./page/LogingPage";
import Register from "./page/Register";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LogingPage />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
