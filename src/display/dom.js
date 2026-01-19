import * as behavior from "./behavior.js";
import { query } from "./query.js";

class DOM {
    static #actions = [];

    static attachClickListener() {
        document.addEventListener('click', DOM.#handleClick);
    }

    static #handleClick(event) {
        const element = event.target;
        const action = DOM.#getAction(element);
        if (action === undefined) return;
        action.start(element);
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

DOM.registerAction(behavior.showTodoDialog, query.addTodoButton, query.addTodoButtonIcon);
DOM.registerAction(behavior.toggleTodoControlButtons, query.editTodosButton, query.editTodosButtonIcon);
DOM.registerAction(behavior.saveTodoDetails, query.saveTodoDialogButton);
DOM.registerAction(behavior.toggleProjectsControlButtons, query.editProjectsButton, query.editProjectsButtonIcon);
// DOM.registerAction(behavior.logTest, ...query.editTodoButtonIcons);

DOM.attachClickListener();
export { DOM };