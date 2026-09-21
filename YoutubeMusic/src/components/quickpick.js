export const renderQuickPick = (data) => {
    const { listAlbum } = data;

    const mainEl = document.querySelector("#main");
    const quickPick = document.createElement("section");
    quickPick.id = "quick_pick";
    mainEl.append(quickPick);
    const quickPickEl = document.querySelector("#quick_pick");

    const getQuickPickListButton = () => {
        return listAlbum
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

    quickPickEl.outerHTML = `
      <section class="mb-12">
            <h1 class="text-5xl font-bold mb-8">Quick Pick</h1>
            <div id="trendingList" class="flex snap-x gap-10 overflow-x-auto scroll-smooth pb-3">
                <div class="min-w-70 flex-1 snap-start space-y-4 sm:min-w-82.5">
                  ${getQuickPickListButton()}
                </div>
            </div>
      </section>
    `;
};
