import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import Logout from "../../assets/Logout.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextGlobal } from "../../Store/index";
import logo from "../../assets/Group9.png";

const PerentLogout = ({ navigation }) => {
  const Context = useContext(ContextGlobal);
  const removeAuth = Context.removeAuth;
  const token = Context.token;

  const handelLogoout = () => {
    removeAuth();
    navigation.navigate("Home");
  };

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
      <Image
        source={logo}
        style={{
          position: "absolute",
          resizeMode: "contain",
          marginTop: 550,
        }}
      />
      <View style={{ flex: 1, marginTop: 100, marginRight: 30 }}>
        <Text
          style={{
            textAlign: "right",
            fontSize: 35,
            color: "#3B3A7A",
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          عن هللي
        </Text>
        <Text
          style={{
            fontSize: 19,
            textAlign: "right",
            marginTop: 20,
            color: "#3B3A7A",
            fontWeight: "500",
          }}
        >
          تطبيق ريادي تقني يهدف الى تعليم الاطفال مفهوم الادخار و التخطيط المالي
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ height: 1, width: "40%" }} />
        <View style={{ height: 2, backgroundColor: "#3B3A7A", width: "60%" }} />
        <View />
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <Button
          Title={"تعديل الملف الشخصي"}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
        <TouchableOpacity
          onPress={handelLogoout}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: 300,
            marginLeft: 150,
          }}
        >
          <Text style={{ fontSize: 20, color: "red" }}>تسجيل خروج</Text>
          <Image
            source={Logout}
            style={{
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        {/* <Button Title={"تأكيد"} /> */}
      </View>
    </View>
  );
};

export default PerentLogout;
