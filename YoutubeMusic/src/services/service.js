import { instance } from "../libs/axios";
import { deleteToken, getToken, saveToken } from "../utils/utils";

const getMoodList = async () => {
    try {
        const response = await instance.get("/moods");
        if (response.status === 200) {
            return response.data.items;
        } else {
            throw new Error("Failed to fetch mood list");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getMoodandCategories = async () => {
    try {
        const response = await instance.get("/explore/meta");
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch mood list");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getCategories = async () => {
    try {
        const response = await instance.get("/categories");
        if (response.status === 200) {
            return response.data.items;
        } else {
            throw new Error("Failed to fetch mood list");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getCategoriesDetail = async (slug) => {
    try {
        const response = await instance.get(`/categories/${slug}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch mood list");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getLineList = async () => {
    try {
        const response = await instance.get("/lines");
        if (response.status === 200) {
            return response.data.items;
        } else {
            throw new Error("Failed to fetch lines");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getLinePlaylist = async (slug) => {
    try {
        const response = await instance.get(`/lines/${slug}/playlists`);
        if (response.status === 200) {
            return response.data.items;
        } else {
            throw new Error("Failed to fetch lines playlists");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getLineAlbums = async (slug) => {
    try {
        const response = await instance.get(`/lines/${slug}/albums`);
        if (response.status === 200) {
            return response.data.items;
        } else {
            throw new Error("Failed to fetch lines albums");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getLineSongs = async (slug) => {
    try {
        const response = await instance.get(`/lines/${slug}/songs`);
        if (response.status === 200) {
            return response.data.items;
        } else {
            throw new Error("Failed to fetch lines songs");
            return [];
        }
    } catch (err) {
        console.dir(err);
    }
};

const getMooodDetail = async (slug) => {
    try {
        const response = await instance.get(`/moods/${slug}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch mood detail");
            return [];
        }
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

const getNewestAlbums = async () => {
    try {
        const response = await instance.get("/explore/albums");
        if (response.status === 200) {
            return response.data.items;
        } else {
            throw new Error("Failed to fetch new albums");
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

const getAlbumsDetail = async (slug) => {
    try {
        const response = await instance.get(`/albums/details/${slug}`);
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
    getCategories,
    getCategoriesDetail,
    getNewestAlbums,
    getMoodandCategories,
    getLineList,
    getMooodDetail,
    getQuickPickList,
    getPlaylistDetail,
    getAlbumsDetail,
    getAlbumSuggetions,
    getTopHits,
    getPlaylistByCountry,
};
