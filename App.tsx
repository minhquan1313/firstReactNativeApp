import GoalInput from "@/Components/GoalInput";
import GoalItems from "@/Components/GoalItem/GoalItems";
import { definedColors } from "@/Utils/definedColors";
import { isIPhone } from "@/Utils/phoneDetect";
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
            <StatusBar style="light" />

            <GoalInput onCreate={newGoal} />

            <Text>
                deviceName:{Constants.deviceName}# appOwnership:{Constants.appOwnership}# name:
                {Constants.name}# systemVersion:{Constants.systemVersion}
            </Text>

            <GoalItems goals={goals} onPress={deleteGoal} />
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingBottom: isIPhone ? Constants.statusBarHeight : 0,
        backgroundColor: definedColors["grey2"],
    },
});
