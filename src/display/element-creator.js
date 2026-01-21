function makeElement({ tag = '', text = '', attributes = {} } = {}) {
    if (tag === '') throw new Error('Must specify element tag.');
    const element = document.createElement(tag);

    setText(text);
    setAttributes(attributes);

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
        console.log(classes)
        classes.forEach(cls => element.classList.add(cls));
    };

    return element;
};


export { makeElement };