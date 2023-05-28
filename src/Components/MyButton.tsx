import { DfProps } from "@/Types/DfProps";
import { definedColors } from "@/Utils/definedColors";
import { memo, useCallback, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export interface IMyButtonProps extends DfProps {
    textCenter?: boolean;
    color?: keyof typeof definedColors;
    colorText?: keyof typeof definedColors;
    sharpCorner?: boolean;

    onPress?: () => void;
}
const MyButton = ({
    textCenter,
    sharpCorner,
    color,
    colorText,
    style,
    children,
    onPress,
}: IMyButtonProps) => {
    // const [pressed, setPressed] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const opacityAnim = useRef(
        animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2],
        })
    ).current;

    const overlayEffectAnim = {
        opacity: opacityAnim,
    };

    const animStr = useCallback(() => {
        // setPressed(() => true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, []);
    const animEnd = useCallback(() => {
        // setPressed(() => false);
        Animated.timing(animation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, []);

    useEffect(() => {
        console.log(`Btn ${children}`);
    });

    return (
        <Pressable
            onPressIn={animStr}
            onPressOut={animEnd}
            onPress={onPress}
            style={[
                styles.btn,
                style,
                {
                    backgroundColor: definedColors[color ?? "main"],
                    borderRadius: sharpCorner ? 0 : 8,
                },
            ]}>
            <View>
                {typeof children === "string" ? (
                    <Text
                        style={[
                            styles.text,
                            {
                                color: definedColors[
                                    colorText ?? (color === "trans" ? "dark" : "white")
                                ],
                                textAlign: textCenter ? "center" : "auto",
                            },
                        ]}>
                        {children}
                    </Text>
                ) : (
                    children
                )}
            </View>

            <Animated.View style={[styles.overlayEffect, overlayEffectAnim]}></Animated.View>
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
