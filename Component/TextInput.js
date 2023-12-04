import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { Alert } from "react-native";
import { StyleSheet, TextInput, View, Text } from "react-native";

export function Input({
  keyboardType,
  value,
  placeholder,
  onChangeText,
  password,
  width,
  Icon,
  error,
  auth,
  inputs,
  backColor,
  onChange,
  editable,
  defaultValue,
  onFocus = () => {},
  required = true, // Add a required prop
  ...props
}) {
  const [IsFocused, setIsFocused] = useState(false);
  const [lan, setLan] = useState(false);
  console.log({error});
  const handleBlur = () => {
    setIsFocused(false);

    // Check if the value is empty when the field loses focus

    if (required && value == undefined) {
      // Perform your error handling, e.g., show an error message
    }
    console.log(value);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: error ? "red" : IsFocused ? "#0262E4" : "black",
            gap: 10,
            borderWidth: IsFocused ? 1 : 0,
            direction: lan ? "" : "rtl",
            backgroundColor: backColor ? backColor : "#EAEAEA",
            borderWidth: 1,
          },
        ]}
      >
        {props.children}
        <TextInput
          defaultValue={defaultValue}
          autoCapitalize="none"
          autoCorrect
          editable={editable}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={handleBlur} // Call the handleBlur function
          style={{
            height: 40,
            width: "83%",
            textAlign: lan ? "" : "right",
          }}
          placeholder={placeholder}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={password}
          onChange={onChange}
        />
      </View>

      {error && (
        <Text
          style={{
            marginTop: 7,
            color: "red",
            fontSize: 15,
            marginLeft: 10,
            fontWeight: 500,
            fontWeight: "300",
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
});
