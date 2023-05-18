import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
export default LoadingScreen;
