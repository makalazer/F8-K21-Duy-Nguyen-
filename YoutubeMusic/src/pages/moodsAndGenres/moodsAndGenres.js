import { CONFIG } from "../../../config";
import { renderCategorieTagList } from "../../components/categorieTagList";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { getCategories, getLineList } from "../../services/service";

const init = async (initData) => {
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300   min-h-screen";

    const categorieList = await getCategories();
    renderCategorieTagList({
        tagList: categorieList,
        title: "Tâm trạng và khoảnh khắc",
    });

    const lineList = await getLineList();
    renderCategorieTagList({ tagList: lineList, title: "Dòng nhạc" });
};
export { init };
