import { instance } from "@/lib/axios";

export const postFollowUser = async (userId: string) => {
    const response = await instance.post(`/api/follow/${userId}/follow`);
    return response.data;
};

export const deleteUnfollowUser = async (userId: string) => {
    const response = await instance.delete(`/api/follow/${userId}/follow`);
    return response.data;
};

export const getNewsfeed = async (limit: string, offset: string) => {
    const response = await instance.get(
        `/api/posts/feed?limit=${limit}&offset=${offset}`,
    );
    return response.data;
};

export const postLikePost = async (postId: string) => {
    const response = await instance.post(`/api/posts/${postId}/like`);
    return response.data;
};

export const deleteUnlikePost = async (postId: string) => {
    const response = await instance.delete(`/api/posts/${postId}/like`);
    return response.data;
};

export const postSavePost = async (postId: string) => {
    const response = await instance.post(`/api/posts/${postId}/save`);
    return response.data;
};

export const deleteUnsavePost = async (postId: string) => {
    const response = await instance.delete(`/api/posts/${postId}/save`);
    return response.data;
};

export const getSuggestionUser = async (limit: string) => {
    const response = await instance.get(`/api/users/suggested?limit=${limit}`);
    return response.data;
};
