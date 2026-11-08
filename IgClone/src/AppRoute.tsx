import { Routes, Route } from "react-router-dom";
import LogingPage from "./page/LogingPage";
import VerifyEmail from "./page/VerifyEmail";
import Register from "./page/Register";
import ForgotPassword from "./page/ForgotPassword";
import MainLayout from "./layouts/MainLayout";
import PostCard from "./components/ui/PostCard/PostCard";
const mockPostcard = {
    avatar: "",
    username: "Test name",
    creatAt: "3 week ago",
    img: "",
};

function AppRoutes() {
    return (
        <Routes>
            //TODO
            <Route
                path="/"
                element={
                    <MainLayout>
                        <div className="m-auto w-120 flex flex-col">
                            <PostCard {...mockPostcard} />
                            <PostCard {...mockPostcard} />
                        </div>
                    </MainLayout>
                }
            />
            <Route path="/login" element={<LogingPage />} />
            //TODO
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
