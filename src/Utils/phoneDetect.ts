import Constants from "expo-constants";
import { Platform } from "react-native";

export const isIPhone = (() => {
    return Platform.OS === "ios";
})();
export const bottomSpacing = (() => {
    return Platform.OS === "ios" ? 13 : 0;
})();
export const statusBarHeight = (() => {
    return Constants.statusBarHeight;
})();
