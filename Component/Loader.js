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
const Loader = ({ visible = false, Title }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <Image
            source={icon}
            style={{ height: 150, width: 150, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "#3B3A7A",
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            {Title}
            {/* تم اضافة الطفل بنجاح */}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#3B3A7A",
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              marginTop: 70,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>استمرار</Text>
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
    height: "50%",
    width: "90%",
    justifyContent: "center",
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

export default Loader;
