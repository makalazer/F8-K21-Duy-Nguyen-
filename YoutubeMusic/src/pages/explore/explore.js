import { CONFIG } from "../../../config";
import { renderCategorieTagList } from "../../components/categorieTagList";
import { renderExloreList } from "../../components/exploreList";
import { renderListCard } from "../../components/listCard";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { getMoodAndCategories, getNewestAlbums } from "../../services/service";

const init = async (initData) => {
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300   min-h-screen";
    renderExloreList();
    const newAlbums = await getNewestAlbums();
    const mappedList = newAlbums.map((item) => {
        return { thumbnails: [item.thumb], slug: item.slug, title: item.name };
    });
    renderListCard({
        listAlbum: mappedList,
        title: "Khám phá Albums mới",
        listid: "explore-new-albums",
        endpoint: CONFIG.END_POINT.albums,
    });

    const requestMoodAndCategories = await getMoodAndCategories();
    const tagList = [
        ...requestMoodAndCategories.categories.map((item) => {
            return { type: CONFIG.END_POINT.categories, ...item };
        }),
        ...requestMoodAndCategories.lines.map((item) => {
            return { type: CONFIG.END_POINT.lines, ...item };
        }),
    ];
    renderCategorieTagList({ tagList, title: "Tâm trạng và thể loại" });
};
export { init };
