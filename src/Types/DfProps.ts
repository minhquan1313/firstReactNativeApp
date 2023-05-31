import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface DfProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
