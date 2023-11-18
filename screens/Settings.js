import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Input } from "../Component/TextInput";
import { Button } from "../Component/Button";
export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#3B3A7A",
      }}
    >
      <Text
        style={{
          textAlign: "right",
          color: "#fff",
          fontSize: 22,
          marginTop: 50,
        }}
      >
        تصنيف المهمة
      </Text>
      <View
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
      </View>
      <View style={{ marginTop: 20, padding: 20 }}>
        <Text style={{ textAlign: "right", color: "#fff", fontSize: 22 }}>
          اسم المهمة{" "}
        </Text>
        <Input placeholder={"اسم المهمة"} backColor={"#fff"} />
      </View>

      {/*  */}
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: "right", color: "#fff", fontSize: 22 }}>
          اسم المهمة{" "}
        </Text>
        <Input placeholder={"اسم المهمة"} backColor={"#fff"} />
      </View>
      {/*  */}
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: "right", color: "#fff", fontSize: 22 }}>
          اسم المهمة{" "}
        </Text>
        <Input placeholder={"اسم المهمة"} backColor={"#fff"} />
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 15,
          margin: 10,
          borderRadius: 20,
        }}
      >
        <Text>اضافة المهمة</Text>
      </TouchableOpacity>
    </View>
  );
}
