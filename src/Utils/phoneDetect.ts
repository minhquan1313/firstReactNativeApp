import Constants from "expo-constants";

export const isIPhone = (() => {
    return Boolean(Constants.deviceName?.includes("iPhone"));
})();

export const statusBarHeight = (() => {
    return Constants.statusBarHeight;
})();
