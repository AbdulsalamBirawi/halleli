import React, { useState } from "react";
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import icon from "../assets/Group.png";
import mele from "../assets/female.png";
import { Button } from "./Button";
import axios from "axios";
import { DeviceEventEmitter } from "react-native";
const Deteils = ({ visible, setvisible, deteils, completeTaskId }) => {
  const returnCompleteTask = async () => {
    const api = "http://192.168.1.11:3000/api";
    const res = await axios.put(`${api}/task/${completeTaskId}`, {
      status: false,
    });
    DeviceEventEmitter.emit("tasks->reload", { relod: true });
    console.log(res);
    setvisible(false);
  };
  console.log(visible);
  console.log({ deteils });
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <Text style={{ fontSize: 22, color: "#3B3A7A", fontWeight: "bold" }}>
            التفاصيل
          </Text>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#3B3A7A",
              width: "100%",
              padding: 20,
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 19 }}>{deteils.name}</Text>
            <Text
              style={{ fontWeight: "bold", color: "#3B3A7A", fontSize: 19 }}
            >
              اسم المهمة :
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#3B3A7A",
              width: "100%",
              padding: 20,
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 19 }}>{deteils.desc}</Text>
            <Text
              style={{ fontWeight: "bold", color: "#3B3A7A", fontSize: 19 }}
            >
              تفاصيل المهمة :
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#3B3A7A",
              width: "100%",
              padding: 20,
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 19 }}>
              {deteils?.time?.substring(0, 10)}
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#3B3A7A", fontSize: 19 }}
            >
              الوقت النهائي :
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#3B3A7A",
              width: "100%",
              padding: 20,
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 19 }}>{deteils.valueTask}</Text>
            <Text
              style={{ fontWeight: "bold", color: "#3B3A7A", fontSize: 19 }}
            >
              المبلغ المستحق :
            </Text>
          </View>
          <Button
            onPress={() => {
              setvisible(false);
            }}
            Title={"اغلاق"}
          >
            اغلاق
          </Button>
          {completeTaskId ? (
            <Button
              onPress={() => returnCompleteTask()}
              Title={"اعادة الارسال"}
            />
          ) : (
            <View></View>
          )}
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    borderRadius: 10,
    backgroundColor: "#fff",
    // height: "50%",
    width: "90%",
    alignItems: "center",
    padding: 10,
    marginTop: 130,
  },
  container: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default Deteils;
