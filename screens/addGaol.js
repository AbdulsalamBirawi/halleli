import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
} from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useContext, useState } from "react";
import { Input } from "../Component/TextInput";
import { Button } from "../Component/Button";
import RadioButton from "../Component/RadioButton";
import CheckboxGroup from "react-native-checkbox-group";
import { ContextGlobal } from "../Store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
const API_URL = "http://192.168.1.2:3000/api";

export default function AddGoal() {
  const [newGoal, setnewGoal] = useState({
    parentId: "",
    name: "",
    valueGoal: "",
    typeGoal: null,
    childId: "",
  });

  const options = [
    { label: "منخفضة", value: 1 },
    { label: "متوسطة", value: 2 },
    { label: "عالية", value: 3 },
  ];

  const context = useContext(ContextGlobal);
  const navigate = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);
  const handleCheckboxChange = (value) => {
    setSelectedValue(value === selectedValue ? null : value);
    setnewGoal({ ...newGoal, typeGoal: selectedValue });
  };
  const handleSubmit = async () => {
    const data = {
      typeGoal: newGoal.typeGoal || selectedValue,
      name: newGoal.name,
      valueGoal: newGoal.valueGoal,
      childId: context.loggedInChild._id,
    };
    console.log({ data });
    await axios.post(`${API_URL}/goal`, data);
    navigate.goBack();
    DeviceEventEmitter.emit("goal->reload", { reload: true });
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#3B3A7A",
        padding: 20,
      }}
    >
      {/* <Text
        style={{
          textAlign: "right",
          color: "#fff",
          fontSize: 22,
          marginTop: 50,
        }}
      >
        تصنيف المهمة
      </Text> */}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          marginTop: 20,
        }}
      >
        {["بدنية", "عقلية", "تطوعية"].map((item, index) => (
          <View
            style={{
              height: 40,
              width: 100,
              borderColor: "#fff",
              borderWidth: 2,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>{item}</Text>
          </View>
        ))}
      </View> */}
      <View style={{ marginTop: 100 }}>
        <Text style={{ textAlign: "right", color: "#fff", fontSize: 22 }}>
          اسم هدفك{" "}
        </Text>

        <Input
          onChangeText={(e) => setnewGoal({ ...newGoal, name: e })}
          placeholder={"اسم الهدف"}
          backColor={"#fff"}
          error={newGoal.name ? false : <Text>the name is empty</Text>}
        />
      </View>

      {/*  */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "right", color: "#fff", fontSize: 22 }}>
          القيمة
        </Text>
        <Input
          keyboardType="numeric"
          onChangeText={(e) => setnewGoal({ ...newGoal, valueGoal: e })}
          placeholder={"قيمة الهدف"}
          backColor={"#fff"}
          error={newGoal.valueGoal ? false : <Text>the value is empty</Text>}
        />
      </View>
      <Text
        style={{
          textAlign: "right",
          fontSize: 22,
          color: "#fff",
          marginTop: 20,
        }}
      >
        حدد اولوية هدفك
      </Text>
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

      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 15,
          marginBottom: 30,
          borderRadius: 20,
          marginTop: 100,
        }}
        onPress={() => handleSubmit()}
      >
        <Text>حفظ الهدف</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
