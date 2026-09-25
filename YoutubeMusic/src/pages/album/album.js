import { CONFIG } from "../../../config";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { getAlbumsDetail, getPlaylistDetail } from "../../services/service";
import { formatSeconds, formatSecondsToHHMM } from "../../utils/utils";

const init = async (initData) => {
    const { data, params, queryString } = initData;
    const slug = data.slug;
    let playListData = [];
    console.log(window.location.pathname);
    const endPoint = window.location.pathname.split("/")[1];
    console.log(endPoint);

    switch (endPoint) {
        case CONFIG.END_POINT.playlists: {
            playListData = await getPlaylistDetail(slug);
            break;
        }
        case CONFIG.END_POINT.albums: {
            playListData = await getAlbumsDetail(slug);
            break;
        }
        default: {
            break;
        }
    }

    renderDefaultLayout();

    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-[#0f0f0f] text-white relative mt-30 lg:ml-[calc(150px+5%)] lg:mr-10 pb-28";

    mainEl.innerHTML = `
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
            <div id="playlist-thumbnail" class="xl:col-span-1 "></div>
            <div id="list-songs" class="flex-1 min-w-0 pt-1 xl:col-span-1 "></div>
            <div id="player-wrapper" class="fixed left-0 right-0 bottom-0 text-white bg-[#212121] border-t border-gray-800 z-30"></div>
      </section>
    `;
    const thumbnailEl = document.querySelector("#playlist-thumbnail");
    const listSongsEl = document.querySelector("#list-songs");
    const playerEl = document.querySelector("#player-wrapper");

    const listSongs = playListData.tracks || [];
    const getListSongsHTML = () => {
        return listSongs
            .map((song, index) => {
                return `
             <div class="min-h-16 sm:h-36px flex items-center gap-2 hover:bg-white/10 cursor-pointer transition group rounded-xl py-4 px-4 song-item" data-id=${index} >
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
    const thumbnailEl_artists = playListData.artists
        ? `<p class="text-gray-400 mb-2">Các nghệ sĩ: ${playListData.artists?.join(" - ")}</p>`
        : "";
    const thumbnailEl_description = playListData.description
        ? ` <p class="text-gray-400 mb-2">${playListData.description}</p>`
        : "";
    const thumbnailEl_popularity = playListData.popularity
        ? ` <p class="text-gray-400 mb-2">${playListData.popularity} lượt nghe</p>`
        : "";

    thumbnailEl.innerHTML = `
      <div class="w-full  shrink-0 text-center flex justify-start flex-col sticky top-20 ">
            <img src="${playListData.thumbnails}" alt="${playListData.title}" id="album-thumbnail" class="rounded-3xl aspect-square object-cover w-4/5 mx-auto">
            <h1 class="font-bold text-3xl mt-4 mb-4">${playListData.title}</h1>
            ${thumbnailEl_artists}
            ${thumbnailEl_description}
            ${thumbnailEl_popularity}
            <p class="text-gray-400"> ${playListData.songCount} bài nhạc · ${formatSecondsToHHMM(playListData?.duration)}</p>
      </div>
    `;
    listSongsEl.innerHTML = `
            <div class="space-y-2 ">
                  ${getListSongsHTML()}
            </div>
      `;

    listSongsEl.addEventListener("click", (e) => {
        const songItem = e.target.closest(".song-item");
        if (!songItem) return;
        songItem.classList.add("bg-white/10");
        if (prevSongIndex) {
            const prevSongEl = document.querySelector(
                `[data-id="${prevSongIndex}"]`,
            );
            prevSongEl.classList.remove("bg-white/10");
        }
        const song = listSongs[songItem.dataset.id];

        if (song) {
            currentSongIndex = songItem.dataset.id;
            loadCurrentSong();
        }
    });

    playerEl.innerHTML = `
                     <!-- Progress Bar -->
                  <div class="w-full h-1 bg-gray-700 relative">
                        <input id="player-progress-bar" type="range" min="0" max="100" value="0"
                              class="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 accent-red-500 cursor-pointer z-50">
                  </div>

                  <!-- Player -->
                  <audio controls  id="audio" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" class="hidden"
                        type="audio/mpeg">
                  </audio>
                  <div class="js-player flex items-center justify-between sm:px-3 md:px-4 py-2 min-h-16">

                        <!-- Left controls -->
                        <div class="player-act flex items-center lg:gap-3">
                              <button id="player-prev-btn"
                                    class="hidden player-act md:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-lg transition">
                                    <i class="fa-solid fa-backward-step text-xl"></i>
                              </button>
                              <button id="player-play-btn" class="player-act act-btn hover:bg-white/20 p-3 rounded-lg ">
                                     <i class="fa-solid fa-play text-3xl" id="pause-play_icon"></i>
                              </button>
                              <button id="player-next-btn"
                                    class="hidden player-act sm:flex p-3 text-sm text-white hover:cursor-pointer hover:bg-white/20 font-medium rounded-lg transition">
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
                                    <!-- TODO
                                    <div class="hidden md:flex items-center gap-2">
                                          <button
                                                class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer"><i
                                                      class="fa-regular fa-thumbs-down text-lg md:text-xl"></i></button>
                                          <button
                                                class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer"><i
                                                      class="fa-regular fa-thumbs-up text-lg md:text-xl"></i></button>
                                    </div>
                                    -->
                                    <div class="hidden sm:flex relative group">
                                          <button id="mobile-options-btn"
                                                class="player-act p-2 rounded-full hover:bg-gray-700 cursor-pointer">
                                                <i class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
                                          </button>

                                          <div id="mobile-options-menu"
                                                class=" hidden absolute flex flex-col -right-10 -top-34 bg-[#2b2b2b] shadow-xl rounded-lg p-2 w-50 z-999 group-hover:flex">
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
                                    <button id="player-volume" class="player-act act-btn px-4">
                                          <i class="fa-solid fa-volume-high text-lg md:text-xl"></i>
                                    </button>

                                    <div
                                          class="player-act block absolute right-12 top-1/2 -translate-y-1/2 px-2 pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#2b2b2b] rounded-lg shadow-lg transition duration-200">
                                          <input id="player-volume-slider" type="range" min="0" max="100" value="100"
                                                class="player-act w-32 accent-white cursor-pointer">
                                    </div>
                              </div>

                              <div class="hidden md:flex items-center gap-2 md:gap-3">
                                    <button id="player-repeat-btn" class="player-act act-btn hover:opacity-8 ">
                                          <i class="fa-solid fa-repeat text-lg md:text-xl "></i>
                                    </button>
                                    <button id="player-shuffle-btn" class="player-act act-btn hover:opacity-8">
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

                                    <button id="player-volume-mb" class="act-btn px-4">
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
      `;

    const audio = document.querySelector("audio");
    const progressBar = document.querySelector("#player-progress-bar");
    const playerThumbnail = document.querySelector("#player-thumbnail");
    const albumThumbnailEl = document.querySelector("#album-thumbnail");
    const playerTille = document.querySelector("#player-title");
    const playerArtistEl = document.querySelector("#player-artist");
    const currentTimeEl = document.querySelector("#player-current");
    const durationEl = document.querySelector("#player-duration");
    const playBtn = document.querySelector("#player-play-btn");
    const playerRepeatBtn = document.querySelector("#player-repeat-btn");
    const play_pause_icon = document.querySelector("#pause-play_icon");
    const prevBtn = document.querySelector("#player-prev-btn");
    const nextBtn = document.querySelector("#player-next-btn");
    const volumeSlider = document.querySelector("#player-volume-slider");
    let isPlaying = false;
    let isRepeat = false;
    let currentSongIndex = 0;
    let prevSongIndex = false;

    const loadCurrentSong = () => {
        const { audioUrl, thumbnails, songIndex, title, artists } =
            listSongs[currentSongIndex];
        audio.src = audioUrl;
        playerThumbnail.style.backgroundImage = `url(${thumbnails[0]})`;
        albumThumbnailEl.src = thumbnails[0];
        playerTille.innerText = title;
        console.log(listSongs[currentSongIndex]);
        playerArtistEl.innerText = artists?.map((artist) => artist).join("-");
        audio.play();
        prevSongIndex = currentSongIndex;
    };
    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    audio.onpause = () => {
        isPlaying = false;
        play_pause_icon.classList.remove("fa-pause");
        play_pause_icon.classList.add("fa-play");
    };
    audio.onplay = () => {
        isPlaying = true;

        play_pause_icon.classList.add("fa-pause");
        play_pause_icon.classList.remove("fa-play");
    };

    audio.onloadeddata = () => {
        progressBar.value = 0;
        durationEl.innerText = formatSeconds(audio.duration);
        updateTimmer();
    };

    audio.onended = () => {
        if (isRepeat) {
            audio.play();
        } else {
            nextSong();
        }
    };

    progressBar.oninput = (e) => {
        audio.currentTime = (progressBar.value * audio.duration) / 100;
    };
    const updateTimmer = () => {
        setInterval(() => {
            currentTimeEl.innerHTML = formatSeconds(audio.currentTime);
        }, 1000);
    };

    playBtn.onclick = () => {
        togglePlay();
    };

    const nextSong = () => {
        currentSongIndex++;
        if (currentSongIndex > listSongs.length - 1) {
            currentSongIndex = 0;
        }
        loadCurrentSong();
    };

    const prevSong = () => {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = listSongs.length - 1;
        }
        loadCurrentSong();
    };

    nextBtn.onclick = () => {
        nextSong();
    };

    prevBtn.onclick = () => {
        prevSong();
    };

    playerRepeatBtn.onclick = () => {
        playerRepeatBtn.classList.toggle("text-red-500");
        isRepeat = !isRepeat;
    };
};
export { init };
