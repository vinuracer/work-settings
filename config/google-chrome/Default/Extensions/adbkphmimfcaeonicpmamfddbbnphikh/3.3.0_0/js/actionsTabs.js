import { createNewWindow } from "./createNewWindow.js";
import { doBackgroundAction } from "./doBackgroundAction.js";
import { getNewWindowBounds } from "./getNewWindowBounds.js";
import { getSizeAndPos } from "./getSizeAndPos.js";
import { getWindowBounds } from "./getWindowBounds.js";
import { moveTabs } from "./moveTabs.js";
import { getOptions } from "./options-storage.js";
import { getNeighbouringWindowId } from "./getNeighbouringWindowId.js";
import { getTabsToUnhighlight } from "./getTabsToUnhighlight.js";
import { unhighlightTabs } from "./unhighlightTabs.js";
export const tabToWindow = async (windowType, moveToNextDisplay = false) => {
    doBackgroundAction(async () => {
        const displaysPromise = new Promise((resolve) => {
            chrome.system.display.getInfo((displays) => resolve(displays));
        });
        const currentWindowPromise = new Promise((resolve, reject) => {
            chrome.windows.getCurrent({}, (win) => {
                if (chrome.runtime.lastError === undefined) {
                    resolve(win);
                }
                else {
                    reject(new Error(chrome.runtime.lastError.message));
                }
            });
        });
        const tabsPromise = new Promise((resolve) => {
            chrome.tabs.query({ currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    resolve(tabs);
                }
            });
        });
        const [displays, currentWindow, tabs] = await Promise.all([
            displaysPromise,
            currentWindowPromise,
            tabsPromise,
        ]);
        moveToNextDisplay = moveToNextDisplay && displays.length > 1;
        const calcOverlapArea = (display) => {
            var _a, _b, _c, _d;
            const wl = (_a = currentWindow.left) !== null && _a !== void 0 ? _a : 0;
            const wt = (_b = currentWindow.top) !== null && _b !== void 0 ? _b : 0;
            const wr = wl + ((_c = currentWindow.width) !== null && _c !== void 0 ? _c : screen.availWidth);
            const wb = wt + ((_d = currentWindow.height) !== null && _d !== void 0 ? _d : screen.availWidth);
            const dl = display.bounds.left;
            const dt = display.bounds.top;
            const dr = display.bounds.left + display.bounds.width;
            const db = display.bounds.top + display.bounds.height;
            return (Math.max(0, Math.min(wr, dr) - Math.max(wl, dl)) *
                Math.max(0, Math.min(wb, db) - Math.max(wt, dt)));
        };
        const currentDisplay = displays.reduce((accum, current) => {
            const accumOverlap = calcOverlapArea(accum);
            const curOverlap = calcOverlapArea(current);
            return curOverlap > accumOverlap ? current : accum;
        }, displays[0]);
        const options = await getOptions();
        const isFullscreen = options.get("copyFullscreen") && currentWindow.state === "fullscreen";
        const isFocused = options.get("focus") === "new";
        // (maybe) move and resize original window
        let origWindow = currentWindow;
        const destroyingOriginalWindow = tabs.length === 1;
        if (options.get("resizeOriginal") &&
            !isFullscreen &&
            !destroyingOriginalWindow &&
            !moveToNextDisplay) {
            const vals = await getSizeAndPos(options, "original", currentDisplay.workArea);
            origWindow = await new Promise((resolve) => {
                chrome.windows.update(origWindow.id, {
                    width: vals.width,
                    height: vals.height,
                    left: vals.left,
                    top: vals.top,
                    state: "normal",
                }, (win) => resolve(win));
            });
        }
        // move and resize new window
        const activeTab = tabs.find((tab) => tab.active);
        const getNextDisplay = () => {
            const currentIndex = displays.indexOf(currentDisplay);
            const nextIndex = (currentIndex + 1) % displays.length;
            return displays[nextIndex];
        };
        // if it's just one tab, the only use case is to convert it into a popup
        // window, so just leave it where it was
        const windowBounds = moveToNextDisplay
            ? getNextDisplay().bounds
            : tabs.length === 1
                ? getWindowBounds(origWindow)
                : await getNewWindowBounds(options, origWindow, currentDisplay.workArea);
        const newWindowType = windowType === undefined ? (currentWindow.type === "popup" ? "popup" : "normal") : windowType;
        const [newWin, movedTab] = await createNewWindow(activeTab, newWindowType, windowBounds, isFullscreen, isFocused);
        // move other highlighted tabs
        const otherTabs = tabs.filter((tab) => tab !== movedTab && tab.highlighted);
        if (otherTabs.length > 0) {
            if (newWindowType === "normal") {
                // move all tabs at once
                const moveIndex = 1;
                const movedTabs = await moveTabs(otherTabs, newWin.id, moveIndex);
                // highlight tabs in new window
                const tabPromises = movedTabs.map((tab) => {
                    return new Promise((resolve) => {
                        chrome.tabs.update(tab.id, { highlighted: true }, () => resolve(tab));
                    });
                });
                await Promise.all(tabPromises);
            }
            else if (newWindowType === "popup") {
                // can't move tabs to a popup window, so create individual ones
                const tabPromises = otherTabs.map((tab) => {
                    return createNewWindow(tab, newWindowType, getWindowBounds(newWin), isFullscreen, isFocused);
                });
                await Promise.all(tabPromises);
            }
        }
        // focus on original window if specified, and it still exists
        // (popping a single tab will destroy the original window)
        if (options.get("focus") === "original" && !destroyingOriginalWindow) {
            chrome.windows.get(currentWindow.id, {}, () => {
                if (chrome.runtime.lastError === undefined) {
                    chrome.windows.update(currentWindow.id, { focused: true });
                }
                else {
                    throw new Error(chrome.runtime.lastError.message);
                }
            });
        }
    });
};
export const tabToNeighbouringWindow = (windowDistance) => {
    doBackgroundAction(async () => {
        const tabsToMove = await new Promise((resolve) => chrome.tabs.query({ currentWindow: true, highlighted: true }, (tabs) => resolve(tabs)));
        if (tabsToMove.length === 0) {
            return;
        }
        const nextWindowId = await getNeighbouringWindowId(tabsToMove[0].windowId, windowDistance);
        if (nextWindowId === undefined) {
            return;
        }
        // focus on next window
        await new Promise((resolve) => {
            chrome.windows.update(nextWindowId, { focused: true }, (win) => resolve(win));
        });
        // store tabs to unhighlight
        const tabsToUnhighlight = await getTabsToUnhighlight(nextWindowId);
        // move and highlight selected tabs
        const moveIndex = -1;
        const movedTabs = await moveTabs(tabsToMove, nextWindowId, moveIndex);
        await Promise.all(movedTabs.map((tab, i) => {
            return new Promise((tabResolve) => {
                chrome.tabs.update(tab.id, { highlighted: true, active: i === movedTabs.length - 1 }, (tab) => tabResolve(tab));
            });
        }));
        // unlight old tabs
        unhighlightTabs(tabsToUnhighlight);
    });
};
export const tabToWindowNormal = () => tabToWindow("normal");
export const tabToWindowPopup = () => tabToWindow("popup");
export const tabToNextDisplay = () => tabToWindow(undefined, true);
