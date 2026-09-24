import { instance } from "../libs/axios";
import { deleteToken, getToken, saveToken } from "../utils/utils";

const getMoodList = async () => {
    try {
        const response = await instance.get("/moods");
        return response.data.items;
    } catch (err) {
        console.dir(err);
    }
};

const getQuickPickList = async () => {
    try {
        const response = await instance.get("/quick-picks");
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch quick picks");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getPlaylistDetail = async (slug) => {
    try {
        const response = await instance.get(`/playlists/details/${slug}`);
        return response.data;
    } catch (err) {
        console.dir(err);
    }
};

const getAlbumSuggetions = async () => {
    try {
        const response = await instance.get(`/home/albums-for-you`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch album suggestions");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getTopHits = async () => {
    try {
        const response = await instance.get(`/home/todays-hits`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch top hits");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getPlaylistByCountry = async (params) => {
    try {
        const { countryCode, limit } = params;
        const response = await instance.get(
            `/playlists/by-country?country=${countryCode}&limit=${limit}`,
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch playlist by country");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

export {
    getMoodList,
    getQuickPickList,
    getPlaylistDetail,
    getAlbumSuggetions,
    getTopHits,
    getPlaylistByCountry,
};
