import { IGoal } from "App";
import { memo } from "react";
import { StyleSheet } from "react-native";
import MyButton from "../MyButton";

export interface IGItemProps {
    onPress: (id: number) => void;
}
const GoalItem = ({ t, id, onPress }: IGItemProps & IGoal) => {
    return (
        <MyButton color="main2" style={styles.item} scaleAnimation={3} onPress={() => onPress(id)}>
            {t}
        </MyButton>
    );
};
export default memo(GoalItem);

const styles = StyleSheet.create({
    item: {
        marginVertical: 4,
    },
});
