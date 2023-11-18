import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default RadioButton = ({ value, onValueChange }) => {
  const [visible, setvisible] = useState(false);

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
      <View
        key={value.key}
        style={{
          marginBottom: 10,
          alignItems: "center",
          flexDirection: "row",
          height: 50,
          width: "25%",
          justifyContent: "center",
          gap: 5,
          direction: "rtl",
          // backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity
          style={{
            height: 21,
            width: 21,
            borderRadius: 5,
            borderWidth: 2,
            // borderColor: "blue",
            borderColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            handleRadioPress(value);
          }}
        >
          {value === res.key && <View style={styles.selectedRb} />}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            // color: "#000",
            color: "#fff",
            fontWeight: "500",
          }}
        >
          {value.text}
        </Text>
      </View>
    </View>
  );
};

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
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: "white",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});
