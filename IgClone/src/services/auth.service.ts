import { instance } from "@/lib/axios";

export const postRegister = async (data: Record<string, unknown>) => {
    const response = await instance.post("/api/auth/register", data, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const postLogin = async (data: Record<string, unknown>) => {
    const response = await instance.post("/api/auth/login", data);
    return response.data;
};

export const postLogout = async (data: Record<string, unknown>) => {
    const response = await instance.post("/api/auth/logout", data);
    return response.data;
};

export const postResendVerificationEmail = async (email: string) => {
    const response = await instance.post("api/auth/resend-verification-email", {
        email: email,
    });
    return response.data;
};

export const postForgotPassword = async (email: string) => {
    const response = await instance.post("/api/auth/forgot-password", {
        email: email,
    });
    return response.data;
};

export const postChangePassword = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}) => {
    const response = await instance.post("/api/auth/change-password", data);
    return response.data;
};
