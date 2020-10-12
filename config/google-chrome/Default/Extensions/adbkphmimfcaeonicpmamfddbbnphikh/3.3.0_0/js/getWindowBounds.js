export const getWindowBounds = (win) => {
    var _a, _b, _c, _d;
    return {
        left: (_a = win.left) !== null && _a !== void 0 ? _a : 0,
        top: (_b = win.top) !== null && _b !== void 0 ? _b : 0,
        width: (_c = win.width) !== null && _c !== void 0 ? _c : screen.availWidth,
        height: (_d = win.height) !== null && _d !== void 0 ? _d : screen.availHeight,
    };
};
