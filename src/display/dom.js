import * as behavior from "./behavior.js";
import { cache } from "./behavior.js";

class DOM {
    static attachClickListener() {
        document.addEventListener('click', DOM.#handleClick);
    };

    static attachChangeListener() {
        document.addEventListener('change', DOM.#handleChange);
    };

    static attachCancelListener(){
        cache.todoDialog.addEventListener('cancel', DOM.#handleCancel);
    };

    static #handleClick(event) {
        cache.projectInputListItem.classList.add('hide-input');
        const element = event.target;
        const action = behavior.getAction(element);
        if (action === undefined) return;
        action.start(element);
    };

    static #handleChange(event) {
        const element = event.target;
        if (element !== cache.projectInputTextbox) return;
        behavior.processProjectInput();
    };

    static #handleCancel(event){
        behavior.clearTodoFields();
    };
};


DOM.attachClickListener();
DOM.attachChangeListener();
DOM.attachCancelListener();
export { DOM };