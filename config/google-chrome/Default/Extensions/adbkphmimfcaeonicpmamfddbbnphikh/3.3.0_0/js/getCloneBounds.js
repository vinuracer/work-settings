/**
 * find the position that has the most space and return the position
 * and length to fill it.
 * e.g. when cloning horizontally and the window is left: 25% width: 25%
 * there is more space on the right side than the left, so use the right
 * pos is left/top opposite is right/bottom
 */
export const getCloneBounds = (winBounds, displayBounds, cloneMode) => {
    // copying all values covers the case of clone-mode-same
    const bounds = Object.assign({}, winBounds);
    if (cloneMode === "clone-mode-horizontal" || cloneMode === "clone-mode-vertical") {
        const [posKey, lengthKey] = {
            "clone-mode-horizontal": ["left", "width"],
            "clone-mode-vertical": ["top", "height"],
        }[cloneMode];
        const winPos = winBounds[posKey];
        const winLength = winBounds[lengthKey];
        const displayPos = displayBounds[posKey];
        const displayLength = displayBounds[lengthKey];
        const normWinPos = winPos - displayPos;
        const oppositeEdge = normWinPos + winLength;
        const oppositeGap = displayLength - oppositeEdge;
        const doesFit = winLength <= oppositeGap;
        const useOppositeGap = doesFit || normWinPos < oppositeGap;
        const pos = useOppositeGap
            ? displayPos + oppositeEdge
            : winPos - Math.min(winLength, normWinPos);
        const length = Math.min(winLength, useOppositeGap ? oppositeGap : normWinPos);
        bounds[posKey] = pos;
        bounds[lengthKey] = length;
    }
    return bounds;
};
