import React from "react";
import { View, Text, Image } from "react-native";

export default function Apple() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Apple</Text>
      <Image
        source={{
          uri: "https://product-images.metro.ca/images/h05/hae/10379028791326.jpg",
        }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}