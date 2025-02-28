import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import FruitList from "./components/FruitList";

export default function Index() {
    const router = useRouter();

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome To App!</Text>
        <View style={styles.middleContainer}>
          <Button title="Click Me" onPress={() => alert("Button Pressed!")} />
          <FruitList />
          <Button title="Lab 3" onPress={() => router.push('/lab_3')} />
          <Button title="Lab 4" onPress={() => router.push('/lab_4')} />
          <Button title="Lab 5" onPress={() => router.push('/lab_5')} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});