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
    updatedAt: Date;
}

const bgColor = definedColors["white"];

export default function App() {
    const [goals, setGoals] = useState<IGoal[]>([]);
    const ID = useRef(0);

    const newGoal = useCallback((t: string) => {
        const g = {
            t: t,
            id: ID.current++,
            updatedAt: new Date(),
        };
        setGoals((goals) => [...goals, g]);
    }, []);

    const deleteGoal = useCallback((id: number) => {
        setGoals((g) =>
            g.filter((r, i, arr) => {
                if (r.id === id) {
                    if (g.length > 1) {
                        let index = i;
                        if (i === 0) index = 1;
                        else if (i === arr.length - 1) {
                            index = arr.length - 2;
                        } else index = i - 1;

                        arr[index].updatedAt = new Date();
                    }
                }

                return r.id !== id;
            })
        );
    }, []);

    useEffect(() => {
        console.log(`----app`);

        if (goals.length) return;

        for (let i = 0; i < 22; i++) newGoal(`Sample ${i}`);
    }, []);

    return (
        <View style={styles.appContainer}>
            <StatusBar style="auto" />

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
        backgroundColor: bgColor,
    },
});
