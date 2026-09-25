export const renderListCard = (data) => {
    const { title, listAlbum, listid, endpoint } = data;
    const mainEl = document.querySelector("#main");
    const listCard = document.createElement("section");
    listCard.id = listid;
    mainEl.append(listCard);
    const listCardEL = document.querySelector(`#${listid}`);
    const getListAlbumHTML = () => {
        return listAlbum
            .map((album) => {
                return `
                  <a href="/${endpoint}/details/${album.slug}" class="w-40 lg:h-60 lg:w-55 cursor-pointer shrink-0 block group">
                                    <div class="relative">
                                          <img src="${album.thumbnails[0]}"
                                                class="rounded-xl w-full h-40 lg:h-55 object-cover mb-2">

                                          <div
                                                class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200">
                                          </div>

                                          <!-- Play icon  -->
                                          <div
                                                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-100">
                                                <i class="fa-solid fa-play text-white text-4xl"></i>
                                          </div>
                                    </div>
                                    <h3 class="mb-2 text-white font-medium truncate">${album.title}</h3>
                                    <p class="text-gray-400 text-sm truncate">${album?.artists ? album?.artists?.map((artist) => artist).join("-") : ""}</p>
                  </a>
            `;
            })
            .join("");
    };

    listCardEL.outerHTML = `
      <section class="mt-10 lg:mt-20 mr-10">
            <h2 class="lg:text-5xl text-white font-bold mb-4">${title}</h2>
            <div class="relative" style>
                  <div class="hscroll-inner flex gap-6 overflow-x-auto pb-10 lg:pb-14 scrollbar scroll-smooth scrollbar-thumb-gray-700">
                        ${getListAlbumHTML()}
                  </div>
            </div>
      </section>
    `;
};
