import React from "react";
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Lottie from "lottie-react-native";

const SuccessTost = ({ visible = false, Titel, image }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <Lottie
            source={image}
            autoPlay
            loop
            style={{ height: "100%", width: "100%" }}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 23,
              color: "green",
              fontWeight: "bold",
            }}
          >
            {Titel}
          </Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 300,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
});

export default SuccessTost;
