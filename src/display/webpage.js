import { renderMain } from "./main-content.js";
import { renderSidebar } from "./sidebar.js";
import { makeElement } from "./element-creator.js";


// create container for the imported elements in render page function
function renderPage() {
    document.createElement('div');
    // renderSidebar(container);
    // renderMain(container);
}

export { renderPage };