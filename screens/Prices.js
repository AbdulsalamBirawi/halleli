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
import { ScrollView } from "react-native";
import { Input } from "../Component/TextInput";

const API_URL = "http://192.168.1.11:3000/api";
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

  const [BroId, setBroId] = useState("");
  const [isModalVisibleTransfer, setModalVisibleTransfer] = useState(false);
  const [isTrans, setisTrans] = useState(false);
  const [relode, setrelode] = useState(false);
  const [monyToBrother, setmonyToBrother] = useState(0);
  const toggleModalTransfer = (BroId) => {
    setModalVisibleTransfer(!isModalVisibleTransfer);
    setBroId(BroId);
    setisTrans(false);
  };

  const handelTrans = () => {
    transntionToBrother(BroId);
  };

  const transntionToBrother = async (broId) => {
    const res = await axios.post(`${API_URL}/transaction`, {
      sender: user._id,
      receiver: broId,
      amount: monyToBrother,
    });
    setrelode((r) => !r);
    Context.refreshChild();

    console.log(res);
    setisTrans(true);
  };

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
  }, [relode]);

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

      <ScrollView style={{ width: "100%", gap: 5 }}>
        {chaild.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileChild", {
                item: item,
                isBrother: true,
              });
            }}
            // toggleModalTransfer(item._id);
            key={index} // Add a key for each item in the map
            style={{
              height: 80,
              width: "100%",
              marginVertical: 10,
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
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "#fff" }}
              >
                {item.name}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  margin: 5,
                  borderRadius: 10,
                }}
                onPress={() => toggleModalTransfer(item._id)}
              >
                <Text style={{ color: "#3B3A7A" }}>ارسال حوالة</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        {/* <Button
            onPress={() => settoCurrentAccount(false)}
            Title={"التحويل الى حساب الادخار"}
          />
          <Button
            onPress={() => settoCurrentAccount(true)}
            Title={"التحويل الى حساب الجاري"}
          />
          {toCurrentAccount ? (
            <View>
              <Text>التحويل الى الحساب الجاري </Text>
              <Input onChangeText={(e) => settoCurrentAccountValue(e)} />
            </View>
          ) : (
            <View>
              <Text>التحويل الى الحساب الادخار </Text>
              <Input onChangeText={(e) => settoSavingAccountValue(e)} />
            </View>
          )} */}
      </ScrollView>

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
          visible={isModalVisibleTransfer}
          onRequestClose={() => toggleModalTransfer()}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "white",
            }}
          >
            {isTrans && (
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 20,
                    marginVertical: 20,
                  }}
                >
                  تم التحويل بنجاح
                </Text>
                <Button
                  onPress={() => setModalVisibleTransfer(false)}
                  Title={"استمرار"}
                />
              </View>
            )}
            {isTrans == false && (
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    color: "#3B3A7A",
                    fontSize: 20,
                    marginVertical: 10,
                    fontWeight: "600",
                  }}
                >
                  مبلغ التحويل
                </Text>
                <View>
                  <Input
                    onChangeText={(e) => setmonyToBrother(e)}
                    placeholder={"المبلغ التحويل"}
                    backColor={"#fff"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    gap: 20,
                    marginVertical: 20,
                    marginLeft: 35,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handelTrans()}
                    style={{
                      backgroundColor: "#3B3A7A",
                      paddingHorizontal: 40,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 15 }}>ارسال</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleModalTransfer(null)}
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
            )}
          </View>
        </Modal>
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
