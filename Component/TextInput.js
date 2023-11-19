import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  Image,
} from "react-native";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useState, useContext } from "react";
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
  ...props
}) {
  const [IsFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  const [lan, setLan] = useState(false);

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
        {/* {auth && <Text>+972</Text>} */}
        {/* <MaterialIcons name={Icon} size={25} color="#AAAA" /> */}
        {/* <Image source={Icon} style={{ height: 30, width: 30 }} /> */}
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
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{
            height: 40,
            width: "83%",
            textAlign: lan ? "" : "right",
          }}
          placeholder={placeholder}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          onChange={onChange}
          // {...props}
        />
        {/* {inputs == "" ? null : (
          <MaterialIcons name={"check-circle"} size={25} color="green" />
        )} */}

        {/* {password && (
          <Entypo
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-with-line" : "eye"}
            size={25}
            color={"#AAAA"}
            style={{}}
          />
        )} */}
      </View>

      {error && (
        <Text
          style={{
            marginTop: 7,
            color: "red",
            fontSize: 10,
            marginLeft: 10,
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
