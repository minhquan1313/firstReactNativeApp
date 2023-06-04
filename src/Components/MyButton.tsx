import { useAnimation } from "@/Hooks/useAnimation";
import { DfProps } from "@/Types/DfProps";
import { definedColors } from "@/Utils/definedColors";
import { onLayoutGetSize } from "@/Utils/onLayoutGetSize";
import { FC, ReactNode, memo, useCallback, useRef } from "react";
import { Animated, GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";

const borderRadius = 8;
export interface IMyButtonProps extends Omit<DfProps, "children"> {
    textCenter?: boolean;
    color?: keyof typeof definedColors;
    colorText?: keyof typeof definedColors;
    sharpCorner?: boolean;
    disabled?: boolean;
    scaleAnimationThreshold?: 1 | 3 | 5;
    startAnimation?: boolean;
    children: ReactNode;
    onPress?: () => void;
}

const MyButton: FC<IMyButtonProps> = ({
    textCenter,
    sharpCorner,
    color,
    colorText,
    style,
    scaleAnimationThreshold,
    startAnimation,
    disabled,
    children,
    onPress,
}) => {
    const isPressed = useRef(false);

    const scaleAnim = useAnimation([
        {
            key: "transform",
            outRange: [1, scaleAnimationThreshold ? 1 - scaleAnimationThreshold / 100 : 1],
            duration: 100,
            customOutput(anim) {
                return [{ scale: scaleAnimationThreshold ? anim : 1 }];
            },
        },
        {
            key: "opacity",
            outRange: [0, 0.7],
        },
    ]);

    const animStr = useCallback(() => {
        if (disabled) return;
        scaleAnim.start();
    }, [disabled]);

    const animEnd = useCallback(
        (cb?: (() => void) | GestureResponderEvent) => {
            if (disabled) return;

            scaleAnim.revert(() => {
                if (!isPressed.current) return;
                typeof cb === "function" && cb();
            });
        },
        [disabled]
    );

    const onPressHandler = () => {
        if (!scaleAnimationThreshold && onPress) return onPress();

        isPressed.current = true;
    };

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
                    scaleAnim.styles.transform,
                ]}>
                <View>
                    {Array.isArray(children) || typeof children !== "object" ? (
                        <Text
                            numberOfLines={1}
                            style={[
                                {
                                    color: disabled
                                        ? definedColors["grey"]
                                        : definedColors[
                                              colorText ?? (color === "trans" ? "dark" : "white")
                                          ],
                                    textAlign: textCenter ? "center" : "auto",
                                },
                                styles.text,
                            ]}>
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                </View>

                <Animated.View
                    style={[styles.overlayEffect, scaleAnim.styles.opacity]}></Animated.View>
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

export default memo(MyButton);
