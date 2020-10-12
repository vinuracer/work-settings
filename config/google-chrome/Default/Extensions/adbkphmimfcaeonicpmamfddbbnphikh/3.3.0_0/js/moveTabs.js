export const moveTabs = (tabs, windowId, index) => {
    return new Promise((resolve) => {
        const tabIds = tabs.reduce((accum, tab) => (tab.id === undefined ? accum : [...accum, tab.id]), []);
        chrome.tabs.move(tabIds, { windowId, index }, (movedTabs) => resolve(Array.isArray(movedTabs) ? movedTabs : [movedTabs]));
    });
};
