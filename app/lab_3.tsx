import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import IncrementButton from "./components/IncrementButton";
import DecrementButton from "./components/DecrementButton";

const Lab3 = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => setCounter(counter + 1);
    const decrement = () => setCounter(counter - 1);

    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>Counter: {counter}</Text>
            <IncrementButton onIncrement={increment} />
            <DecrementButton onDecrement={decrement} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    counterText: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Lab3;