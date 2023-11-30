import { View, Text, Image, DeviceEventEmitter } from "react-native";
import React, { useState, useContext } from "react";
import {
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import Loader from "../../Component/Loader";
export const API_URL = "http://192.168.1.66:3000/api";
import axios from "axios";
import { ContextGlobal } from "../../Store";
import { CheckBox } from "react-native-elements";

const CreateChild = () => {
  const Context = useContext(ContextGlobal);
  const [name, setName] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [gender, setGender] = useState("");
  const [loder, setLoder] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const token = Context.token;
  const setIsFirstTime = Context.setIsFirstTime;

  const handleCheckboxChange = (value) => {
    setSelectedValue(value === selectedValue ? null : value);
    setGender(value);
  };
  const options = [
    { label: "ذكر", value: "male" },
    { label: "انثى", value: "female" },
  ];
  const handleLogin = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      console.log({ name, dateBirth, gender });
      const response = await axios.post(
        `${API_URL}/child`,
        {
          name,
          dateBirth,
          gender,
        },
        config
      );
      setIsFirstTime(false);

      DeviceEventEmitter.emit("creat->child", { reload: true });
      console.log(response.data);

      setLoder(true);
      setTimeout(() => {
        setLoder(false);
        // navigation.navigate("ParentLogin");
      }, 2000);

      return response.data;
    } catch (error) {
      console.error("حدث خطأ أثناء  :", error);
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
      <Loader visible={loder} />

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
          حساب طفل ...
        </Text>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <Text style={{ textAlign: "right", fontSize: 25, color: "#3B3A7A" }}>
          الاسم
        </Text>
        <Input
          placeholder={" الاسم"}
          Icon={"email"}
          value={name}
          onChangeText={(text) => setName(text)}
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
          {" "}
          تاريخ الميلاد
        </Text>
        <Input
          placeholder={"  تاريخ الميلاد "}
          Icon={"email"}
          value={dateBirth}
          onChangeText={(text) => setDateBirth(text)}
        >
          <Fontisto name="date" size={25} color="#AAAA" />
        </Input>

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          {options.map((option) => (
            <CheckBox
              key={option.value}
              title={option.label}
              checked={option.value === selectedValue}
              onPress={() => handleCheckboxChange(option.value)}
            />
          ))}
        </View>

        <Button Title={" إضافة الطفل "} onPress={handleLogin} />
      </View>
    </View>
  );
};

export default CreateChild;
