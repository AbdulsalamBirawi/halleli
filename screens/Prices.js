import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Button } from "../Component/Button";
import Ellipse from "../assets/Ellipse.png";
import Loader from "../Component/Loader";
import axios from "axios";
import { ContextGlobal } from "../Store";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import male from "../assets/male.png";
import female from "../assets/female.png";
import family from "../assets/family.png";
const API_URL = "http://192.168.1.66:3000/api";

import Transfer from "../Component/Transfer";
import PropTransfer from "../Component/PropTransfer";
const Prices = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Context.token;
  const user = Context.loggedInChild;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/child`);
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.filter(e => {
            console.log({pxy :e.parentId, pyx: user.parentId});
            return e.parentId === user.parentId && e._id !== user._id;
          })
          setChaild(data);
        } else {
          console.error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const finalChild = chaild.filter((item) => item.parentId == user._id);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        direction: "ltr",
      }}
    >
      <PropTransfer visible={false} />
      <Image
        source={Ellipse}
        style={{
          position: "absolute",
          marginTop: "100%",
          resizeMode: "contain",
        }}
      />
      {/* <View
        style={{
          flex: 1,
          marginTop: 20,
          marginRight: 30,
        }}
      >
        <Text style={{ textAlign: "right", fontSize: 35, color: "#3B3A7A" }}>
          مرحبا محمد ..
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateChild");
          }}
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "#3B3A7A" }}>اضافة المزيد</Text>
          <Ionicons name="add-circle-outline" size={35} color={"#2C2B66D6"} />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <Ionicons
            name="ios-settings-outline"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("PerentLogout");
            }}
          />
          <Ionicons
            name="notifications-outline"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("AddChild");
            }}
          />
        </View>
        <Text style={{ textAlign: "right", fontSize: 30, padding: 10 }}>
          أخوتي
        </Text>
      </View>
      {/* Horizontal lines */}
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            height: 1,
            width: "100%",
            marginTop: 20,
            width: "30%",
          }}
        />
        <View
          style={{
            height: 1,
            width: "100%",
            width: "70%",
            backgroundColor: "black",
            marginTop: 20,
          }}
        />
      </View>

      <View style={{ flex: 3, padding: 10 }}>
        <View style={{ width: "100%", gap: 10 }}>
          {chaild.map((item, index) => (
            // <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate("ChildQr", {
            //       token: token,
            //       IdChaild: item._id,
            //     })
            //   }
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileChild", {
                  item: item,
                })
              }
              key={index} // Add a key for each item in the map
              style={{
                height: 80,
                width: "100%",
                backgroundColor: "#3B3A7A",
                alignItems: "center",
                borderRadius: 20,
                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "space-between",
                direction: "rtl",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.gender == "male" ? (
                  <Image source={male} style={{ height: 70, width: 70 }} />
                ) : (
                  <Image source={female} style={{ height: 70, width: 70 }} />
                )}
                <Text style={{ fontSize: 22, color: "#fff" }}>{item.name}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, color: "#fff" }}>{item.currentAccount}</Text>
                <Text style={{ fontSize: 20, color: "#fff" }}>{item.savingAccount}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Prices;
