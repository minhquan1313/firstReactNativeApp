import { IGoal } from "App";
import { memo, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GoalItem, { IGItemProps } from "./GoalItem";

export interface IGItemsProps {
    goals: IGoal[];
}

const ITEM_HEIGHT = 100;
const GoalItems = ({ goals, onPress }: IGItemsProps & IGItemProps) => {
    const flatList = useRef<FlatList>(null);

    useEffect(() => {
        //
        if (!goals.length) return;

        flatList.current?.scrollToIndex({
            index: 2,
        });
    }, [goals]);

    return (
        <View style={styles.itemsContainer}>
            <Text style={styles.itemsHeader}>List of goals</Text>

            <FlatList
                data={goals}
                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => <GoalItem {...item} onPress={onPress} />}
                ref={flatList}
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
