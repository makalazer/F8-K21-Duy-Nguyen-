const renderPlayer = (data) => {
    const { audioPatch, thumbnail } = data;
    const playerEl = document.querySelector("#player");
    playerEl.outerHTML = `
      <div id="player-wrapper"
                  class="fixed left-0 right-0 bottom-0 text-white bg-[#212121] border-t border-gray-800 z-30">

                  <!-- Progress Bar -->
                  <div class="w-full h-1 bg-gray-700 relative">
                        <input id="player-progress-bar" type="range" min="0" max="100" value="0"
                              class="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 accent-red-500 cursor-pointer z-50">
                  </div>

                  <!-- Player -->
                  <audio control autoplay scr="${audioPatch}" class="hidden"></audio>
                  <div class="js-player flex items-center justify-between sm:px-3 md:px-4 py-2 min-h-16">

                        <!-- Left controls -->
                        <div class="player-act flex items-center lg:gap-3">
                              <button id="player-prev-btn"
                                    class="hidden player-act md:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition">
                                    <i class="fa-solid fa-backward-step text-xl"></i>
                              </button>
                              <button id="player-play-btn" class="player-act act-btn">
                                    <i class="fa-solid fa-pause text-3xl"></i>
                              </button>
                              <button id="player-next-btn"
                                    class="hidden player-act sm:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-full transition">
                                    <i class="fa-solid fa-forward-step text-xl"></i>
                              </button>

                              <div id="player-time" class="hidden lg:flex items-center gap-1 text-sm text-gray-300">
                                    <span id="player-current">0:29</span> /
                                    <span id="player-duration">5:44</span>
                              </div>
                        </div>

                        <!-- Middle -->
                        <div>
                              <div class="flex items-center gap-4 lg:gap-6 min-w-0 flex-1">
                                    <div id="player-thumbnail" class="w-10 h-10 bg-cover bg-center rounded shrink-0"
                                          style="background-image: url(&quot;https://picsum.photos/seed/album-nhc-in-t-album-19-18/400/400&quot;);">
                                    </div>
                                    <div class="min-w-0">
                                          <div id="player-title"
                                                class="font-semibold text-[14px] sm:text-base truncate">Nhạc Điện Tử
                                                Album 19 - Bài 5</div>
                                          <div id="player-artist" class="text-sm text-gray-400 truncate">Không rõ nghệ
                                                sĩ</div>
                                    </div>

                                    <div class="hidden md:flex items-center gap-2">
                                          <button
                                                class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer"><i
                                                      class="fa-regular fa-thumbs-down text-lg md:text-xl"></i></button>
                                          <button
                                                class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer"><i
                                                      class="fa-regular fa-thumbs-up text-lg md:text-xl"></i></button>
                                    </div>

                                    <div class="hidden sm:flex relative group">
                                          <button id="mobile-options-btn"
                                                class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer">
                                                <i class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
                                          </button>

                                          <div id="mobile-options-menu"
                                                class=" absolute flex flex-col -right-10 -top-34 bg-[#2b2b2b] shadow-xl rounded-lg p-2 w-50 z-999 group-hover:flex">
                                                <button
                                                      class="player-act w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Thêm
                                                      vào Playlist</button>
                                                <button
                                                      class="player-act w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chia
                                                      sẻ</button>
                                                <button
                                                      class="player-act w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chi
                                                      tiết bài hát</button>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <!-- Right controls -->
                        <div class="flex items-center gap-3 md:gap-3">
                              <div class="hidden md:flex items-center relative group">
                                    <button id="player-volume" class="player-act act-btn">
                                          <i class="fa-solid fa-volume-high text-lg md:text-xl"></i>
                                    </button>

                                    <div
                                          class="player-act block absolute right-12 top-1/2 -translate-y-1/2 px-2 pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#2b2b2b] rounded-lg shadow-lg transition duration-200">
                                          <input id="player-volume-slider" type="range" min="0" max="100" value="100"
                                                class="player-act w-32 accent-white cursor-pointer">
                                    </div>
                              </div>

                              <div class="hidden md:flex items-center gap-2 md:gap-3">
                                    <button id="player-repeat-btn" class="player-act act-btn">
                                          <i class="fa-solid fa-repeat text-lg md:text-xl"></i>
                                    </button>
                                    <button id="player-shuffle-btn" class="player-act act-btn">
                                          <i class="fa-solid fa-shuffle text-lg md:text-xl"></i>
                                    </button>
                              </div>
                        </div>

                        <div class="player-act relative md:hidden">
                              <button id="mobile-right-toggle" class="p-2 rounded-full hover:bg-gray-700">
                                    <i class="fa-solid fa-caret-down text-lg rotate-90"></i>
                              </button>

                              <div id="mobile-right-menu"
                                    class="hidden flex absolute right-10 top-0 bg-[#2b2b2b] shadow-xl rounded-lg">
                                    <input id="player-volume-slider-mb" type="range" min="0" max="100" value="100"
                                          class="mx-2 w-28 accent-white cursor-pointer">

                                    <button id="player-volume-mb" class="act-btn">
                                          <i class="fa-solid fa-volume-high text-lg"></i>
                                    </button>
                                    <button id="player-repeat-btn-mb" class="act-btn">
                                          <i class="fa-solid fa-repeat text-lg"></i>
                                    </button>
                                    <button id="player-shuffle-btn-mb" class="act-btn">
                                          <i class="fa-solid fa-shuffle text-lg"></i>
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
    `;
};
