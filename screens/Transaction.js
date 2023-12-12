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
const API_URL = "http://192.168.43.79:3000/api";

const Transaction = ({ navigation }) => {
  const Context = useContext(ContextGlobal);
  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInternaltransSucsess, setisInternaltransSucsess] = useState(false);
  const [toCurrentAccountValue, settoCurrentAccountValue] = useState(null);
  const [selectedAccountType, setSelectedAccountType] =
    useState("savingAccount");
  const [selectedTransferAccount, setSelectedTransferAccount] =
    useState("currentAccount");
  const [relode, setrelode] = useState(false);
  const token = Context.token;
  const user = Context.loggedInChild;

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

      <Text
        style={{
          color: "#3B3A7A",
          fontSize: 20,
          marginVertical: 10,
          fontWeight: "600",
          textAlign: "right",
        }}
      >
        التحويل بين الحسابات
      </Text>

      <View>
        <Text style={{ textAlign: "right" }}>اختر نوع الحساب:</Text>

        <Picker
          selectedValue={selectedAccountType}
          onValueChange={(itemValue) => setSelectedAccountType(itemValue)}
        >
          <Picker.Item label="الحساب الادخاري" value="savingAccount" />
          <Picker.Item label="الحساب الجاري" value="currentAccount" />
        </Picker>

        <Text style={{ textAlign: "right" }}>
          اختر حساب المراد التحويل اليه:
        </Text>

        <Picker
          selectedValue={selectedTransferAccount}
          onValueChange={(itemValue) => setSelectedTransferAccount(itemValue)}
        >
          <Picker.Item label="الحساب الادخاري" value="savingAccount" />
          <Picker.Item label="الحساب الجاري" value="currentAccount" />
        </Picker>
      </View>
      <View>
        <Text style={{ textAlign: "right" }}>المبلغ</Text>
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
          onPress={() => {
            navigation.navigate("Home");
          }}
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
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Transaction;
