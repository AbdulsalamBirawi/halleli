import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
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
import PropTransfer from "../Component/PropTransfer";

const API_URL = "http://192.168.43.79:3000/api";
const Prices = ({ navigation }) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setisLogout(false);
  };
  const handelLogout = () => {
    setisLogout(true);
    navigation.navigate("ChildLogin");
  };

  const Context = useContext(ContextGlobal);

  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBrother, setisBrother] = useState(false);
  const [isLogout, setisLogout] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const token = Context.token;
  const user = Context.loggedInChild;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/child`);
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.filter((e) => {
            console.log({ pxy: e.parentId, pyx: user.parentId });
            return e.parentId === user.parentId && e._id !== user._id;
          });
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
            name="log-out-outline"
            size={24}
            color="black"
            onPress={() => {
              setModalVisible(true);
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
              onPress={() => {
                setisBrother(true);
                navigation.navigate("ProfileChild", {
                  item: item,
                  isBrother: true,
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
                padding: 20,
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
                <Text style={{ fontSize: 20, color: "#fff" }}>
                  {item.currentAccount}
                </Text>
                <Text style={{ fontSize: 20, color: "#fff" }}>
                  {item.savingAccount}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
                  <Text style={{ color: "white", fontSize: 15 }}>اغلاق</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Prices;
