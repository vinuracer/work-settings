export const unhighlightTabs = (tabs) => {
    for (const tab of tabs) {
        if (tab.id !== undefined) {
            chrome.tabs.update(tab.id, { highlighted: false });
        }
    }
};
