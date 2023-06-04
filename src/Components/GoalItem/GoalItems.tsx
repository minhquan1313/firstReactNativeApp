import { IGoal } from "App";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GetSize, { IOnSize } from "../GetSize";
import GoalItem, { IGItemProps } from "./GoalItem";

export interface IGItemsProps {
    goals: IGoal[];
    // ms
}

const GoalItems = ({ goals, onPress }: IGItemsProps & IGItemProps) => {
    // const [updated, setUpdated] = useState(false);
    const flatList = useRef<FlatList>(null);
    const [latestGoal, setLatestGoal] = useState<IGoal>();
    const [itemHeight, setItemHeight] = useState(-1);

    const onSize = useCallback(({ height }: IOnSize) => {
        setItemHeight((r) => height);
    }, []);

    useEffect(() => {
        if (!goals.length || itemHeight === -1) return;

        const index = goals.length - 1;

        flatList.current?.scrollToIndex({
            index,
            animated: true,
        });
    }, [goals, itemHeight]);

    useEffect(() => {
        console.log(`GoalItems`, itemHeight);
    });

    useEffect(() => {
        // Find latest goal

        let g;
        if (goals.length) {
            g = goals[0];
            const dateG = g.updatedAt.getTime();

            goals.forEach((r) => {
                const dateR = r.updatedAt.getTime();
                if (dateG < dateR) g = r;
            });
        }
        setLatestGoal(g);

        console.log(`setLatestGoal`, g);
    }, [goals]);

    return (
        <View style={styles.itemsContainer}>
            <Text style={styles.itemsHeader}>List of goals</Text>

            <FlatList
                data={goals}
                getItemLayout={(d, index) => ({
                    length: itemHeight,
                    offset: itemHeight * index,
                    index,
                })}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item, index }) => (
                    <GetSize onSize={onSize} t={item.t}>
                        <GoalItem {...item} flash={latestGoal?.id === item.id} onPress={onPress} />
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
