// Import necessary modules and components from React and React Native
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../Component/VisaCard"; // Importing the Card component
import { Entypo, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import Transfer from "../../Component/Transfer";
import icons from "../../assets/card_visa_bg.png";
import icons2 from "../../assets/card_visa_bg-2.png";
import { styles } from "./style"; // Importing styles from an external file
import Ellipse from "../../assets/Ellipse.png";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import set from "../../assets/set.png";
import transfer from "../../assets/money-transfer.png";
import { ContextGlobal } from "../../Store/index";
import axios from "axios";
// HomeScreen component that displays various elements
const ProfileChild = ({ route, navigation }) => {
  const { IdChaild, token, item, isBrother } = route.params;
  console.log(isBrother);
  const Context = useContext(ContextGlobal);
  const open = Context.open;
  const setOpen = Context.setOpen;
  const [child, setChild] = useState(undefined);
  const [reload, setReload] = useState(false);
  const getChildById = async () => {
    const res = await axios.get(
      `http://192.168.43.79:3000/api/child/child/${IdChaild}`
    );
    console.log({ res: res.data });
    const Child = res.data;
    console.log(Child);
    setChild(Child);
  };

  useEffect(() => {
    getChildById();
  }, [reload]);

  return (
    <ScrollView style={[styles.container]}>
      <Transfer
        setReload={setReload}
        setVisible={setOpen}
        childId={IdChaild}
        visible={open}
      />
      <Image
        source={Ellipse}
        style={{
          position: "absolute",
          marginTop: "100%",
          resizeMode: "contain",
        }}
      />
      {/* Header section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChildQr", {
              token: token,
              IdChaild: item._id,
            })
          }
          style={{
            height: 70,
            width: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isBrother ? (
            <Ionicons name="qr-code-outline" size={50} color="#3B3A7A" />
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
        <View
          style={{
            // direction: "rtl",
            marginLeft: 40,
            marginTop: 10,
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* {item.gender == "male" ? (
            <Image source={male} style={{ height: 60, width: 60 }} />
          ) : (
            <Image source={female} style={{ height: 60, width: 60 }} />
          )} */}
          <Text style={{ textAlign: "left" }}>{item.name}</Text>
        </View>
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
          if (!isBrother) {
            navigation.navigate("VisaScreen", {
              token: token,
              IdChaild: item._id,
              item: item,
              childData: JSON.stringify(child),
            });
          }
        }}
        style={styles.counterCard}
      >
        {/* Render the Card component with specific props */}
        <Card url={icons2} total={item.currentAccount} cardHolder={item.name} />
      </TouchableOpacity>

      {/* Text for the savings account */}
      <Text style={styles.textCom}>الحساب الادخار</Text>

      {/* TouchableOpacity for navigating to SavingsScreen */}
      <TouchableOpacity
        onPress={() => {
          if (!isBrother) {
            navigation.navigate("SavingsScreen", {
              token: token,
              IdChaild: item._id,
              item: item,
              childData: JSON.stringify(child),
            });
          }
        }}
        style={styles.counterCard}
      >
        {/* Render the Card component with specific props */}
        <Card url={icons} total={item.savingAccount} cardHolder={item.name} />
      </TouchableOpacity>
      {isBrother == false && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            marginTop: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
            style={{
              height: 50,
              width: "50%",
              backgroundColor: "#3B3A7A",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>تحويل المصروف الشهري</Text>
            <Image source={transfer} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
            style={{
              height: 50,
              width: "50%",
              backgroundColor: "#3B3A7A",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#fff" }}>تحويل مبلغ</Text>
            <Image source={set} />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileChild; // Export the HomeScreen component
