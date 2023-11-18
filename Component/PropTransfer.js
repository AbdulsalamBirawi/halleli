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
import Transfer from "./Transfer";
const PropTransfer = ({ visible = false, Title }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <Transfer visible={false} />
        <View style={style.loader}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{ height: 50, width: 50, backgroundColor: "green" }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                طلال
              </Text>
              <View style={{ height: 70, width: 70 }}>
                <Image source={mele} />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              width: "70%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              marginTop: 70,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>تحويل المبلغ</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    borderRadius: 10,
    backgroundColor: "#3B3A7A",
    // height: "50%",
    width: "90%",
    // justifyContent: "center",
    alignItems: "center",
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

export default PropTransfer;
