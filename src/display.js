class DOM {
    static #query = {
        todoDialog: document.querySelector('.todo-dialog'),
        addTodoButton: document.querySelector('.add-todo-button'),
    };

    static attachClickListener() {
        document.addEventListener('click', DOM.#handleClick);
    }

    static #handleClick(event) {
        const element = event.target;
        const action = DOM.#getAction(element);
        if (typeof action === undefined) return;

        action.start();
    };

    static #getAction = (element) => {
        return DOM.#actions.find(action =>
            action.validElements.find(validElement=> validElement === element)
        );
    };

    static #actions = [];

    static registerAction(action, ...elements) {
        for (const element of elements) {
            if (typeof element !== 'object') throw new TypeError('Element must be an object.');
            if (!(element instanceof HTMLElement)) throw new Error('Element must be an instance of HTMLElement.');
        };
        if(typeof action !== "function") throw new TypeError('Action must be a function.');

        DOM.#actions.push({
            validElements: elements,
            start: action,
        });
    };
};

const fun = () =>{};

DOM.registerAction(fun,document.createElement('div'),document.createElement('p'))

DOM.attachClickListener();