import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import RadioButton from "../../Component/RadioButton";
import Ellipse from "../../assets/Ellipse.png";
import logo from "../../assets/Group9.png";
import user from "../../assets/user.png";
import Loader from "../../Component/Loader";
import SuccessTost from "../../Component/SuccessTost";

const API_URL = "http://192.168.1.11:3000/api";

const ParentRegister = ({ navigation }) => {
  const PROP = [
    {
      key: "female",
      text: "انثى",
    },
    {
      key: "male",
      text: "ذكر",
    },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [loder, setLoder] = useState(false);

  const handleLogin = async () => {
    try {
      console.log({ name, email, password, gender });
      const response = await axios.post(`${API_URL}/users`, {
        name,
        email,
        password,
        gender,
      });
      console.log(response.data);

      setLoder(true);
      setTimeout(() => {
        setLoder(false);
        navigation.navigate("ParentLogin");
      }, 2500);

      return response.data;
    } catch (error) {
      console.error("حدث خطأ أثناء تسجيل الدخول:", error);
    }
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
        Titel={"تم إنشاء حساب جديد "}
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
          تسجيل جديد
        </Text>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <Text style={{ textAlign: "right", fontSize: 25, color: "#3B3A7A" }}>
          الاسم
        </Text>
        <Input
          placeholder={" الاسم"}
          Icon={user}
          value={name}
          onChangeText={(text) => setName(text)}
          error={name ? false : <Text>the name is empty</Text>}
        >
          <FontAwesome name="user" size={25} color="#AAAA" />
        </Input>

        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#3B3A7A",
            marginTop: 20,
          }}
        >
          البريد الالكتروني
        </Text>
        <Input
          placeholder={"البريد الالكتروني"}
          Icon={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          error={email ? false : <Text>the email is empty</Text>}
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
          error={password ? false : <Text>the password is empty</Text>}
          password
        >
          <FontAwesome name="lock" size={25} color="#AAAA" />
        </Input>

        <Button Title={"تسجيل جديد "} onPress={handleLogin} />
      </View>
    </ScrollView>
  );
};

export default ParentRegister;
