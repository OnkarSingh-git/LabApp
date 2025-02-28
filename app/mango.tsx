import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Mango() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mango</Text>
      <Image
        source={{
          uri: "https://thumbs.dreamstime.com/b/fresh-alphonso-mango-fruit-stem-leaf-isolated-white-background-314946902.jpg",
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
  },
});