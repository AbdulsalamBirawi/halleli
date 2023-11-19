// Import necessary modules and components from React and React Native
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "../../Component/VisaCard"; // Importing the Card component
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ListaSavings } from "../../Component/ListaSavings"; // Importing the ListaSavings component
import icons from "../../assets/card_visa_bg.png";
import { styles } from "./style"; // Importing styles from an external file

// SavingsScreen component that displays various elements
const SavingsScreen = ({route, navigation}) => {
  const { item, childData } = route.params;
  const data = [
  
  ];

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <Ionicons name="ios-settings-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
        
      </View>
      {/* Text for the savings account */}
      <Text style={styles.textCom}>الحساب الادخار</Text>

      {/* Display the savings card */}
      <View style={styles.counterCard}>
        <Card cardHolder={item?.name} url={icons} total={item?.savingAccount} />
      </View>
      {/* Text for displaying the latest transfers */}
      <Text style={styles.textNewCome}>احدث التحويلات</Text>
      <View>
        <View style={styles.showMore}>
          <AntDesign name="left" size={18} color="red" />

          <Text style={{ color: "red", fontSize: 16 }}>المزيد</Text>
        </View>

        {/* Display the ListaSavings component with specific data */}
        <ListaSavings data={data} savings={true} />
      </View>
    </View>
  );
};

export default SavingsScreen;
