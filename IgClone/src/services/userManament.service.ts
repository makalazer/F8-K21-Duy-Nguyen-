import { instance } from "@/lib/axios";

export const getCurrentUser = async () => {
    const response = await instance.get(`/api/users/profile`);
    return response.data;
};

export const getUserById = async (userId: string) => {
    const response = await instance.get(`/api/users/${userId}`);
    return response.data;
};

export const getUserPosts = async (userId: string) => {
    const response = await instance.get(`/api/posts/user/${userId}`);
    return response.data;
};

// export const patchUpdateProfile = async () => {
//     const response = await instance.get(`/api/users/profile`, {});
//     return response.data;
// };
