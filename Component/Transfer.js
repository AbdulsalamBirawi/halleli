import React, { useContext, useEffect, useState } from "react";
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import halall2 from "../assets/halall2.png";
import set from "../assets/set.png";
import { Entypo, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { ContextGlobal } from "../Store/index";

import { Input } from "./TextInput";
import axios from "axios";
const Transfer = ({ visible = false, Title, childId }) => {
  const { width, height } = useWindowDimensions();
  const Context = useContext(ContextGlobal);
  const [mony, setMony] = useState("");
  const open = Context.open;
  const setOpen = Context.setOpen;
  const payToChild = async () => {
    const res = await axios.post(
      `http://192.168.43.79:3000/api/transaction/fromFather/${childId}`,
      {
        amount: mony,
      }
    );
    console.log(res);
  };

  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <View
            style={{
              width: "100%",
              height: 90,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ height: 5, width: 200 }}></View>
            <Image
              source={halall2}
              style={{
                height: 200,
                width: 200,
                resizeMode: "contain",
                position: "absolute",
                bottom: 0,
                marginLeft: 90,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 10 }}>
            <Text
              style={{
                textAlign: "right",
                fontSize: 27,
                color: "#3B3A7A",
              }}
            >
              مبلغ التحويل
            </Text>
            <Input
              placeholder={" المبلغ التحويل"}
              value={mony}
              onChangeText={(text) => setMony(text)}
            />
          </View>

          <TouchableOpacity
            onPress={() => payToChild()}
            style={{
              backgroundColor: "#3B3A7A",
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              marginTop: 40,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>إرسال</Text>
            <Image source={set} />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "40%",
    width: "90%",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Transfer;
