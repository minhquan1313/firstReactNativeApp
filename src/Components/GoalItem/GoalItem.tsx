import { IGoal } from "@/App";
import { memo } from "react";
import { StyleSheet } from "react-native";
import MyButton from "../MyButton";

export interface IGItemProps {
    onPress: (id: number) => void;
}
const GoalItem = ({ t, id, onPress }: IGItemProps & IGoal) => {
    return (
        <MyButton onPress={() => onPress(id)} color="main2" style={styles.item}>
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
