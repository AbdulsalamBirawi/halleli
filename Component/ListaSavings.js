import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export const ListaSavings = ({ data, savings }) => {
  return (
    <>
      {/* Loop through each item in the 'data' array */}
      {data.map((item, index) => (
        <View key={index.toString()} style={styles.container}>
          <View>
            {/* Display the item's title */}
            <Text style={styles.title}>{item.title}</Text>
            {/* Display the item's date */}
            <Text style={styles.dateText}> {item.date}</Text>
          </View>
          <View>
            <View style={styles.price}>
              {/* Display the item's price, with color based on 'savings' */}
              <Text style={{ fontSize: 18, color: item.price > 0 ? "green" : "red" }}>
                {item.price}ريال
              </Text>
              <View style={styles.icon}>
                {/* Display an arrow icon, with color based on 'item.price > 0' */}
                {item.price > 0 ? (
                  <Feather name="arrow-down-left" size={20} color="green" />
                ) : (
                  <Feather name="arrow-up-right" size={20} color="red" />
                )}
              </View>
            </View>
            {/* Display the total, always in red */}
            <Text style={styles.textTotal}>{item.total} ريال</Text>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: "#ddd",
  },
  title: { fontSize: 18, textAlign: "center" },
  dateText: { fontSize: 15, textAlign: "center" },
  price: { flexDirection: "row", gap: 5 },
  icon: { backgroundColor: "#dddd", borderRadius: 5 },
  textTotal: { fontSize: 18, textAlign: "center", color: "red" },
});
