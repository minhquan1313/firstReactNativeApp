import { DfProps } from "@/Types/DfProps";
import { definedColors } from "@/Utils/definedColors";
import { onLayoutGetSize } from "@/Utils/onLayoutGetSize";
import {
    ForwardRefRenderFunction,
    ReactNode,
    forwardRef,
    memo,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";
import {
    Animated,
    GestureResponderEvent,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
} from "react-native";

const borderRadius = 8;
export interface IMyButtonProps extends Omit<DfProps, "children"> {
    textCenter?: boolean;
    color?: keyof typeof definedColors;
    colorText?: keyof typeof definedColors;
    sharpCorner?: boolean;
    disabled?: boolean;
    scaleAnimation?: 1 | 3 | 5;
    children: ReactNode;
    onPress?: () => void;
}
export interface IMyButtonRefs {
    t: string;
}
const MyButton: ForwardRefRenderFunction<IMyButtonRefs, IMyButtonProps> = (
    {
        textCenter,
        sharpCorner,
        color,
        colorText,
        style,
        scaleAnimation,
        disabled,
        children,
        onPress,
    }: IMyButtonProps,
    ref
) => {
    const isPressed = useRef(false);
    const animation = useRef(new Animated.Value(0)).current;
    const textStyle: StyleProp<TextStyle> = [
        {
            color: disabled
                ? definedColors["grey"]
                : definedColors[colorText ?? (color === "trans" ? "dark" : "white")],
            textAlign: textCenter ? "center" : "auto",
        },
        styles.text,
    ];

    const opacityAnim = useRef(
        animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.3],
        })
    ).current;
    const scaleAnim = useRef(
        animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, scaleAnimation ? 1 - scaleAnimation / 100 : 1],
        })
    ).current;

    const overlayEffectAnim = {
        opacity: opacityAnim,
    };
    const buttonAnim = {
        transform: [{ scale: scaleAnimation ? scaleAnim : 1 }],
    };

    const animStr = useCallback(() => {
        if (disabled) return;

        Animated.timing(animation, {
            toValue: 1,
            duration: 80,
            useNativeDriver: false,
        }).start();
    }, [disabled]);
    const animEnd = useCallback(
        (cb?: (() => void) | GestureResponderEvent) => {
            if (disabled) return;

            Animated.timing(animation, {
                toValue: 0,
                duration: 60,
                useNativeDriver: false,
            }).start(() => {
                if (!isPressed.current) return;
                typeof cb === "function" && cb();
            });
        },
        [disabled]
    );

    const onPressHandler = () => {
        if (!scaleAnimation && onPress) return onPress();

        isPressed.current = true;
    };

    useImperativeHandle(ref, () => ({
        t: "",
    }));
    return (
        <Pressable
            disabled={disabled}
            onPressIn={animStr}
            onPressOut={() => animEnd(onPress)}
            onPress={onPressHandler}
            onLayout={onLayoutGetSize}>
            <Animated.View
                style={[
                    styles.btn,
                    {
                        backgroundColor: disabled
                            ? definedColors["dark"]
                            : definedColors[color ?? "main"],
                        borderRadius: sharpCorner ? 0 : borderRadius,
                    },
                    style,
                    buttonAnim,
                ]}>
                <View>
                    {Array.isArray(children) || typeof children !== "object" ? (
                        <Text numberOfLines={1} style={textStyle}>
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                </View>

                <Animated.View style={[styles.overlayEffect, overlayEffectAnim]}></Animated.View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btn: {
        position: "relative",
        overflow: "hidden",
    },
    overlayEffect: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        backgroundColor: "#2f3542",
    },
    text: {
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
});

export default memo(forwardRef(MyButton));
