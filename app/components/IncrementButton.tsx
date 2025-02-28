import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface IncrementButtonProps {
    onIncrement: () => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ onIncrement }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onIncrement} style={styles.button}>
                <Text style={styles.buttontext}>Increment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
    buttontext: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    },
});

export default IncrementButton;