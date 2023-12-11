import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
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
  const user = Context.user;

  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [oldpass, setoldpass] = useState(null);
  const handleLogin = Context.handleLogin;
  const loder = Context.loder;
  const token = Context.token;
  const [first, setfirst] = useState("");

  const [error, setError] = useState({
    password: "",
  });

  const setParent = Context.setParent;

  const handelClose = () => {
    setModalVisible(false);
    navigation.navigate("ParentLogin");
  };

  const handleLogins = async () => {
    handleLogin({ email, password });
  };
  const updateUserInfo = async () => {
    const res = await axios.post(
      `http://192.168.1.66:3000/api/users/newpass`,
      {
        email: email,
        password: password,
      }
    );
    navigation.navigate("RooteTab");
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

      <View style={{ flex: 3, padding: 10, marginTop: 100 }}>
        <Text style={{ textAlign: "right", fontSize: 25, color: "#3B3A7A" }}>
          البريد الالكتروني
        </Text>
        <Input
          placeholder={"البريد الالكتروني"}
          // Icon={"email"}
          value={user.email}
          editable={false}
          //onChangeText={(text) => setEmail(text.toLowerCase())}
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
          placeholder={"كلمة المرور الحالية"}
          Icon={"email"}
          value={first}
          onChangeText={(t) => setfirst(t)}
          password
          error={oldpass ? false : <Text>the old password is empty</Text>}
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
          كلمة المرور الجديدة
        </Text>
        <Input
          placeholder={"كلمة المرور الجديدة"}
          Icon={"password"}
          value={password}
          error={error.password}
          onChangeText={(text) => {
            if (text.length < 8) {
              setError((v) => ({
                ...v,
                password: "كلمة السر يجب ان تكون 8 حروف على الاقل",
              }));
            } else {
              setError((v) => ({
                ...v,
                password: null,
              }));
            }
            setPassword(text);
          }}
          password
        >
          <FontAwesome name="lock" size={25} color="#AAAA" />
        </Input>
        <Button Title={"حفظ"} onPress={() => updateUserInfo()} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal(null)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 200,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#3B3A7A", marginVertical: 60, fontSize: 40 }}
              >
                تم التعديل بنجاح
              </Text>
              <Button Title={"رجوع"} onPress={() => handelClose()} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;

// kem@gmail.com
