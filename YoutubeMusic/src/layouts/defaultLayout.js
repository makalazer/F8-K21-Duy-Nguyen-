import { initHeader, renderHeader } from "../components/header";
import { getSidebarHTML } from "../components/sidebar";

const renderDefaultLayout = () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    app.className = "bg-linear-to-r from-[#434343] to-[#000000] text-white";

    renderHeader();

    //create sidebar
    const sidebar = document.createElement("aside");
    app.append(sidebar);
    sidebar.id = "sidebar";
    const sidebarEl = document.querySelector("#sidebar");
    sidebarEl.outerHTML = getSidebarHTML();

    initHeader();

    //add main content
    const main = document.createElement("main");
    main.id = "main";
    main.className = "";
    app.append(main);
};

export { renderDefaultLayout };
