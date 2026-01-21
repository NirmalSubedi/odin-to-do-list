import { renderMain } from "./main-content.js";
import { renderSidebar } from "./sidebar.js";
import { makeElement } from "./element-creator.js";


// create container for the imported elements in render page function
function renderPage() {
    const container = makeElement({classes: ['app']});
    console.log(container);
    renderSidebar(container);
    renderMain(container);
}

export { renderPage };