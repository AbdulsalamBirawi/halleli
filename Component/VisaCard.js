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
    <ImageBackground source={url} style={styles.card} borderRadius={30}>
      {/* Row for the card logo and the eye icon */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image source={require("../assets/visa_text.png")} />
        <AntDesign name="eyeo" size={26} color="#fff" />
      </View>

      {/* Card number and expiration date */}
      <View style={styles.cardNumber}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cardNumberText}>{`SAR ${total}`}</Text>
          <Text
            style={[styles.cardNumberText, { fontSize: 18 }]}
          >{`03/2025`}</Text>
        </View>
        <Text style={styles.cardNumberText}>{`**** **** **** ****`}</Text>
      </View>

      {/* Card holder information */}
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardHolderName}>Card holder</Text>
          <Text style={styles.cardName}>MR. {cardHolder} </Text>
        </View>
        <Image source={require("../assets/card_icon.png")} />
      </View>
    </ImageBackground>
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
