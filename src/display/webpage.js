import { getMain, refreshTodoList } from "./main-content.js";
import { getSidebar } from "./sidebar.js";
import { makeElement } from "./element-creator.js";
import { cache } from "./cache.js";

function renderPage() {
    document.body.textContent = "";
    const container = makeElement({ classes: ['app'] });
    const sidebar = getSidebar();
    const main = getMain();
    container.append(sidebar, main);
    document.body.append(container);
};

export { renderPage, cache as query, refreshTodoList };