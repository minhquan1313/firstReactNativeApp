import { useMemo, useRef } from "react";
import { Animated, ImageStyle, TextStyle, ViewStyle } from "react-native";

type __STYLE = ViewStyle | TextStyle | ImageStyle;
// export interface useAnimationParams {
//     key: keyof __STYLE;
//     range: [number, number] | [string, string];
//     easing?: (input: number) => number;
//     duration?: number;
//     canBeInterrupt?: boolean;
// }
// // Animated.AnimatedInterpolation<string | number>

// export const useAnimation = ({
//     key,
//     range,
//     easing,
//     duration = 0,
//     canBeInterrupt = true,
// }: useAnimationParams) => {
//     const anim = useRef(new Animated.Value(0)).current;
//     const interpolate = anim.interpolate({
//         inputRange: [0, 1],
//         outputRange: range,
//         easing,
//     });

//     const result = {
//         style: {
//             [key]: interpolate,
//         },
//         start(cb?: () => void) {
//             Animated.timing(anim, {
//                 toValue: 1,
//                 duration,
//                 useNativeDriver: !canBeInterrupt,
//             }).start(cb ? cb : undefined);
//         },
//         stop(cb?: () => void) {
//             Animated.timing(anim, {
//                 toValue: 0,
//                 duration,
//                 useNativeDriver: !canBeInterrupt,
//             }).start(cb ? cb : undefined);
//         },
//     };
//     return result;
// };

// export interface useAnimationParams1 {
//     keys: (v: Animated.AnimatedInterpolation<string | number>) => any;
//     // {
//     //     [key in keyof __STYLE]: typeof v;
//     // };
//     range: [number, number] | [string, string];
//     easing?: (input: number) => number;
//     duration?: number;
//     canBeInterrupt?: boolean;
// }
export interface useAnimationParams11 {
    key: keyof __STYLE;
    range: [number, number] | [string, string];
    easing?: (input: number) => number;
    duration?: number;
    /**
     * default = true
     */
    canBeInterrupt?: boolean;
    customOutput?: (interpolate: Animated.AnimatedInterpolation<string | number>) => unknown;
}
export type TUseAnimationStyles = {
    [k in keyof __STYLE]: Animated.AnimatedInterpolation<string | number>;
};
export const useAnimation1 = (keys: useAnimationParams11[]) => {
    const anim = useRef(new Animated.Value(0)).current;

    const result = useMemo(() => {
        const x = keys.map(({ key, range, canBeInterrupt, customOutput, duration, easing }) => {
            const interpolate = anim.interpolate({
                inputRange: [0, 1],
                outputRange: range,
                easing,
            });

            const style: TUseAnimationStyles = {
                [key]: customOutput ? customOutput(interpolate) : interpolate,
            };

            const start = new Promise<void>((s) => {
                Animated.timing(anim, {
                    toValue: 1,
                    duration,
                    useNativeDriver: !canBeInterrupt,
                }).start((r) => {
                    if (r.finished) s();
                });
            });
            const revert = new Promise<void>((s) => {
                Animated.timing(anim, {
                    toValue: 0,
                    duration,
                    useNativeDriver: !canBeInterrupt,
                }).start((r) => {
                    if (r.finished) s();
                });
            });

            return { style, start, revert };
        });

        const styles: TUseAnimationStyles = {};
        x.forEach((r) => {
            const key = Object.keys(r.style)[0] as keyof __STYLE;
            styles[key] = r.style[key];
        });
        const starts = x.map((r) => r.start);
        const reverts = x.map((r) => r.revert);

        return {
            styles,
            start(cb?: () => void) {
                Promise.all<void>(starts).then(cb);
            },
            revert(cb?: () => void) {
                Promise.all<void>(reverts).then(cb);
            },
        };
    }, []);

    return result;
};

// export interface useAnimationParams2 {
//     key: keyof __STYLE;
//     range: [number, number] | [string, string];
//     easing?: (input: number) => number;
//     duration?: number;
//     canBeInterrupt?: boolean;
//     customOutput?: (anim: Animated.AnimatedInterpolation<string | number>) => any;
// }
// export const useAnimation2 = ({
//     key,
//     range,
//     easing,
//     duration = 0,
//     canBeInterrupt = true,
//     customOutput,
// }: useAnimationParams2) => {
//     const anim = useRef(new Animated.Value(0)).current;
//     const interpolate = anim.interpolate({
//         inputRange: [0, 1],
//         outputRange: range,
//         easing,
//     });

//     const result = {
//         style: {
//             [key]: customOutput ? customOutput(interpolate) : interpolate,
//         },
//         start(cb?: () => void) {
//             Animated.timing(anim, {
//                 toValue: 1,
//                 duration,
//                 useNativeDriver: !canBeInterrupt,
//             }).start(cb ? cb : undefined);
//         },
//         revert(cb?: () => void) {
//             Animated.timing(anim, {
//                 toValue: 0,
//                 duration,
//                 useNativeDriver: !canBeInterrupt,
//             }).start(cb ? cb : undefined);
//         },
//     };
//     return result;
// };
