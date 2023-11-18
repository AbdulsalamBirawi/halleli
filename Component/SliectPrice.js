import React, { useContext } from "react";
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
const SliectPrice = ({ visible = false, Title }) => {
  const { width, height } = useWindowDimensions();
  const Context = useContext(ContextGlobal);
  const open = Context.open;
  const setOpen = Context.setOpen;
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <View
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ height: 5, width: 200 }}></View>

            <TouchableOpacity
              onPress={() => {
                setOpen(false);
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "#3B3A7A",
              fontWeight: "bold",
            }}
          >
            اختر المكافئة
          </Text>

          <View style={{ gap: 10, marginTop: 50 }}>
            <Text
              style={{
                textAlign: "right",
                fontSize: 27,
                color: "#3B3A7A",
              }}
            >
              مبلغ المكافئة
            </Text>
            <Input
              placeholder={" المبلغ التحويل"}
              //   value={email}
              //   onChangeText={(text) => setEmail(text)}
            />
          </View>

          <TouchableOpacity
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
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              حفظ المكافئة
            </Text>
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

export default SliectPrice;
