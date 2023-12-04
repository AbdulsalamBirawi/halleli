// Import necessary modules and components from React and React Native
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Card from "../../Component/VisaCard"; // Importing the Card component
import { Entypo, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import icons2 from "../../assets/card_visa_bg-2.png";
import { ListaSavings } from "../../Component/ListaSavings"; // Importing the ListaSavings component
import { styles } from "./style"; // Importing styles from an external file

// WalletScreen component that displays various elements
const WalletScreen = ({ route, navigation }) => {
  const { item, childData } = route.params;
  let child = null;
  try {
    child = JSON.parse(childData);
  } catch (error) {}

  // Data for displaying wallet transactions
  // const data = [];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setisLogout(false);
  };
  const handelLogout = () => {
    setisLogout(true);
    navigation.navigate("ChildLogin");
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogout, setisLogout] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="black"
            onPress={() => {
              setModalVisible(true);
            }}
          />
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
        {/* <ListaSavings data={data} /> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => toggleModal(null)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 10,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#3B3A7A",
                  fontSize: 20,
                  fontWeight: "600",
                  marginVertical: 20,
                  marginBottom: 50,
                  textAlign: "center",
                }}
              >
                تسجيل الخروج
              </Text>
              <Text
                style={{
                  color: "#3B3A7A",
                  fontSize: 20,
                  marginVertical: 20,
                  marginBottom: 50,
                  textAlign: "center",
                }}
              >
                هل انت متأكد من تسجيل خروجك ؟
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => handelLogout()}
                  style={{
                    backgroundColor: "green",
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>تأكيد</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleModal(null)}
                  style={{
                    backgroundColor: "red",
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>الغاء</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default WalletScreen;
