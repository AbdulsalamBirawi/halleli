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
import SliectPrice from "./SliectPrice";
import { Input } from "./TextInput";
const SetPrices = ({ visible = false, Title }) => {
  const { width, height } = useWindowDimensions();
  const Context = useContext(ContextGlobal);
  const open = Context.open;
  const setOpen = Context.setOpen;
  const [num, setNum] = React.useState("");
  const [visibles, setVisible] = React.useState(false);
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <SliectPrice visible={visibles} />
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

          <View
            style={{
              gap: 10,
              marginTop: 50,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {[5, 10].map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setNum("");

                    setNum(item);
                  }}
                  style={{
                    height: 120,
                    width: 120,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: num == item ? "red" : "",
                  }}
                >
                  <Text
                    style={{ fontSize: 30, color: num == item ? "#fff" : "" }}
                  >
                    {item}
                  </Text>
                  <Text style={{ color: num == item ? "#fff" : "" }}>ريال</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {[15, 20].map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setNum("");
                    setNum(item);
                  }}
                  style={{
                    height: 120,
                    width: 120,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: num == item ? "red" : "",
                  }}
                >
                  <Text
                    style={{ fontSize: 30, color: num == item ? "#fff" : "" }}
                  >
                    {item}
                  </Text>
                  <Text style={{ color: num == item ? "#fff" : "" }}>ريال</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={{
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              marginTop: 40,
              flexDirection: "row",
              borderWidth: 1,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {" "}
              ادخال قيمة +
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#3B3A7A",
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              حفظ المكافئة
            </Text>
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
    height: "60%",
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

export default SetPrices;
