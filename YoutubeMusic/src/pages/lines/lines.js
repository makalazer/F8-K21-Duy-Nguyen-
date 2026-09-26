import { CONFIG } from "../../../config";
import { renderListCard } from "../../components/listCard";
import { renderQuickPick } from "../../components/quickpick";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import {
    getLineAlbums,
    getLinePlaylist,
    getLineSongs,
} from "../../services/service";

const init = async (initData) => {
    const { data } = initData;
    const slug = data.slug;
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300   min-h-screen";
    const listSongs = await getLineSongs(slug);
    renderQuickPick({ listAlbum: listSongs, title: "Bài hát" });

    const listAlbum = await getLineAlbums(slug);
    renderListCard({
        listAlbum: listAlbum,
        title: "Album phổ biến",
        listid: "albumLinesList",
        endpoint: CONFIG.END_POINT.albums,
    });

    const playList = await getLinePlaylist(slug);
    console.log(playList);
    renderListCard({
        listAlbum: playList,
        title: "Playlist đề xuất",
        listid: "playlistLinesList",
        endpoint: CONFIG.END_POINT.playlists,
    });
};
export { init };
