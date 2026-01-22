import * as behavior from "./behavior.js";
import { renderPage, query } from "./webpage.js";

class DOM {
    static #actions = [];

    static attachClickListener() {
        document.addEventListener('click', DOM.#handleClick);
    };

    static attachChangeListener(){
        document.addEventListener('change',DOM.#handleChange);
    };

    static #handleClick(event) {
        query.projectInputListItem.classList.add('hide-input');
        const element = event.target;
        const action = DOM.#getAction(element);
        if (action === undefined) return;
        action.start(element);
    };

    static #handleChange(event) {
        const element = event.target;
        if(element !== query.projectInputTextbox) return;
        behavior.processProjectInput();
    };

    static #getAction = (element) => {
        return DOM.#actions.find(action =>
            action.validElements.find(validElement => validElement === element)
        );
    };

    static registerAction(action, ...elements) {
        if (typeof action !== 'function') throw new TypeError('Action must be a function.');
        if (elements.length === 0) throw new Error('Need at least one element to register.')
        for (const element of elements) {
            if (typeof element !== 'object') throw new TypeError('Element must be an object.');
            if (!(element instanceof HTMLElement)) throw new Error('Element must be an instance of HTMLElement.');
            if(DOM.#getAction(element) !== undefined) throw new Error('Element is already registered.')
        };

        DOM.#actions.push({
            validElements: elements,
            start: action,
        });
    };
};


renderPage();
DOM.registerAction(behavior.showTodoDialog, query.addTodoButton, query.addTodoButtonIcon, query.addTodoButtonSpan);
DOM.registerAction(behavior.toggleTodoControlButtons, query.editTodosButton, query.editTodosButtonIcon, query.editTodosButtonSpan);
DOM.registerAction(behavior.saveTodoDetails, query.saveTodoDialogButton);
DOM.registerAction(behavior.toggleProjectsControlButtons, query.editProjectsButton, query.editProjectsButtonIcon, query.editProjectsButtonSpan);
DOM.registerAction(behavior.showProjectInput, query.addProjectButton, query.addProjectButtonIcon, query.addProjectButtonSpan);
// DOM.registerAction(behavior.logTest, ...query.editTodoButtonIcons);

DOM.attachClickListener();
DOM.attachChangeListener();
export { DOM };