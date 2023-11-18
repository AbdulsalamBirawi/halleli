import React from "react";
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
import { Input } from "./TextInput";
const PriceGoal = ({ visible = false, Title }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <Text style={{ textAlign: "right", fontSize: 22 }}>اختر الحساب</Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <View
              style={{
                height: 70,
                width: "50%",
                backgroundColor: "#3B3A7A",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                الحساب الجاري
              </Text>
              <Text style={{ textAlign: "center", color: "#fff" }}>500</Text>
            </View>
            <View
              style={{
                height: 70,
                width: "50%",
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                الحساب الجاري
              </Text>
              <Text style={{ textAlign: "center", color: "#fff" }}>500</Text>
            </View>
          </View>
          <Text style={{ fontSize: 25, textAlign: "right" }}>
            اختر المبلغ المراد اضافته
          </Text>
          <Input placeholder={"مبلغ الاضافة"} />
          <View
            style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                width: "40%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginTop: 50,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                تحويل المبلغ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                width: "40%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginTop: 50,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                تحويل المبلغ
              </Text>
            </TouchableOpacity>
          </View>
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
    width: "100%",

    padding: 10,
    marginTop: 250,
  },
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    // alignItems: "center",
  },
});

export default PriceGoal;
