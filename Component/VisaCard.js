// Import necessary modules from React and React Native
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Get the width of the screen
const width_screen = Dimensions.get("window").width;

// Calculate the card item width based on screen width and padding
const card_item = width_screen - 24 * 2;

// Define card size
const card_size = {
  width: 325,
  height: 196,
};

// Card component that displays card information
const Card = ({ total, url, cardHolder }) => {
  return (
    <LinearGradient colors={[
      '#a69bb1',
      '#8079aa'
    ]}  style={styles.card} borderRadius={30}>
      {/* Row for the card logo and the eye icon */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image source={require("../assets/Group9.png")} style={{
          width: 100,
          height:100
        }}/>
        <AntDesign name="eyeo" size={26} color="#fff" />
      </View>

      {/* Card number and expiration date */}
      <View style={styles.cardNumber}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cardNumberText}>{`${total}`}</Text>
        </View>
        <Text style={styles.cardNumberText}>{`**** **** **** ****`}</Text>
      </View>

      
    </LinearGradient>
  );
};

export default Card;

// Styles for the Card component
const styles = StyleSheet.create({
  card: {
    width: card_item,
    height: (card_item * card_size.height) / card_size.width,
    padding: 24,
    direction: "ltr",
    borderRadius: 30
    
  },
  cardNumber: {
    flex: 1,
    justifyContent: "center",
  },
  cardNumberText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
  cardHolderName: { color: "rgba(255,255,255,0.4)" },
  cardName: { color: "white", fontSize: 14 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
