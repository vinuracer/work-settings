export const windowIds = ["original", "new"];
export const windowProperties = ["width", "height", "left", "top"];
export const windowTypes = ["normal", "popup"];
export const cloneModes = [
    "clone-mode-no",
    "clone-mode-same",
    "clone-mode-horizontal",
    "clone-mode-vertical",
];
export const storedWindowBounds = [
    "originalWidth",
    "originalHeight",
    "originalLeft",
    "originalTop",
    "newWidth",
    "newHeight",
    "newLeft",
    "newTop",
];
export const isIOptions = (obj) => {
    const cast = obj;
    return (cast !== undefined &&
        obj &&
        cloneModes.includes(cast.cloneMode) &&
        typeof cast.copyFullscreen === "boolean" &&
        windowIds.includes(cast.focus) &&
        windowTypes.includes(cast.menuButtonType) &&
        typeof cast.newHeight === "number" &&
        typeof cast.newLeft === "number" &&
        typeof cast.newTop === "number" &&
        typeof cast.newWidth === "number" &&
        typeof cast.originalHeight === "number" &&
        typeof cast.originalLeft === "number" &&
        typeof cast.originalTop === "number" &&
        typeof cast.originalWidth === "number" &&
        typeof cast.resizeOriginal === "boolean");
};
// Constants
export const MENU_TAB_TO_WINDOW_ID = "tab to window";
export const MENU_TAB_TO_POPUP_ID = "tab to popup";
export const MENU_TAB_TO_NEXT_ID = "tab to next";
export const MENU_TAB_TO_PREVIOUS_ID = "tab to previous";
export const MENU_TAB_TO_DISPLAY_ID = "tab to display";
export const MENU_TYPE_PARENT_ID = "type parent";
export const MENU_WINDOW_OPTION_ID = "window option";
export const MENU_POPUP_OPTION_ID = "popup option";
export const MENU_FOCUS_PARENT_ID = "focus parent";
export const MENU_FOCUS_ORIGINAL_OPTION_ID = "focus original option";
export const MENU_FOCUS_NEW_OPTION_ID = "focus new option";
export const MENU_LINK_TO_WINDOW_ID = "link to window";
export const MENU_LINK_TO_POPUP_ID = "link to popup";
export const MENU_LINK_TO_NEXT_ID = "link to next";
export const MENU_LINK_TO_PREVIOUS_ID = "link to previous";
export const MENU_LINK_TO_DISPLAY_ID = "link to display";
// Must match those in manifest.json
export const COMMAND_NORMAL = "01-tab-to-window-normal";
export const COMMAND_POPUP = "02-tab-to-window-popup";
export const COMMAND_NEXT = "03-tab-to-window-next";
export const COMMAND_PREVIOUS = "04-tab-to-window-previous";
export const COMMAND_DISPLAY = "05-tab-to-window-display";
