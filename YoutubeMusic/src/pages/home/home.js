import { CONFIG } from "../../../config";
import { initHeader } from "../../components/header";
import { renderListCard } from "../../components/listCard";
import { renderQuickPick } from "../../components/quickpick";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { instance } from "../../libs/axios";
import { getUserInfo } from "../../services/auth";
import {
    getAlbumSuggestions,
    getMoodList,
    getPersonalizedList,
    getPlaylistByCountry,
    getQuickPickList,
    getTopHits,
} from "../../services/service";

const init = async () => {
    renderDefaultLayout();
    const welcomeTitle = document.createElement("h2");
    welcomeTitle.className = "text-6xl font-bold mb-12";
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    let userInfo = null;
    const mainEl = document.querySelector("#main");

    // const personalizedList = [];
    // personalizedList = await getPersonalizedList(12);
    if (isLoggedIn) {
        try {
            userInfo = await getUserInfo();
            welcomeTitle.innerText = `Chào mừng trở lại ${userInfo.name}`;
        } catch (error) {
            console.dir("fail to get user infomation", error);
        }
        mainEl.append(welcomeTitle);
        //TODO: render nghe gần đây
        // console.log(personalizedList);
        // renderQuickPick({
        //     title: "Nghe gần đây ",
        //     listAlbum: personalizedList,
        // });
    }
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300   min-h-screen";
    const moodTag = document.createElement("section");
    moodTag.id = "mood_tag";
    moodTag.className = "mb-12";
    mainEl.append(moodTag);
    const moodTagEl = document.querySelector("#mood_tag");
    const requestMoodList = await instance.get("/moods");
    const moodList = await getMoodList();

    const getMoodListButton = (moodList) => {
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
                        ${getMoodListButton(moodList)}
                  </div>
    `;

    const quickPickList = await getQuickPickList();

    renderQuickPick({ listAlbum: quickPickList, title: "Quick Pick" });

    const albumSuggestionList = await getAlbumSuggestions();
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
