import { getHeaderHTML, initHeader } from "../components/header";
import { getSidebarHTML } from "../components/sidebar";

const renderDefaultLayout = () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    app.className = "bg-[#0f0f0f] text-white";

    //create header
    const header = document.createElement("header");
    header.id = "header";
    app.append(header);
    const headerEl = document.querySelector("#header");
    headerEl.outerHTML = getHeaderHTML();

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
