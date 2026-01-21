function makeElement({ tag = 'div', text = '', attributes = {}, classes = [] } = {}) {
    const element = document.createElement(tag);

    setText(text);
    setAttributes(attributes);
    setClasses(classes);

    function setText(text) {
        if (text.trim() === '') return;
        element.textContent = text;
    };

    function setAttributes(attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'classes') return setClasses(value);
            element.setAttribute(key, value);
        });
    };

    function setClasses(classes) {
        classes.forEach(cls => element.classList.add(cls));
    };

    return element;
};

export { makeElement };