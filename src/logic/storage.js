function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}

function getStored() {
    if (!storageAvailable('localStorage')) return 'No storage Available';
    const appStr = localStorage.getItem('app');
    if(appStr === 'undefined') return;

    const appObj = JSON.parse(appStr);
    return appObj;
}

function populateStorage(appObj) {
    if (!storageAvailable('localStorage')) return 'No Storage Available';

    const appStr = JSON.stringify(appObj);
    localStorage.setItem('app', appStr);
};

export { getStored, populateStorage };