import { IGoal } from "App";
import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import MyButton from "../MyButton";

export interface IGItemProps {
    index?: number;
    onPress: (id: number) => void;
}

// const generateC = (t: string) => {};

const GoalItem = ({ t, id, onPress }: IGItemProps & IGoal) => {
    const onPressHandler = useCallback(() => onPress(id), [id]);

    return (
        <MyButton
            color={(id ?? 1) % 2 == 0 ? "main" : "main2"}
            style={styles.item}
            scaleAnimation={1}
            onPress={onPressHandler}>
            {t} + {id}
        </MyButton>
    );
};
export default memo(GoalItem);

const styles = StyleSheet.create({
    item: {
        marginVertical: 4,
    },
});
