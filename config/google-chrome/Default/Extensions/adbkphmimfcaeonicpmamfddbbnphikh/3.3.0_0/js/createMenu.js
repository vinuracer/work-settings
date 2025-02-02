import { COMMAND_DISPLAY, COMMAND_NEXT, COMMAND_NORMAL, COMMAND_POPUP, COMMAND_PREVIOUS, MENU_FOCUS_NEW_OPTION_ID, MENU_FOCUS_ORIGINAL_OPTION_ID, MENU_FOCUS_PARENT_ID, MENU_LINK_TO_DISPLAY_ID, MENU_LINK_TO_NEXT_ID, MENU_LINK_TO_POPUP_ID, MENU_LINK_TO_PREVIOUS_ID, MENU_LINK_TO_WINDOW_ID, MENU_POPUP_OPTION_ID, MENU_TAB_TO_DISPLAY_ID, MENU_TAB_TO_NEXT_ID, MENU_TAB_TO_POPUP_ID, MENU_TAB_TO_PREVIOUS_ID, MENU_TAB_TO_WINDOW_ID, MENU_TYPE_PARENT_ID, MENU_WINDOW_OPTION_ID, } from "./api.js";
import { getOptions } from "./options-storage.js";
export const createMenu = async () => {
    const optionsPromise = getOptions();
    const commandsPromise = new Promise((resolve) => {
        chrome.commands.getAll((commands) => resolve(commands));
    });
    const [options, commands] = await Promise.all([optionsPromise, commandsPromise]);
    chrome.contextMenus.removeAll();
    // Actions
    // -------
    const actionDefs = [
        { commandName: COMMAND_NORMAL, menuId: MENU_TAB_TO_WINDOW_ID },
        { commandName: COMMAND_POPUP, menuId: MENU_TAB_TO_POPUP_ID },
        { commandName: COMMAND_NEXT, menuId: MENU_TAB_TO_NEXT_ID },
        { commandName: COMMAND_PREVIOUS, menuId: MENU_TAB_TO_PREVIOUS_ID },
        { commandName: COMMAND_DISPLAY, menuId: MENU_TAB_TO_DISPLAY_ID },
    ];
    for (const { commandName: commandId, menuId } of actionDefs) {
        const command = commands.find((cmd) => cmd.name === commandId);
        if (command !== undefined) {
            chrome.contextMenus.create({
                type: "normal",
                id: menuId,
                title: `Tab to ${command.description} ${command.shortcut}`,
                contexts: ["browser_action", "page"],
            });
        }
    }
    // Type
    chrome.contextMenus.create({
        type: "normal",
        id: MENU_TYPE_PARENT_ID,
        title: "Window Type",
        contexts: ["browser_action"],
    });
    chrome.contextMenus.create({
        type: "radio",
        id: MENU_WINDOW_OPTION_ID,
        parentId: MENU_TYPE_PARENT_ID,
        title: "Window",
        checked: options.get("menuButtonType") === "normal",
        contexts: ["browser_action"],
    });
    chrome.contextMenus.create({
        type: "radio",
        id: MENU_POPUP_OPTION_ID,
        parentId: MENU_TYPE_PARENT_ID,
        title: "Popup",
        checked: options.get("menuButtonType") === "popup",
        contexts: ["browser_action"],
    });
    // Focus
    chrome.contextMenus.create({
        type: "normal",
        id: MENU_FOCUS_PARENT_ID,
        title: "Focus",
        contexts: ["browser_action"],
    });
    chrome.contextMenus.create({
        type: "radio",
        id: MENU_FOCUS_ORIGINAL_OPTION_ID,
        parentId: MENU_FOCUS_PARENT_ID,
        title: "Original",
        checked: options.get("focus") === "original",
        contexts: ["browser_action"],
    });
    chrome.contextMenus.create({
        type: "radio",
        id: MENU_FOCUS_NEW_OPTION_ID,
        parentId: MENU_FOCUS_PARENT_ID,
        title: "New",
        checked: options.get("focus") === "new",
        contexts: ["browser_action"],
    });
    // links on page
    const linkDefs = [
        { id: MENU_LINK_TO_WINDOW_ID, title: "Link To New Window" },
        { id: MENU_LINK_TO_POPUP_ID, title: "Link To New Popup" },
        { id: MENU_LINK_TO_NEXT_ID, title: "Link To Next Window" },
        { id: MENU_LINK_TO_PREVIOUS_ID, title: "Link To Previous Window" },
        { id: MENU_LINK_TO_DISPLAY_ID, title: "Link To Next Display" },
    ];
    for (const { id, title } of linkDefs) {
        chrome.contextMenus.create({
            type: "normal",
            id,
            title,
            contexts: ["link"],
        });
    }
};
