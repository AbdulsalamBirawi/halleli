import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";

const Welcome = ({ navigation }) => {
  const [token, setToken] = useState('');
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      <Image
        source={Ellipse}
        style={{
          position: "absolute",
          marginTop: "100%",
          resizeMode: "contain",
        }}
      />
      <View style={{ flex: 1, marginTop: 100, marginRight: 30 }}>
        <Text style={{ textAlign: "right", fontSize: 35, color: "#3B3A7A" }}>
          أهلا بك..
        </Text>
        <Text style={{ textAlign: "right", fontSize: 35, color: "#3B3A7A" }}>
          {" "}
          تسجيل دخول
        </Text>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: "#3B3A7A",
            marginTop: 100,
            marginBottom: 70,
          }}
        >
          احصل على معلومات الدخول من خلال حساب الاباء
        </Text>
        <Button
          Title={"تسجيل الدخول بالباركود"}
          onPress={() => navigation.navigate("ScannerScreen")}
        />
        
      </View>
    </View>
  );
};

export default Welcome;
