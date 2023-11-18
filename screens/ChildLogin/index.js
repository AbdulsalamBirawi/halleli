import { View, Text, Image } from "react-native";
import React from "react";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import halali from "../../assets/halali.png";
import logo from "../../assets/Group9.png";
const ChildLogin = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={logo}
        style={{
          position: "absolute",
          resizeMode: "contain",
        }}
      />
      <Image
        source={Ellipse}
        style={{
          position: "absolute",
          marginTop: "100%",
          resizeMode: "contain",
        }}
      />
      <View style={{ flex: 1, marginTop: 150, marginRight: 30 }}>
        <Image source={halali} />
      </View>
      <View style={{ flex: 3, padding: 10, marginTop: 300 }}>
        <Button
          Title={"الطفل"}
          onPress={() => navigation.navigate("Welcome")}
        />
        <Button
          Title={"ولي أمر"}
          onPress={() => navigation.navigate("ParentLogin")}
        />
      </View>
    </View>
  );
};

export default ChildLogin;
