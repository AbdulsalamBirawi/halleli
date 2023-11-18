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
const PropSent = ({ visible = false, Title }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            هل أنت متأكد من طلب إضافة المهمة ؟
          </Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                width: "40%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginTop: 70,
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
                marginTop: 70,
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
    width: "90%",
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 200,
  },
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default PropSent;
