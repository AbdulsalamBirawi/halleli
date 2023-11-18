import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Check({ PROP, onValueChange, CHILD }) {
  const [value, setValue] = useState(null);

  const handleRadioPress = (res) => {
    setValue(res.key);
    onValueChange(res.key); // قم بإعلام الصفحة الرئيسية بالقيمة المحددة
  };
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        justifyContent: "flex-end",
        marginTop: 20,
      }}
    >
      {PROP.map((res) => (
        <View
          key={res.key}
          style={[
            styles.container,
            { backgroundColor: CHAILD == true ? "" : "#fff" },
          ]}
        >
          <TouchableOpacity
            style={styles.radioCircle}
            onPress={() => {
              handleRadioPress(res);
            }}
          >
            {value === res.key && <View style={styles.selectedRb} />}
          </TouchableOpacity>
          <Text style={styles.radioText}>{res.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    width: "20%",
    justifyContent: "center",
    gap: 10,
    direction: "rtl",
  },
  radioText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "500",
  },
  radioCircle: {
    height: 21,
    width: 21,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});
