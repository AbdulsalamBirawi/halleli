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

import * as Notifications from "expo-notifications";

import axios from "axios";
import { DeviceEventEmitter } from "react-native";
const Deteils = ({ visible, setvisible, deteils, completeTaskId }) => {
  const showNotification = async (title, body) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Second, call the method

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
      },
      trigger: null,
    });
  };

  const deleteCompleteTask = async () => {
    const res = await axios.get(
      `http://192.168.1.16:3000/api/task/father-complete/${completeTaskId}`
    );
    console.log(res);
  };
  const returnCompleteTask = async () => {
    const api = "http://192.168.1.16:3000/api";
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
              // showNotification();
              setvisible(false);
            }}
            Title={"الغاء"}
          >
            الغاء
          </Button>
          {completeTaskId ? (
            <View>
              <Button
                onPress={() => returnCompleteTask()}
                Title={"اعادة الارسال"}
              />
              <Button
                onPress={() => {
                  setvisible(false);
                  deleteCompleteTask();
                }}
                Title={"تاكيد اكمال المهمة"}
              />
            </View>
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

    alignItems: "center",
    padding: 10,
    marginTop: 30,
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
