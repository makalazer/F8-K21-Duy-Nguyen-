import { getHeaderHTML, initHeader } from "../../components/header";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { instance } from "../../libs/axios";
import {
    getMoodList,
    getQuickPickList,
} from "../../services/getHomepageCategories";

const init = async () => {
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-[#0f0f0f] text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300 md:ml-64";
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
                <button id="${item._id}" slug="${item.slug}"
                    class="whitespace-nowrap rounded-lg bg-zinc-800 px-5 py-2 text-sm hover:bg-zinc-700">
                             ${item.name}
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
    const getQuickPickListButton = quickPickList.map((item) => {
        return `
           <button data-song="50 năm về sau (cùng với may mắn cả đời này của tôi)"
                                    data-artist="lương gia"
                                    class="trending-song flex w-full items-center gap-4 rounded-lg p-2 text-left hover:bg-zinc-900">
                                    <img src="${item.thumbnails[0]}"
                                          alt="50 năm về sau" class="h-12 w-12 rounded object-cover" />
            <span class="min-w-0"><strong class="block truncate">${item.title}</strong><small
                                          class="mt-1 block truncate text-zinc-400">lương gia · 2,9 N lượt phát ·
                                    50 năm về sau</small></span>
            </button>  
      `;
    });
    quickPick.innerHTML = `
        <h1 class="text-3xl font-bold mb-8">Quick Pick</h1>
        <div id="trendingList" class="flex snap-x gap-10 overflow-x-auto scroll-smooth pb-3">
                <div class="min-w-70 flex-1 snap-start space-y-4 sm:min-w-82.5">
                              <button data-song="50 năm về sau (cùng với may mắn cả đời này của tôi)"
                                    data-artist="lương gia"
                                    class="trending-song flex w-full items-center gap-4 rounded-lg p-2 text-left hover:bg-zinc-900">
                                    <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=120"
                                          alt="50 năm về sau" class="h-12 w-12 rounded object-cover" />
                                    <span class="min-w-0"><strong class="block truncate">50 năm về sau (cùng với may mắn
                                                cả đời này của tôi)</strong><small
                                                class="mt-1 block truncate text-zinc-400">lương gia · 2,9 N lượt phát ·
                                                50 năm về sau</small></span>
                              </button>
                              <button data-song="Đại Khải Hoàn" data-artist="The Flob"
                                    class="trending-song flex w-full items-center gap-4 rounded-lg p-2 text-left hover:bg-zinc-900">
                                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120"
                                          alt="Đại Khải Hoàn" class="h-12 w-12 rounded object-cover" /><span
                                          class="min-w-0"><strong class="block truncate">Đại Khải Hoàn</strong><small
                                                class="mt-1 block truncate text-zinc-400">The Flob · 2,2 Tr lượt phát ·
                                                Đại Khải Hoàn</small></span>
                              </button>
                              <button data-song="50 Năm Về Sau" data-artist="Vicky Nhung và Chu Thúy Quỳnh"
                                    class="trending-song flex w-full items-center gap-4 rounded-lg p-2 text-left hover:bg-zinc-900">
                                    <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=120"
                                          alt="50 Năm Về Sau" class="h-12 w-12 rounded object-cover" /><span
                                          class="min-w-0"><strong class="block truncate">50 Năm Về Sau</strong><small
                                                class="mt-1 block truncate text-zinc-400">Vicky Nhung và Chu Thúy Quỳnh
                                                · 50 Năm Về Sau</small></span>
                              </button>
                              <button data-song="CHU DU" data-artist="Hoàng Thùy Linh"
                                    class="trending-song flex w-full items-center gap-4 rounded-lg p-2 text-left hover:bg-zinc-900">
                                    <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120"
                                          alt="CHU DU" class="h-12 w-12 rounded object-cover" /><span
                                          class="min-w-0"><strong class="block truncate">CHU DU</strong><small
                                                class="mt-1 block truncate text-zinc-400">Hoàng Thùy Linh · 302 N lượt
                                                phát</small></span>
                              </button>
                </div>
        </div>
    `;
};
export { init };
