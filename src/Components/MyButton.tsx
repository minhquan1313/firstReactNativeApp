import { DfProps } from "@/Types/DfProps";
import { definedColors } from "@/Utils/definedColors";
import { memo, useCallback, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const borderRadius = 8;
export interface IMyButtonProps extends DfProps {
    textCenter?: boolean;
    color?: keyof typeof definedColors;
    colorText?: keyof typeof definedColors;
    sharpCorner?: boolean;

    scaleAnimation?: 1 | 2 | 3 | 4 | 5;

    onPress?: () => void;
}
const MyButton = ({
    textCenter,
    sharpCorner,
    color,
    colorText,
    style,
    scaleAnimation,
    children,
    onPress,
}: IMyButtonProps) => {
    const animation = useRef(new Animated.Value(0)).current;

    const opacityAnim = useRef(
        animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2],
        })
    ).current;
    const scaleAnim = useRef(
        animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, scaleAnimation ? 1 - scaleAnimation / 100 : 1],
        })
    ).current;

    const overlayEffectAnim = useRef({
        opacity: opacityAnim,
    }).current;
    const buttonAnim = useRef({
        transform: [{ scale: scaleAnim }],
    }).current;

    const animStr = useCallback(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, []);
    const animEnd = useCallback(() => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 50,
            useNativeDriver: false,
        }).start();
    }, []);

    useEffect(() => {
        console.log(`Btn ${children}`);
    });

    return (
        <Pressable onPressIn={animStr} onPressOut={animEnd} onPress={onPress}>
            <Animated.View
                style={[
                    styles.btn,
                    {
                        backgroundColor: definedColors[color ?? "main"],
                        borderRadius: sharpCorner ? 0 : borderRadius,
                    },
                    style,
                    buttonAnim,
                ]}>
                <View>
                    {typeof children === "string" ? (
                        <Text
                            style={[
                                {
                                    color: definedColors[
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

export default memo(MyButton);
