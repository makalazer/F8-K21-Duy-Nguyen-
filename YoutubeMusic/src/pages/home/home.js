import { getHeaderHTML, initHeader } from "../../components/header";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { instance } from "../../libs/axios";
import { getMoodList, getQuickPickList } from "../../services/service";

const init = async () => {
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-[#0f0f0f] text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300 md:ml-64 min-h-screen";
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

    const quickPick = document.createElement("section");
    quickPick.className = "mb-12";
    quickPick.id = "quick_pick";
    mainEl.append(quickPick);
    const quickPickList = await getQuickPickList();
    console.log(quickPickList);
    const quickPickEl = document.querySelector("#quick_pick");
    const getQuickPickListButton = () => {
        return quickPickList
            .map((item) => {
                return `
                  <button class="trending-song flex w-full items-center gap-4 rounded-lg p-2 text-left hover:bg-zinc-900">
                        <a href="playlists/details/${item.slug}" class="flex gap-4">
                              <img src="${item.thumbnails[0]}"
                                                      alt="50 năm về sau" class="h-12 w-12 rounded object-cover" />
                              <span class="min-w-0"><strong class="block truncate">${item.title}</strong>
                              <small class="mt-1 block truncate text-zinc-400">${item.artists
                                  .map((artist) => {
                                      return artist;
                                  })
                                  .join(
                                      " ft ",
                                  )} · ${item.popularity} lượt phát </small></span>
                        </a>
                  </button>  
            `;
            })
            .join("");
    };
    quickPick.innerHTML = `
        <h1 class="text-3xl font-bold mb-8">Quick Pick</h1>
        <div id="trendingList" class="flex snap-x gap-10 overflow-x-auto scroll-smooth pb-3">
                <div class="min-w-70 flex-1 snap-start space-y-4 sm:min-w-82.5">
                  ${getQuickPickListButton()}
                </div>
        </div>
    `;
};
export { init };
