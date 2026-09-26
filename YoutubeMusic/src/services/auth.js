import axios from "axios";
import { CONFIG } from "../../config.js";
import { instance } from "../libs/axios.js";
import { deleteToken, getToken, saveToken } from "../utils/utils.js";

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            throw new Error("empty refresh token");
        }

        const res = await instance.post(`/auth/refresh-token`, {
            refreshToken: refreshToken,
        });
        saveToken(res.data);
        //TODO: reload page after refresh token
        window.location.reload();
        return accessToken;
    } catch (error) {
        deleteToken();
        console.dir(error);
    }
};

export const getUserInfo = async () => {
    try {
        const { access_token, refresh_token } = getToken();
        const response = await instance.get("/auth/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch user infomation");
            return false;
        }
    } catch (err) {
        console.dir(err);
    }
};

export const postRegister = async (data) => {
    try {
        const response = await instance.post("/auth/register", data);
        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.dir(err);
    }
};

export const postLogin = async (data) => {
    try {
        const response = await instance.post("/auth/login", data);
        if (response.status === 200) {
            saveToken(response.data);
            return response.data;
        } else {
            return false;
        }
    } catch (err) {
        console.dir(err);
    }
};

export const deleteLogout = async () => {
    try {
        const { access_token, refresh_token } = getToken();
        const response = await instance.delete("/auth/logout", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.status === 200) {
            deleteToken();
            return true;
        } else {
            throw new Error("Failed to logout");
            return false;
        }
    } catch (err) {
        console.dir(err);
    }
};

export const patchChangePassword = async (data) => {
    try {
        const { access_token, refresh_token } = getToken();
        const response = await instance.patch("/auth/change-password", data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.status === 200) {
            return true;
        } else {
            throw new Error("Failed to change password");
            return false;
        }
    } catch (err) {
        console.dir(err);
        return false;
    }
};

export const patchUpdateUserInfo = async (data) => {
    try {
        const { access_token, refresh_token } = getToken();
        const response = await instance.patch("/auth/me", data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.status == 200) {
            return true;
        } else {
            throw new Error("Failed to update user info");
            return false;
        }
    } catch (err) {
        console.dir(err);
    }
};
