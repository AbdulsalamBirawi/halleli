import { View, Text, Image, TouchableOpacity } from "react-native";
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

const API_URL = "http://192.168.1.2:3000/api";

const ParentLogin = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chaild, setChaild] = useState([]);
  const handleLogin = Context.handleLogin;
  const loder = Context.loder;
  const token = Context.token;
  const setParent = Context.setParent;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/child`);
        if (response.data && Array.isArray(response.data)) {
          setChaild(response.data);
        } else {
          console.error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    }

    fetchData();
  }, []);

  console.log(token, "auth");
  useEffect(() => {
    if (token !== null) {
      setParent(true);
      navigation.navigate("RooteTab");
    }
  }, [token]);

  const handleLogins = async () => {
    handleLogin({ email, password });
  };

  return (
    <View
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
          كلمة المرور
        </Text>
        <Input
          placeholder={" كلمة المرور"}
          Icon={"email"}
          value={password}
          onChangeText={(text) => setPassword(text.toLowerCase())}
          password
        >
          <FontAwesome name="lock" size={25} color="#AAAA" />
        </Input>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPass")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "#843636",
              marginTop: 20,
            }}
          >
            هل نسيت كلمة المرور ؟
          </Text>
        </TouchableOpacity>
        <Button Title={"تسجيل الدخول"} onPress={handleLogins} />
        <TouchableOpacity onPress={() => navigation.navigate("ParentRegister")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#3B3A7A",
              marginTop: 10,
            }}
          >
            ليس لديك حساب جديد ؟{" "}
            <Text style={{ color: "#CDC618" }}>تسجيل جديد</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ParentLogin;

// kem@gmail.com
