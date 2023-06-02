import { ForwardRefRenderFunction, memo, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

export interface IGetSizeProps {
    children: JSX.Element;
}
export interface IGetSizeRefs {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
}

const GetSize: ForwardRefRenderFunction<IGetSizeRefs, IGetSizeProps> = ({ children }, ref) => {
    const view = useRef<View>(null);
    const data: IGetSizeRefs = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        pageX: 0,
        pageY: 0,
    };

    useImperativeHandle(ref, () => {
        view.current?.measure((x, y, width, height, pageX, pageY) => {
            data.x = x;
            data.y = y;
            data.width = width;
            data.height = height;
            data.pageX = pageX;
            data.pageY = pageY;
        });
        return data;
    });
    return <View ref={view}>{children}</View>;
};

export default memo(GetSize);
