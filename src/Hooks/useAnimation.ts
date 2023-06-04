import { useMemo, useRef } from "react";
import { Animated, ImageStyle, TextStyle, ViewStyle } from "react-native";

type __STYLE = ViewStyle | TextStyle | ImageStyle;
export interface useAnimationParams {
    key: keyof __STYLE;
    outRange: [number, number] | [string, string];
    easing?: (input: number) => number;
    /**
     * Can be defined once in the first obj, if more than one, wills take the first
     */
    duration?: number;
    /**
     * default = true
     *
     * if the effect is fire and then forget, won't be fire again then this should be false, such as an animation when the app start
     */
    canBeInterrupt?: boolean;
    customOutput?: (interpolate: Animated.AnimatedInterpolation<string | number>) => unknown;
}
export type TUseAnimationStyles = {
    [k in keyof __STYLE]: Animated.WithAnimatedObject<ViewStyle>;
};
export const useAnimation = (keys: useAnimationParams[]) => {
    const anim = useRef(new Animated.Value(0)).current;

    const duration = keys.find((r) => typeof r.duration === "number")?.duration;

    const x = keys
        .map(({ key, outRange, canBeInterrupt, customOutput, easing }) => {
            const interpolate = anim.interpolate({
                inputRange: [0, 1],
                outputRange: outRange,
            });

            const style = {
                [key]: customOutput ? customOutput(interpolate) : interpolate,
            };

            const start = () =>
                new Promise<void>((cb) => {
                    Animated.timing(anim, {
                        toValue: 1,
                        duration,
                        easing,
                        useNativeDriver: !canBeInterrupt,
                    }).start(() => cb());
                });
            const revert = () =>
                new Promise<void>((cb) => {
                    Animated.timing(anim, {
                        toValue: 0,
                        duration,
                        easing,
                        useNativeDriver: !canBeInterrupt,
                    }).start(() => cb());
                });

            return {
                style,
                start,
                revert,
            };
        })
        .reverse();

    const styles: TUseAnimationStyles = {};
    x.forEach((r) => {
        const key = Object.keys(r.style)[0] as keyof __STYLE;
        styles[key] = { [key]: r.style[key] };
    });

    const result = {
        styles,
        start(onDone?: () => void) {
            Promise.all(x.map((r) => r.start())).then(onDone);
        },
        revert(onDone?: () => void) {
            Promise.all(x.map((r) => r.revert())).then(onDone);
        },
    };

    return result;
};
