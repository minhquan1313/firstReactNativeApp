import { IGoal } from "App";
import { FC, memo, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import MyButton from "../MyButton";

export interface IGItemProps {
    index?: number;
    flash?: boolean;
    onPress: (id: number) => void;
}

const GoalItem: FC<IGItemProps & IGoal> = ({ flash, t, id, onPress }) => {
    const onPressHandler = useCallback(() => onPress(id), [id]);

    useEffect(() => {
        if (flash) console.log(`flash`, t, id);
    });

    return (
        <MyButton
            style={styles.item}
            scaleAnimationThreshold={1}
            onPress={onPressHandler}
            startAnimation={flash}>
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
