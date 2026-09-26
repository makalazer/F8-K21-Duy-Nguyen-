import { CONFIG } from "../../../config";
import { renderListCard } from "../../components/listCard";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { getNewestAlbums } from "../../services/service";

const init = async (initData) => {
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300  min-h-screen";
    const newAlbums = await getNewestAlbums();
    const mappedList = newAlbums.map((item) => {
        return { thumbnails: [item.thumb], slug: item.slug, title: item.name };
    });
    renderListCard({
        listAlbum: mappedList,
        title: "Bản phát hành mới Albums mới",
        listid: "explore-new-albums",
        endpoint: CONFIG.END_POINT.albums,
    });
};
export { init };
