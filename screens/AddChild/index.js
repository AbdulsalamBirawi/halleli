import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
} from "react-native";
import { Button } from "../../Component/Button";
import Ellipse from "../../assets/Ellipse.png";
import Loader from "../../Component/Loader";
import axios from "axios";
import { ContextGlobal } from "../../Store";
import { Ionicons } from "@expo/vector-icons";
import male from "../../assets/male.png";
import female from "../../assets/female.png";

const API_URL = "http://192.168.1.66:3000/api";

const AddChild = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBrother, setisBrother] = useState(false);
  const token = Context.token;
  const user = Context.user;
  const setGlobalChild = Context.setChaild;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/child`);
        if (response.data && Array.isArray(response.data)) {
          const finalChild = response.data.filter(
            (item) => item.parentId == user._id
          );
          setChaild(finalChild);

          setGlobalChild(finalChild);
          console.log(finalChild, "final child");
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
    const interval = setInterval(() => {
        fetchData();
    }, 10000);
    DeviceEventEmitter.addListener("creat->child", (e) => {
      fetchData();
    });
    return () => {
      DeviceEventEmitter.removeAllListeners();
      clearInterval(interval);
    };
  }, []);
  console.log(chaild, "childs");
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        direction: "ltr",
      }}
    >
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
        </View>
        <Text style={{ textAlign: "right", fontSize: 30, padding: 10 }}>
          اهلا بك ... ! {user.name}
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
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginRight: 30,
        }}
      >
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
          <Text style={{ fontSize: 20, color: "#3B3A7A" }}>اضافة طفل جديد</Text>
          <Ionicons name="add-circle-outline" size={35} color={"#2C2B66D6"} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 3, padding: 10 }}>
        <View style={{ width: "100%", gap: 10 }}>
          {chaild.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setisBrother(false);
                navigation.navigate("ProfileChild", {
                  token: token,
                  IdChaild: item._id,
                  item: item,
                  isBrother: isBrother,
                });
              }}
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
              }}
            >
              {item.gender == "male" ? (
                <Image source={male} style={{ height: 70, width: 70 }} />
              ) : (
                <Image source={female} style={{ height: 70, width: 70 }} />
              )}
              <View>
                <Text style={{ fontSize: 20, color: "#fff" }}>
                  {item?.name}
                </Text>
                <Text style={{ fontSize: 20, color: "#fff" }}>
                  {item.currentAccount} SR
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddChild;
