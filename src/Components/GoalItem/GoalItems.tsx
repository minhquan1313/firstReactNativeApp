import { IGoal } from "App";
import { memo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GoalItem, { IGItemProps } from "./GoalItem";

export interface IGItemsProps {
    goals: IGoal[];
}
const GoalItems = ({ goals, onPress }: IGItemsProps & IGItemProps) => {
    return (
        <View style={styles.itemsContainer}>
            <Text style={styles.itemsHeader}>List of goals</Text>

            <FlatList
                data={goals}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item, index }) => (
                    <GoalItem {...item} index={index} onPress={onPress} />
                )}
            />
        </View>
    );
};

export default memo(GoalItems);

const styles = StyleSheet.create({
    itemsContainer: {
        flex: 1,
        // backgroundColor: "yellow",
        paddingHorizontal: 20,
        marginTop: 12,
        marginBottom: 12,
        gap: 12,
    },
    itemsHeader: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
});
