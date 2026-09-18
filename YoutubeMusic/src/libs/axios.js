import axios from "axios";
import { CONFIG } from "../../config";

export const instance = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: 10000,
});

// instance.interceptors.request.use(
//     (config) => {
//         const accessToken = getAccessToken();
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         config._accessToken = accessToken;
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         const isUnauthorized = error.response?.status === 401;

//         if (isUnauthorized && originalRequest) {
//             const newToken = await refreshAccessToken(
//                 originalRequest._accessToken,
//             );

//             if (newToken) {
//                 return api(originalRequest);
//             }
//         }
//         return Promise.reject(error);
//     },
// );
