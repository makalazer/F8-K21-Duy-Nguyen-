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
