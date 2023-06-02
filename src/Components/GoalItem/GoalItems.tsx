import { IGoal } from "App";
import { memo, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GetSize, { IGetSizeRefs } from "../GetSize";
import GoalItem, { IGItemProps } from "./GoalItem";

export interface IGItemsProps {
    goals: IGoal[];
}

const GoalItems = ({ goals, onPress }: IGItemsProps & IGItemProps) => {
    const flatList = useRef<FlatList>(null);
    const ITEM_HEIGHT = useRef(100);
    const itemRef = useRef<IGetSizeRefs>(null);

    useEffect(() => {
        console.log(itemRef.current);

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
                    length: ITEM_HEIGHT.current,
                    offset: ITEM_HEIGHT.current * index,
                    index,
                })}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <GetSize ref={itemRef}>
                        <GoalItem {...item} onPress={onPress} />
                    </GetSize>
                )}
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
