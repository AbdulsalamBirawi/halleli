import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { Button } from "../Component/Button";
import Ellipse from "../assets/Ellipse.png";
import Loader from "../Component/Loader";
import axios from "axios";
import { ContextGlobal } from "../Store";
import male from "../assets/male.png";
import female from "../assets/female.png";
import { Input } from "../Component/TextInput";
const API_URL = "http://192.168.112.211:3000/api";

const Transaction = ({ navigation }) => {
  const Context = useContext(ContextGlobal);
  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const [BroId, setBroId] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [monyToBrother, setmonyToBrother] = useState(0);
  const [isTrans, setisTrans] = useState(false);
  const [toCurrentAccount, settoCurrentAccount] = useState(false);
  const [toCurrentAccountValue, settoCurrentAccountValue] = useState(null);
  const [toSavingAccountValue, settoSavingAccountValue] = useState(null);
  const token = Context.token;
  const user = Context.loggedInChild;
  const toggleModal = (BroId) => {
    setModalVisible(!isModalVisible);
    setBroId(BroId);
    setisTrans(false);
  };
  const handelTrans = () => {
    transntionToBrother(BroId);
    setisTrans(true);
  };
  const transntionToBrother = async (broId) => {
    const res = await axios.post(`${API_URL}/transaction`, {
      sender: user._id,
      receiver: broId,
      amount: monyToBrother,
    });

    console.log(res);
  };
  const transferInternal = async () => {
    const res = await axios.post(`${API_URL}/transaction/${user._id}`, {
      from: toCurrentAccount ? "savingAccount" : "currentAccount",
      to: toCurrentAccount ? "currentAccount" : "savingAccount",
      amount: toCurrentAccount ? toCurrentAccountValue : toSavingAccountValue,
    });
    console.log(res);
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
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}></View>
        <Text style={{ textAlign: "right", fontSize: 30, padding: 10 }}>
          اهلا بك ... {user.name}!
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
      <View style={{ flex: 3, padding: 10, marginVertical: 30 }}>
        <View style={{ width: "100%", gap: 10 }}>
          {chaild.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                toggleModal(item._id);
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
                <Text style={{ fontSize: 20, color: "#fff" }}>{item.name}</Text>
                <Text style={{ fontSize: 20, color: "#fff" }}>100.00 SR</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Button
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
          )}
          <Button Title={"تحويل"} onPress={() => transferInternal()} />
        </View>
      </View>

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
          onRequestClose={() => toggleModal()}
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
                  onPress={() => setModalVisible(false)}
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
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Transaction;
