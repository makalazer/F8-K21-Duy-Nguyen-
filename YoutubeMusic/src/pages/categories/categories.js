import { CONFIG } from "../../../config";
import { renderListCard } from "../../components/listCard";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { getCategoriesDetail } from "../../services/service";

const init = async (initData) => {
    const { data } = initData;
    const slug = data.slug;
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300   min-h-screen";
    const catagoriesDetail = await getCategoriesDetail(slug);
    const catagoriesTitleEl = document.createElement("h2");
    catagoriesTitleEl.className = "lg:text-6xl text-white font-bold mb-6 mt-4";
    catagoriesTitleEl.innerText = catagoriesDetail.name;
    mainEl.append(catagoriesTitleEl);

    if (catagoriesDetail?.subcategories) {
        catagoriesDetail?.subcategories?.forEach((item) => {
            renderListCard({
                title: item.name,
                listAlbum: item.playlists,
                listid: item.slug,
                endpoint: CONFIG.END_POINT.playlists,
            });
        });
    }
};
export { init };
