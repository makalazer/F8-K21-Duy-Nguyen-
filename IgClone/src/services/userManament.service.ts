import { instance } from "@/lib/axios";

export const getCurrentUser = async () => {
    const response = await instance.get(`/auth/profile`);
    return response.data;
};

// export const patchUpdateProfile = async () => {
//     const response = await instance.get(`/api/users/profile`, {});
//     return response.data;
// };
