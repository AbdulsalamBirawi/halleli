import React, { useContext, useEffect, useState } from "react";
import {
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import halall2 from "../assets/halall2.png";
import set from "../assets/set.png";
import { Entypo, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { ContextGlobal } from "../Store/index";

import { Input } from "./TextInput";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const Transfer = ({
  visible = false,
  Title,
  childId,
  setVisible,
  setReload,
}) => {
  const { width, height } = useWindowDimensions();
  const Context = useContext(ContextGlobal);
  const [mony, setMony] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const open = Context.open;
  const setOpen = Context.setOpen;
  const getChild = Context.getChild;
  const navigation = useNavigation();
  const payToChild = async () => {
    const res = await axios.post(
      `http://192.168.1.16:3000/api/transaction/fromFather/${childId}`,

      {
        amount: mony,
        day: selectedValue,
      },
      {
        headers: { Authorization: "Bearer " + Context.token },
      }
    );
    setVisible(false);
    setReload((p) => !p);
    setMony(undefined);
    navigation.navigate("AddChild");

    DeviceEventEmitter.emit("creat->child", { reload: true });
  };
  const daysArray = Array.from({ length: 27 }, (_, index) => index + 1);
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
          <View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              {daysArray.map((day) => (
                <Picker.Item key={day} label={`Day ${day}`} value={day} />
              ))}
            </Picker>
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
