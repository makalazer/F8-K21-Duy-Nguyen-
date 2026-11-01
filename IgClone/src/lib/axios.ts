import {
    clearToken,
    getAccessToken,
    getRefreshToken,
    saveToken,
} from "@/utils/utils";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const instance = axios.create({
    baseURL: "https://instagram.f8team.dev",
    timeout: 600000,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token} `;
    }

    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }
    return config;
});

//
let isRefreshing: boolean = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };
        if (error.response?.status !== 401 || !originalRequest) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            clearToken();
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return instance(originalRequest);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                throw new Error("Can not refresh token");
            }
            const res = await axios.post(
                "${instance.defaults.baseURL}/api/auth/refresh-token",
                { refreshToken },
            );

            const newAccessToken =
                res.data.data.accessToken || res.data?.accessToken;
            const newRefreshToken =
                res.data.data.refreshToken || res.data?.refreshToken;
            if (!newAccessToken) {
                throw new Error("Refresh fail");
            }
            saveToken({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });

            processQueue(null, newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            clearToken();
            window.location.href = "/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);
