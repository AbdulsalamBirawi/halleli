import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import Loader from "../../Component/Loader";
import { ContextGlobal } from "../../Store";
import logo from "../../assets/Group9.png";
import SuccessTost from "../../Component/SuccessTost";

const API_URL = "http://192.168.1.66:3000/api";

const Profile = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = Context.handleLogin;
  const loder = Context.loder;
  const token = Context.token;
  const [first, setfirst] = useState("");
  const setParent = Context.setParent;
  console.log(token, "auth");
  // useEffect(() => {
  //   if (token !== null) {
  //     setParent(true);
  //     navigation.navigate("RooteTab");
  //   }
  // }, [token]);

  const handleLogins = async () => {
    handleLogin({ email, password });
  };
  const updateUserInfo = async () => {
    const res = await axios.post(`http://192.168.1.66:3000/api/users/newpass`, {
      email: email,
      password: password,
    });
    console.log(res);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        direction: "ltr",
      }}
    >
      <SuccessTost
        visible={loder}
        image={require("../../assets/lottie/loding/1.json")}
        Titel={"نجاح تسجيل الدخول"}
      />

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
      {/* <View style={{ flex: 1, marginTop: 100, marginRight: 30 }}>
        <Text style={{ textAlign: "right", fontSize: 35, color: "#3B3A7A" }}>
          أهلا بك..
        </Text>
        <Text style={{ textAlign: "right", fontSize: 35, color: "#3B3A7A" }}>
          {" "}
          تسجيل دخول
        </Text>
      </View> */}
      <View style={{ flex: 3, padding: 10, marginTop: 100 }}>
        <Text style={{ textAlign: "right", fontSize: 25, color: "#3B3A7A" }}>
          البريد الالكتروني
        </Text>
        <Input
          placeholder={"البريد الالكتروني"}
          // Icon={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        >
          <MaterialIcons name={"email"} size={25} color="#AAAA" />
        </Input>
        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#3B3A7A",
            marginTop: 20,
          }}
        >
          {" "}
          كلمة المرور الحالية
        </Text>
        <Input
          placeholder={"كلمة المرور الجديد"}
          Icon={"email"}
          value={password}
          onChangeText={(text) => setPassword(text.toLowerCase())}
          password
        >
          <FontAwesome name="lock" size={25} color="#AAAA" />
        </Input>
        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#3B3A7A",
            marginTop: 20,
          }}
        >
          {" "}
          كلمة المرور الجديد
        </Text>
        <Input
          placeholder={"كلمة المرور الحالية"}
          Icon={"email"}
          value={first}
          onChangeText={() => console.log("")}
          password
        >
          <FontAwesome name="lock" size={25} color="#AAAA" />
        </Input>

        <Button Title={"حفظ"} onPress={() => updateUserInfo()} />
      </View>
    </ScrollView>
  );
};

export default Profile;

// kem@gmail.com
