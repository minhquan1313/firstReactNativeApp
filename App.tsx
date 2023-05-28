import GoalInput from "@/Components/GoalInput";
import GoalItems from "@/Components/GoalItem/GoalItems";
import { definedColors } from "@/Utils/definedColors";
import { statusBarHeight } from "@/Utils/phoneDetect";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface IGoal {
    t: string;
    id: number;
}

export default function App() {
    const [goals, setGoals] = useState<IGoal[]>([]);
    const ID = useRef(0);

    const newGoal = useCallback(
        (t: string) => setGoals((goals) => [...goals, { t: t, id: ID.current++ }]),
        []
    );

    const deleteGoal = useCallback(
        (id: number) => setGoals((g) => g.filter((r) => r.id !== id)),
        []
    );

    useEffect(() => {
        if (goals.length) return;

        for (let i = 0; i < 33; i++) {
            newGoal(`Sample ${i}`);
        }
    }, []);

    return (
        <View style={styles.appContainer}>
            <StatusBar style="auto" backgroundColor={definedColors["grey2"]} />

            <Text>
                deviceName:{Constants.deviceName}# appOwnership:{Constants.appOwnership}# name:
                {Constants.name}# systemVersion:{Constants.systemVersion}
            </Text>

            <GoalItems goals={goals} onPress={deleteGoal} />
            <GoalInput onCreate={newGoal} />
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        position: "relative",
        flex: 1,
        paddingTop: statusBarHeight,
        // paddingBottom: isIPhone ? statusBarHeight : 0,
        backgroundColor: definedColors["grey2"],
    },
});
