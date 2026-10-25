import { Routes, Route } from "react-router-dom";
import LogingPage from "./page/LogingPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LogingPage />} />
        </Routes>
    );
}

export default AppRoutes;
