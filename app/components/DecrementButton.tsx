import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface DecrementButtonProps {
    onDecrement: () => void;
}

const DecrementButton: React.FC<DecrementButtonProps> = ({ onDecrement }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onDecrement} style={styles.button}>
                <Text style={styles.buttontext}>Decrement</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#FF4136",
        padding: 10,
        borderRadius: 5,
    },
    buttontext: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    },
});

export default DecrementButton;