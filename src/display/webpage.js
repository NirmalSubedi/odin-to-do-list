import { getMain } from "./main-content.js";
import { getSidebar } from "./sidebar.js";
import { makeElement } from "./element-creator.js";

function renderPage() {
    const container = makeElement({classes: ['app']});
    const sidebar = getSidebar();
    const main = getMain();
    container.appendChild(sidebar, main);
}

export { renderPage };