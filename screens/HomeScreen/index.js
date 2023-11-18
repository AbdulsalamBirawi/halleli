// Import necessary modules and components from React and React Native
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import Card from "../../Component/VisaCard"; // Importing the Card component
import { Entypo, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import icons from "../../assets/card_visa_bg.png";
import icons2 from "../../assets/card_visa_bg-2.png";
import { styles } from "./style"; // Importing styles from an external file
import Ellipse from "../../assets/Ellipse.png";
import { ContextGlobal } from "../../Store";
import { Button } from "../../Component/Button";

// HomeScreen component that displays various elements
const HomeScreen = ({ navigation }) => {
  const Context = useContext(ContextGlobal);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogout, setisLogout] = useState(false);
  const user = Context.user;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setisLogout(false);
  };
  const handelLogout = () => {
    setisLogout(true);
    navigation.navigate("ParentLogin");
  };
  return (
    <ScrollView style={[styles.container]}>
      <Image
        source={Ellipse}
        style={{
          position: "absolute",
          marginTop: "100%",
          resizeMode: "contain",
        }}
      />
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
          <Ionicons
            name="ios-settings-outline"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("PerentLogout");
            }}
          />
        </View>
        <Text style={{ textAlign: "right", fontSize: 30, padding: 10 }}>
          اهلا بك ... {user.name}
        </Text>
      </View>
      {/* Horizontal lines */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.viewLine} />
        <View style={styles.viewLined} />
      </View>
      {/* Text for the current account */}
      <Text style={styles.textCom}>الحساب الجاري</Text>

      {/* TouchableOpacity for navigating to VisaScreen */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("VisaScreen");
        }}
        style={styles.counterCard}
      >
        {/* Render the Card component with specific props */}
        <Card url={icons2} total={500} />
      </TouchableOpacity>

      {/* Text for the savings account */}
      <Text style={styles.textCom}>الحساب الادخار</Text>

      {/* TouchableOpacity for navigating to SavingsScreen */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SavingsScreen");
        }}
        style={styles.counterCard}
      >
        {/* Render the Card component with specific props */}
        <Card url={icons} total={950} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                    <Text style={{ color: "white", fontSize: 15 }}>اغلاق</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default HomeScreen; // Export the HomeScreen component
