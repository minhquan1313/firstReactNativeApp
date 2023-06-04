import { useMemo, useRef } from "react";
import { Animated, ImageStyle, TextStyle, ViewStyle } from "react-native";

type __STYLE = ViewStyle | TextStyle | ImageStyle;
export interface useAnimationParams {
    key: keyof __STYLE;
    outRange: [number, number] | [string, string];
    easing?: (input: number) => number;
    duration?: number;
    /**
     * default = true
     */
    canBeInterrupt?: boolean;
    customOutput?: (interpolate: Animated.AnimatedInterpolation<string | number>) => unknown;
}
export type TUseAnimationStyles = {
    [k in keyof __STYLE]: Animated.WithAnimatedObject<ViewStyle>;
};
export const useAnimation = (keys: useAnimationParams[]) => {
    const anim = useRef(new Animated.Value(0)).current;

    const result = useMemo(() => {
        const x = keys.map(({ key, outRange, canBeInterrupt, duration, customOutput, easing }) => {
            const interpolate = anim.interpolate({
                inputRange: [0, 1],
                outputRange: outRange,
            });

            const style = {
                [key]: customOutput ? customOutput(interpolate) : interpolate,
            };

            const start = () =>
                new Promise<void>((cb) => {
                    console.log(`start`, { duration });
                    Animated.timing(anim, {
                        toValue: 1,
                        duration,
                        easing,
                        useNativeDriver: !canBeInterrupt,
                    }).start(() => cb());
                });
            const revert = () =>
                new Promise<void>((cb) => {
                    console.log(`revert`, { duration });
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
        });

        const styles: TUseAnimationStyles = {};
        x.forEach((r) => {
            const key = Object.keys(r.style)[0] as keyof __STYLE;
            styles[key] = { [key]: r.style[key] };
        });

        return {
            styles,
            start(onDone?: () => void) {
                Promise.all(x.map((r) => r.start())).then(onDone);
            },
            revert(onDone?: () => void) {
                Promise.all(x.map((r) => r.revert())).then(onDone);
            },
        };
    }, []);

    return result;
};
