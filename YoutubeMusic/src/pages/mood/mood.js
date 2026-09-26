import { CONFIG } from "../../../config";
import { initHeader } from "../../components/header";
import { renderListCard } from "../../components/listCard";
import { renderQuickPick } from "../../components/quickpick";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { instance } from "../../libs/axios";
import {
    getAlbumSuggetions,
    getMoodList,
    getMooodDetail,
    getPlaylistByCountry,
    getQuickPickList,
    getTopHits,
} from "../../services/service";

const init = async (initData) => {
    const { data, params, queryString } = initData;
    const slug = data.slug;
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300   min-h-screen";
    const moodTag = document.createElement("section");
    moodTag.id = "mood_tag";
    moodTag.className = "mb-12";
    mainEl.append(moodTag);
    const moodTagEl = document.querySelector("#mood_tag");
    const requestMoodList = await instance.get("/moods");
    const moodList = await getMoodList();

    const getMooodListButton = (moodList) => {
        return moodList
            .map((item) => {
                return `
                <button id="mood-${item.slug}" "
                    class="whitespace-nowrap font-medium rounded-lg bg-zinc-800 px-5 py-2 text-sm hover:bg-zinc-700">
                    <a href="/moods/${item.slug}">
                        ${item.name}
                    </a>
                </button>  
            `;
            })
            .join("");
    };
    moodTag.innerHTML = `
                    <h2 class="mb-4 text-2xl font-bold">Khám phá âm nhạc</h2>
                    <div class="flex gap-3 overflow-x-auto pb-2">
                        ${getMooodListButton(moodList)}
                  </div>
    `;

    //Active moodtag
    document.querySelector(`#mood-${slug}`).classList.remove("bg-zinc-800");
    document
        .querySelector(`#mood-${slug}`)
        .classList.add("bg-white", "text-black");

    const moodDetail = await getMooodDetail(slug);
    if (moodDetail) {
        moodDetail.sections.forEach((section) => {
            renderListCard({
                listAlbum: section.items,
                title: section.title,
                listid: section.id,
                endpoint: CONFIG.END_POINT.playlists,
            });
        });
    }
};
export { init };
