import { LayoutChangeEvent } from "react-native/types";

export const onLayoutGetSize = (e: LayoutChangeEvent) => {
    const { x, y, width, height } = e.nativeEvent.layout;

    return { x, y, width, height };
};
