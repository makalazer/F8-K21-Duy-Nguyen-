import moment from "moment";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { getPlaylistDetail } from "../../services/getHomepageCategories";
import { formatSeconds } from "../../utils/utils";

const init = async (initData) => {
    const { data, params, queryString } = initData;
    const slug = data.album;
    const playListData = await getPlaylistDetail(slug);
    renderDefaultLayout();

    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-[#0f0f0f] text-white relative mt-30 lg:ml-[calc(150px+5%)] lg:mr-10 pb-28";

    mainEl.innerHTML = `
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
            <div id="playlist-thumbnail" class="xl:col-span-1 "></div>
            <div id="list-songs" class="flex-1 min-w-0 pt-1 xl:col-span-1 "></div>
      </section>
    `;
    const thumbnailEl = document.querySelector("#playlist-thumbnail");
    const listSongsEl = document.querySelector("#list-songs");

    const duration = moment.duration(playListData.duration, "second");
    const duration_Show =
        duration.hours() > 0
            ? `${duration.hours()} giờ ${duration.minutes()} phút`
            : `${duration.minutes()} phút`;
    const listSongs = playListData.tracks || [];
    const getListSongsHTML = () => {
        return listSongs
            .map((song, index) => {
                return `
             <div
                  class="min-h-16 sm:h-36px flex items-center gap-2 hover:bg-white/10 cursor-pointer transition group rounded-xl py-4 px-4">
                  <span class="w-7 text-gray-500 text-center text-lg">${index + 1}</span>
                                    <img class="rounded-xl aspect-square w-14" src="${song.thumbnails}">
                                    <div class="flex-1 text-xl"><b>${song.title}</b>
                                          <p class="text-gray-400 text-lg">${song?.artists?.map((artist) => artist).join("-")}</p>
                                    </div><span class="text-gray-400 text-xl">${formatSeconds(song.duration)}</span>
            </div>

            `;
            })
            .join("");
    };
    console.log(getListSongsHTML());
    thumbnailEl.innerHTML = `
      <div class="w-full  shrink-0 text-center flex justify-start flex-col sticky top-20 ">
            <img src="${playListData.thumbnails}" alt="${playListData.title}" class="rounded-3xl aspect-square object-cover w-4/5 mx-auto">
            <h1 class="font-bold text-3xl mt-4">${playListData.title}</h1>
            <p class="text-gray-400 mt-3">${playListData.artists}</p>
            <p class="text-gray-400 mt-2">${playListData.description}</p>
            <p class="text-gray-400"> ${playListData.songCount} bài nhạc · ${duration_Show}</p>
      </div>
    `;
    listSongsEl.innerHTML = `
            <div class="space-y-2 ">
                  ${getListSongsHTML()}
            </div>
      `;
};

export { init };
