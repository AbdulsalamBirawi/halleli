import { View, Text, TouchableOpacity, DeviceEventEmitter } from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useContext, useState } from "react";
import { Input } from "../Component/TextInput";
import { ContextGlobal } from "../Store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
const API_URL = "http://192.168.1.66:3000/api";

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
    if (taskNameError != "") {
      return;
    }
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

  const [taskNameError, setTaskNameError] = useState("");

  const handleTaskNameChange = (input) => {
    setnewGoal({ ...newGoal, name: input });
  };

  const handleTaskNameBlur = () => {
    // Regular expression for Arabic characters
    const arabicRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;

    if (newGoal.name.length < 3 || newGoal.name.length > 30) {
      setTaskNameError("Task name should be between 3 and 30 characters.");
    } else if (!arabicRegex.test(newGoal.name)) {
      setTaskNameError(
        "Task name should contain only Arabic and English characters."
      );
    } else {
      setTaskNameError("");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#3B3A7A",
        padding: 20,
      }}
    >
      <View style={{ marginTop: 100 }}>
        <Text style={{ textAlign: "right", color: "#fff", fontSize: 22 }}>
          اسم هدفك{" "}
        </Text>

        <Input
          onChangeText={(e) => handleTaskNameChange(e)}
          onBlur={handleTaskNameBlur}
          placeholder={"اسم الهدف"}
          backColor={"#fff"}
          error={taskNameError}
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
