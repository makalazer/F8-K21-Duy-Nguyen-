import { Routes, Route } from "react-router-dom";
// import LogingPage from "./page/LogingPage";
import Register from "./page/Register";
import VerifyEmail from "./page/VerifyEmail";

function AppRoutes() {
    return (
        <Routes>
            {/* <Route path="/" element={<LogingPage />} /> */}
            <Route path="/" element={<VerifyEmail />} />

            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
