import { renderQuickPick } from "../../components/quickpick";
import { renderDefaultLayout } from "../../layouts/defaultLayout";
import { getUserInfo } from "../../services/auth";
import { getPersonalizedList } from "../../services/service";

const init = async () => {
    renderDefaultLayout();
    const mainEl = document.querySelector("#main");
    mainEl.className =
        "bg-transparent text-white mx-auto max-w-3/4 px-6 py-8 transition-all duration-300   min-h-screen";

    const welcomeTitle = document.createElement("h2");
    welcomeTitle.className = "text-6xl font-bold mb-12";
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    let userInfo = null;

    let personalizedList = [];

    if (isLoggedIn) {
        try {
            userInfo = await getUserInfo();
            welcomeTitle.innerText = `Thư viện của  ${userInfo.name}`;
            personalizedList = await getPersonalizedList(12);
        } catch (error) {
            console.dir("fail to get user infomation", error);
        }
        mainEl.append(welcomeTitle);
        renderQuickPick({
            listAlbum: personalizedList,
            title: "Nghe gần đây ",
        });
    } else {
        window.location.href = "/login";
    }
};

export { init };
