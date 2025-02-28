import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Orange() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Orange</Text>
      <Image
        source={{
          uri: "https://assets.shop.loblaws.ca/products/20002145001/b1/en/front/20002145001_front_a01_@2.png",
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