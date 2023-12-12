import { View, Text, Image } from "react-native";
import React from "react";
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import { ContextGlobal } from "../../Store";
const API_URL = "http://192.168.1.66:3000/api";
import Loader from "../../Component/Loader";
import SuccessTost from "../../Component/SuccessTost";

import axios from "axios";

const Createpassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [password, setPassword] = React.useState("");
  const [loder, setLoder] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  const handelChangePassword = async () => {
    if (passwordError != "") {
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/users/newpass`, {
        email,
        password,
      });

      setLoder(true);

      setTimeout(() => {
        setLoder(false);
        navigation.navigate("ParentLogin");
      }, 2500);

      return response.data;
    } catch (error) {
      console.error("حدث خطأ أثناء تسجيل الدخول:", error);
      throw error;
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
        image={require("../../assets/lottie/create-new-password (1).json")}
        Titel={"Success Saend"}
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
        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#843636",
            marginTop: 20,
          }}
        >
          إعادة تعين كلمة المرور
        </Text>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#3B3A7A",
            marginBottom: 20,
          }}
        >
          فضلا قم بإدخال كلمة المرور الجديدة
        </Text>

        <Input
          placeholder={"كلمة المرور الجديدة"}
          value={password}
          onChangeText={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordError}
          password
        >
          <FontAwesome name="lock" size={25} color="#AAAA" />
        </Input>

        <Button Title={"تأكيد"} onPress={handelChangePassword} />
      </View>
    </View>
  );
};

export default Createpassword;
