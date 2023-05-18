import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ListRowComponent = ({ rowData }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.rowText}>{rowData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    padding: 5,
  },
  rowText: {
    fontSize: 20,
    fontStyle: "italic",
  },
});
export default ListRowComponent;
