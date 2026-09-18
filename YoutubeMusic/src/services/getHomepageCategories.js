import { instance } from "../libs/axios";

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
        return response.data;
    } catch (err) {
        console.dir(err);
    }
};
export { getMoodList, getQuickPickList };
