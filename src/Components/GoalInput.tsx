import { crownImg } from "@/Utils/ImageCollection";
import { bottomSpacing, isIPhone } from "@/Utils/phoneDetect";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import MyButton from "./MyButton";

export interface IGInputProps {
    onCreate: (t: string) => void;
}

const initTxt = "";
const GoalInput = ({ onCreate }: IGInputProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const txt = useRef("");
    const inp = useRef<TextInput>(null);

    const updateTxt = useCallback((t: string) => {
        txt.current = t.trim();
    }, []);

    const showModalAddGoal = useCallback(() => setIsVisible(true), []);

    const onAddGoalHandler = () => {
        const t = txt.current;
        if (!t) return;

        onCreate(t);
        setIsVisible(false);
    };

    useEffect(() => {
        if (!isVisible) return;
        txt.current = initTxt;
        inp.current?.setNativeProps({ text: initTxt });
        inp.current?.focus();
    }, [isVisible]);

    return (
        <View>
            <MyButton
                textCenter
                sharpCorner
                color="main"
                style={styles.addGoalBtn}
                onPress={showModalAddGoal}>
                Add a goal
            </MyButton>

            <Modal visible={isVisible} animationType="slide" presentationStyle="formSheet">
                <TouchableWithoutFeedback onPress={() => inp.current?.blur()}>
                    <KeyboardAvoidingView
                        behavior={isIPhone ? "padding" : "height"}
                        style={[styles.inputContainer]}>
                        <Image source={crownImg} style={styles.img} />

                        <TextInput
                            blurOnSubmit
                            placeholder="Course goal"
                            style={styles.input}
                            onChangeText={updateTxt}
                            onSubmitEditing={onAddGoalHandler}
                            ref={inp}
                        />

                        <View style={styles.buttons}>
                            <MyButton scaleAnimationThreshold={5} onPress={onAddGoalHandler}>
                                Add goal
                            </MyButton>
                            <MyButton color="dark" onPress={() => setIsVisible(false)}>
                                Close
                            </MyButton>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        gap: 12,
        // backgroundColor: "red",
    },
    img: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        // backgroundColor: "red",
    },
    input: {
        borderColor: "#3742fa",
        borderWidth: 1,
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#f1f2f6",
        fontSize: 16,
    },
    buttons: {
        flexDirection: "row",
        gap: 12,
    },
    addGoalBtn: {
        // position: "absolute",
        paddingTop: 12,
        // paddingTop: statusBarHeight + (isIPhone ? 12 : 0),
        paddingBottom: bottomSpacing + 12,
        // paddingBottom: 12,
    },
});

export default memo(GoalInput);
