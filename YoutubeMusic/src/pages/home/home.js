import { getHeaderHTML, initHeader } from "../../components/header";

const init = () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = getHeaderHTML();
    app.append(div);
    initHeader();
};

export { init };
