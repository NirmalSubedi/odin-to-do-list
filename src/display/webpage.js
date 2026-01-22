import { getMain } from "./main-content.js";
import { getSidebar } from "./sidebar.js";
import { makeElement } from "./element-creator.js";
import { cache } from "./cache.js";

function renderPage() {
    const container = makeElement({classes: ['app']});
    const sidebar = getSidebar();
    const main = getMain();
    container.append(sidebar, main);
    document.body.append(container);
};


export { renderPage, cache as query};