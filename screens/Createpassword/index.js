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
const API_URL = "http://192.168.1.5:3000/api";
import Loader from "../../Component/Loader";
import SuccessTost from "../../Component/SuccessTost";

import axios from "axios";

const Createpassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [password, setPassword] = React.useState("");
  const [loder, setLoder] = React.useState(false);

  const handelChangePassword = async () => {
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
          placeholder={"البريد الالكتروني"}
          value={password}
          onChangeText={(text) => setPassword(text)}
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
