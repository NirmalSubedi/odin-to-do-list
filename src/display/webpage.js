import { getMain, makeElement } from "./main-content.js";
import { getSidebar } from "./sidebar.js";

function renderPage() {
    const container = makeElement({ classes: ['app'] });
    const sidebar = getSidebar();
    const main = getMain();
    container.append(sidebar, main);
    document.body.append(container);
};

renderPage();