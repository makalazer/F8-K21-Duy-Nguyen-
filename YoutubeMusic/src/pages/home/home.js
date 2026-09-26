import { CONFIG } from "../../../config";
import { initHeader } from "../../components/header";
import { renderListCard } from "../../components/listCard";
import { renderQuickPick } from "../../components/quickpick";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { instance } from "../../libs/axios";
import {
    getAlbumSuggetions,
    getMoodList,
    getPlaylistByCountry,
    getQuickPickList,
    getTopHits,
} from "../../services/service";

const init = async () => {
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
                <button id="${item._id}" "
                    class="whitespace-nowrap rounded-lg bg-zinc-800 px-5 py-2 text-sm hover:bg-zinc-700">
                    <a href="moods/${item.slug}">
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

    const quickPickList = await getQuickPickList();

    renderQuickPick({ listAlbum: quickPickList });

    const albumSuggestionList = await getAlbumSuggetions();
    renderListCard({
        listAlbum: albumSuggestionList,
        title: "Album gợi ý cho bạn",
        listid: "albumSuggestionList",
        endpoint: CONFIG.END_POINT.albums,
    });

    const topHitsList = await getTopHits();
    renderListCard({
        listAlbum: topHitsList,
        title: "Today's Hits",
        listid: "topHitsList",
        endpoint: CONFIG.END_POINT.playlists,
    });

    const playlistVN = await getPlaylistByCountry({
        countryCode: "VN",
        limit: 12,
    });

    renderListCard({
        listAlbum: playlistVN,
        title: "Nhạc Việt Nam",
        listid: "playlistVN",
        endpoint: CONFIG.END_POINT.playlists,
    });
};
export { init };
