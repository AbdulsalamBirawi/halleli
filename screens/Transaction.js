import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  DeviceEventEmitter,
} from "react-native";
import { Button } from "../Component/Button";
import Ellipse from "../assets/Ellipse.png";
import Loader from "../Component/Loader";
import axios from "axios";
import { ContextGlobal } from "../Store";
import male from "../assets/male.png";
import { Picker } from "@react-native-picker/picker";
import female from "../assets/female.png";
import { Input } from "../Component/TextInput";
import { ScrollView } from "react-native";
const API_URL = "http://192.168.1.66:3000/api";

const Transaction = ({ navigation }) => {
  const Context = useContext(ContextGlobal);
  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const [BroId, setBroId] = useState("");
  const [isModalVisibleTransfer, setModalVisibleTransfer] = useState(false);
  const [monyToBrother, setmonyToBrother] = useState(0);
  const [isTrans, setisTrans] = useState(false);
  const [isInternaltransSucsess, setisInternaltransSucsess] = useState(false);
  const [toCurrentAccount, settoCurrentAccount] = useState(false);
  const [toCurrentAccountValue, settoCurrentAccountValue] = useState(null);
  const [reload, setReload] = useState(false);
  const [internalTransferModel, setinternalTransferModel] = useState(false);
  const [selectedAccountType, setSelectedAccountType] =
    useState("savingAccount");
  const [selectedTransferAccount, setSelectedTransferAccount] =
    useState("currentAccount");
  const [relode, setrelode] = useState(false);

  const token = Context.token;
  const user = Context.loggedInChild;
  const toggleModalTransfer = (BroId) => {
    setModalVisibleTransfer(!isModalVisibleTransfer);
    setBroId(BroId);
    setisTrans(false);
  };
  const internalToggleModel = () => {
    // setinternalTransferModel(!internalTransferModel);
    setisInternaltransSucsess(false);
  };
  const handelinternal = () => {
    transferInternal();
    setisInternaltransSucsess(true);
  };
  const transferInternal = async () => {
    const res = await axios.post(`${API_URL}/transaction/${user._id}`, {
      from: selectedAccountType,
      to: selectedTransferAccount,
      amount: toCurrentAccountValue,
    });
    DeviceEventEmitter.emit("transfer->internal", { reload: true });
    setisInternaltransSucsess(true);
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
    // DeviceEventEmitter.addListener("goal->reload", () => {
    //   setReload((e) => !e);
    // });

    fetchData();
    // return () => {
    //   DeviceEventEmitter.removeAllListeners();
    // };
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}></View>
        <Text style={{ textAlign: "right", fontSize: 30, padding: 10 }}></Text>
      </View> */}
      {/* Horizontal lines */}
      {/* <View style={{ flexDirection: "row" }}>
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
      </View> */}

      {/* <ScrollView style={{ width: "100%", gap: 5 }}>
        {chaild.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              toggleModalTransfer(item._id);
            }}
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
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "#fff" }}
              >
                {item.currentAccount}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      <Text
        style={{
          color: "#3B3A7A",
          fontSize: 20,
          marginVertical: 10,
          fontWeight: "600",
        }}
      >
        التحويل بين الحسابات
      </Text>

      <View>
        <Text>اختر نوع الحساب:</Text>

        <Picker
          selectedValue={selectedAccountType}
          onValueChange={(itemValue) => setSelectedAccountType(itemValue)}
        >
          <Picker.Item label="حساب الادخار" value="savingAccount" />
          <Picker.Item label="حساب الجاري" value="currentAccount" />
        </Picker>

        <Text>اختر حساب المراد التحويل اليه:</Text>

        <Picker
          selectedValue={selectedTransferAccount}
          onValueChange={(itemValue) => setSelectedTransferAccount(itemValue)}
        >
          <Picker.Item label="حساب الادخار" value="savingAccount" />
          <Picker.Item label="حساب الجاري" value="currentAccount" />
        </Picker>
      </View>
      <View>
        <Text>المبلغ</Text>
        <Input onChangeText={(e) => settoCurrentAccountValue(e)} />
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
          onPress={() => handelinternal()}
          style={{
            backgroundColor: "#3B3A7A",
            paddingHorizontal: 40,
            paddingVertical: 10,
            borderRadius: 10,
            marginHorizontal: 30,
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>ارسال</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => internalToggleModel(null)}
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

      {/* <View
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
      </View> */}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={internalTransferModel}
        onRequestClose={() => setinternalTransferModel(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button Title={"تحويل"} />
          <Button Title={"إلغاء"} onPress={setinternalTransferModel(false)} />
        </View>
      </Modal> */}

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
          visible={isInternaltransSucsess}
          onRequestClose={() => internalToggleModel()}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "white",
            }}
          >
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
              <Button onPress={() => internalToggleModel()} Title={"استمرار"} />
            </View>

            {/* {isInternaltransSucsess == false && (
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
                  التحويل بين الحسابات
                </Text>

                <View>
                  <Text>اختر نوع الحساب:</Text>

                  <Picker
                    selectedValue={selectedAccountType}
                    onValueChange={(itemValue) =>
                      setSelectedAccountType(itemValue)
                    }
                  >
                    <Picker.Item label="حساب الادخار" value="savingAccount" />
                    <Picker.Item label="حساب الجاري" value="currentAccount" />
                  </Picker>

                  <Text>اختر حساب النقل:</Text>

                  <Picker
                    selectedValue={selectedTransferAccount}
                    onValueChange={(itemValue) =>
                      setSelectedTransferAccount(itemValue)
                    }
                  >
                    <Picker.Item label="حساب الادخار" value="savingAccount" />
                    <Picker.Item label="حساب الجاري" value="currentAccount" />
                  </Picker>
                </View>
                <View>
                  <Text>المبلغ</Text>
                  <Input onChangeText={(e) => settoCurrentAccountValue(e)} />
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
                    onPress={() => handelinternal()}
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
                    onPress={() => internalToggleModel(null)}
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
            )} */}
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Transaction;
