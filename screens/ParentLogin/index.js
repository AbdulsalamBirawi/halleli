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

const API_URL = "http://192.168.43.79:3000/api";

const ParentLogin = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chaild, setChaild] = useState([]);
  const handleLogin = Context.handleLogin;
  const loder = Context.loder;
  const token = Context.token;
  const setParent = Context.setParent;
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    setPassword(text);
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

  const handleLogins = async () => {
    if (emailError != "" || passwordError != "") {
      return;
    }
    handleLogin({ email, password });
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
    </ScrollView>
  );
};

export default ParentLogin;

// kem@gmail.com
