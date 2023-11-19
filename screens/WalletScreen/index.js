// Import necessary modules and components from React and React Native
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Card from "../../Component/VisaCard"; // Importing the Card component
import { Entypo, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import icons2 from "../../assets/card_visa_bg-2.png";
import { ListaSavings } from "../../Component/ListaSavings"; // Importing the ListaSavings component
import { styles } from "./style"; // Importing styles from an external file

// WalletScreen component that displays various elements
const WalletScreen = ({ route, navigation }) => {
  const { item, childData } = route.params;
  const child = JSON.parse(childData);
  // Data for displaying wallet transactions
  const data = [
    
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <Ionicons name="ios-settings-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
        <Text style={{ textAlign: "right", fontSize: 30, padding: 10 }}>
          اهلا بك ... {item.name}!
        </Text>
      </View>
      {/* Horizontal lines */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.viewLine} />
        <View style={styles.viewLined} />
      </View>
      {/* Text for the current account */}
      <Text style={styles.textCom}>الحساب الجاري</Text>

      {/* Display the current account card */}
      <View style={styles.counterCard}>
        <Card
          url={icons2}
          total={child?.child?.currentAccount || item.currentAccount}
          cardHolder={child?.child?.name || item.name}
        />
      </View>
      {/* Text for displaying the latest transfers */}
      <Text style={styles.textNewCome}>احدث التحويلات</Text>
      <View>
        <View style={styles.showMore}>
          <AntDesign name="left" size={18} color="red" />

          <Text style={{ color: "red", fontSize: 16 }}>المزيد</Text>
        </View>

        {/* Display the ListaSavings component with specific data */}
        <ListaSavings data={data} />
      </View>
    </ScrollView>
  );
};

export default WalletScreen;
