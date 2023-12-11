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

const API_URL = "http://192.168.1.16:3000/api";

const ParentRegister = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [loder, setLoder] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNameChange = (text) => {
    setName(text);
  };
  const handleNameBlur = () => {
    // Regular expression to match only English lowercase letters
    const englishLowercaseRegex = /^[a-z]+$/;

    // Check the validation when the input loses focus
    if (name.length === 0) {
      setError("The name should not be empty.");
    } else if (name.length <= 3) {
      setError("The name should be more than 3 characters.");
    } else if (englishLowercaseRegex.test(name)) {
      setError("");
    } else {
      setError(
        "Please enter a valid name with only English lowercase letters."
      );
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text.toLowerCase());
  };

  const handleEmailBlur = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Check the validation when the input loses focus
    if (email.length === 0) {
      setemailError("The email should not be empty.");
    } else if (emailRegex.test(email)) {
      setemailError("");
    } else {
      setemailError("Please enter a valid email address.");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text.toLowerCase());
  };

  const handlePasswordBlur = () => {
    // Validation for a password with more than 8 characters,
    // including numbers, lowercase and uppercase letters, and special characters
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{9,}$/;

    // Check the validation when the input loses focus
    if (password.length === 0) {
      setPasswordError("The password should not be empty.");
    } else if (password.length < 9 || !passwordRegex.test(password)) {
      setPasswordError(
        "Password must be more than 8 characters and include numbers, lowercase and uppercase letters, and special characters."
      );
    } else {
      setPasswordError("");
    }
  };
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
          onChangeText={handleNameChange}
          onBlur={handleNameBlur}
          error={error}
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
          onChangeText={handleEmailChange}
          error={emailError}
          onBlur={handleEmailBlur}
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
          onChangeText={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordError}
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
