import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const fruits = ["apple", "orange", "mango"];

export default function FruitList() {
  const router = useRouter();

  return (
    <View>
      {fruits.map((fruit, index) => (
        <TouchableOpacity key={index} onPress={() => router.push(fruit)}>
          <Text style={styles.text}>{fruit}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 5,
  },
});