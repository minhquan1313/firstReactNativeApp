import { FC, memo, useCallback } from "react";
import { LayoutChangeEvent, View } from "react-native";

export interface IGetSizeProps {
    onSize?: (d: IOnSize) => void;
    children: JSX.Element | JSX.Element[];
}

export interface IOnSize {
    x: number;
    y: number;
    width: number;
    height: number;
}

const GetSize: FC<IGetSizeProps> = ({ onSize, children }) => {
    const onLayout = useCallback(
        (r: LayoutChangeEvent) => onSize && onSize(r.nativeEvent.layout),
        [onSize]
    );

    return <View onLayout={onLayout}>{children}</View>;
};

export default memo(GetSize);
