export const getTabsToUnhighlight = (windowId) => {
    return new Promise((resolve) => {
        chrome.tabs.query({ windowId, highlighted: true }, (tabs) => {
            const tabsArray = Array.isArray(tabs) ? tabs : [tabs];
            resolve(tabsArray);
        });
    });
};
