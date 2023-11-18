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
import PropTransfer from "./PropTransfer";
import PriceGoal from "./setPriceGoal";
const PropGoal = ({ visible = false, Title }) => {
  const { width, height } = useWindowDimensions();
  const [open, setOpen] = React.useState(false);
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <PriceGoal visible={open} />

        <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "#3B3A7A",
            borderRadius: 15,
            flexDirection: "row",
            direction: "rtl",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            marginTop: 200,
          }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 20 }}>دراجة</Text>
            <Text style={{ color: "#fff", fontSize: 20 }}>أولوية عالية</Text>
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}> اضافة مبلغ</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: "#fff", fontSize: 20 }}>3000</Text>
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
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default PropGoal;
