import { instance } from "@/lib/axios";

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

export const clearToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const saveToken = (token: {
    refreshToken: string;
    accessToken: string;
}) => {
    localStorage.setItem("refreshToken", token.refreshToken);
    localStorage.setItem("accessToken", token.accessToken);
};

export const getNewToken = async () => {
    const refreshToken = getRefreshToken();
    const response = await instance.post("/api/auth/refresh-token", {
        refreshToken: refreshToken,
    });
    return response.data;
};

export const formatTimeAgo = (createdAt: string | Date): string => {
    const now = new Date();
    const past = new Date(createdAt);

    // Nếu thời gian trong tương lai thì coi như vừa đăng
    if (past > now) return "vừa đăng";

    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Dưới 10 phút
    if (diffInMinutes < 10) {
        return "vừa đăng";
    }

    // Dưới 1 giờ
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    }

    // Dưới 24 giờ
    if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    }

    // Dưới 1 tuần
    if (diffInDays < 7) {
        return `${diffInDays} ngày trước`;
    }

    // Tính số năm và tháng chính xác hơn
    let years = now.getFullYear() - past.getFullYear();
    let months = now.getMonth() - past.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    // Điều chỉnh nếu ngày trong tháng chưa tới
    if (now.getDate() < past.getDate()) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
    }

    // Dưới 1 tháng → trả về tuần
    if (years === 0 && months === 0) {
        const weeks = Math.floor(diffInDays / 7);
        return `${weeks} tuần trước`;
    }

    // Dưới 1 năm → trả về tháng
    if (years === 0) {
        return `${months} tháng trước`;
    }

    // Từ 1 năm trở lên
    if (months === 0) {
        return `${years} năm trước`;
    }

    return `${years} năm ${months} tháng trước`;
};
