import { CONFIG } from "../../config";

export const renderQuickPick = (data) => {
    const { listAlbum, title } = data;

    const mainEl = document.querySelector("#main");
    const quickPick = document.createElement("section");
    quickPick.id = "quick_pick";
    mainEl.append(quickPick);
    const quickPickEl = document.querySelector("#quick_pick");
    const getType = (type) => {
        switch (type) {
            case "playlist": {
                return CONFIG.END_POINT.playlists;
            }
            case "album": {
                return CONFIG.END_POINT.albums;
            }
            default: {
                return CONFIG.END_POINT.playlists;
            }
        }
    };
    const getQuickPickListButton = () => {
        return listAlbum
            .map((item) => {
                return `
                  <button class="trending-song flex max-w-102 items-center gap-4 rounded-lg p-2 text-left hover:bg-zinc-900 min-h-16">
                        <a href="/${getType(item?.type)}/details/${item.slug}" class="flex gap-4">
                              <img src="${item.thumbnails ? item.thumbnails[0] : item.thumb}"
                                                      alt="${item.title ? item.title : item.name}" class="h-12 w-12 rounded object-cover" />
                              <span class="min-w-0"><strong class="block truncate">${item.title ? item.title : item.name}</strong>
                              <small class="mt-1 block truncate text-zinc-400">${
                                  item.artists
                                      ? item.artists
                                            .map((artist) => {
                                                return artist;
                                            })
                                            .join(" ft ")
                                      : ""
                              }  ${item.popularity ? item.popularity : item.views} lượt phát </small></span>
                        </a>
                  </button>  
            `;
            })
            .join("");
    };

    quickPickEl.outerHTML = `
      <section class="mb-12">
            <h1 class="text-5xl font-bold mb-8">${title}</h1>
            <div id="trendingList" class="w-full flex flex-col flex-wrap gap-4 overflow-x-auto pb-10 lg:pb-8 scrollbar scroll-smooth scrollbar-thumb-gray-700 max-h-120">
                  ${getQuickPickListButton()}
                </div>
            </div>
      </section>
    `;
};
