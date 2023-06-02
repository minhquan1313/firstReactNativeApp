import { IGoal } from "App";
import { FC, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import MyButton from "../MyButton";

export interface IGItemProps {
    index?: number;
    onPress: (id: number) => void;
}

// const generateC = (t: string) => {};

const GoalItem: FC<IGItemProps & IGoal> = ({ t, id, onPress }) => {
    const onPressHandler = useCallback(() => onPress(id), [id]);

    return (
        <MyButton style={styles.item} scaleAnimation={1} onPress={onPressHandler}>
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
