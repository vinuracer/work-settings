import { doBackgroundAction } from "./doBackgroundAction.js";
import { tabToWindow } from "./actionsTabs.js";
import { getNeighbouringWindowId } from "./getNeighbouringWindowId.js";
import { unhighlightTabs } from "./unhighlightTabs.js";
import { getTabsToUnhighlight } from "./getTabsToUnhighlight.js";
export const urlToWindow = (url, windowType, moveToNextDisplay = false) => {
    doBackgroundAction(() => {
        chrome.tabs.create({ url, active: true }, () => {
            tabToWindow(windowType, moveToNextDisplay);
        });
    });
};
export const urlToNeighbouringWindow = (url, windowDistance) => {
    doBackgroundAction(async () => {
        const currentWindow = await new Promise((resolve) => {
            chrome.windows.getCurrent({}, (window) => resolve(window));
        });
        const nextWindowId = await getNeighbouringWindowId(currentWindow.id, windowDistance);
        if (nextWindowId === undefined) {
            return;
        }
        unhighlightTabs(await getTabsToUnhighlight(nextWindowId));
        const opts = { windowId: nextWindowId, url };
        chrome.tabs.create(opts);
    });
};
export const urlToWindowNormal = (url) => urlToWindow(url, "normal");
export const urlToWindowPopup = (url) => urlToWindow(url, "popup");
export const urlToNextDisplay = (url) => urlToWindow(url, undefined, true);
