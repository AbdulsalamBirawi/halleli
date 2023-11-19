import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
} from "react-native";
import { Button } from "../Component/Button";
import axios from "axios";
import { ContextGlobal } from "../Store";
import { Ionicons } from "@expo/vector-icons";
const API_URL = "http://192.168.1.66:3000/api";
import { Input } from "../Component/TextInput";
const Goal = ({ navigation }) => {
  const Context = useContext(ContextGlobal);
  const [open, setOpen] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteGoal, setdeleteGoal] = useState(false);
  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [reload, setReload] = useState(false);
  const user = Context.loggedInChild;
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/goal`);
        if (response.data && Array.isArray(response.data)) {
          const options = [
            { label: "منخفضة", value: 1 },
            { label: "متوسطة", value: 2 },
            { label: "عالية", value: 3 },
          ];
          setGoals(response.data.map(e => ({
            ...e,
            typeGoal: options.find(x => x.value === e.typeGoal)?.value

          })));
        } else {
          console.error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    DeviceEventEmitter.addListener('goal->reload', ()=> {
      setReload(e => !e);
    });

    fetchData();
    return () => {
      DeviceEventEmitter.removeAllListeners();
    }
  }, [reload]);
  const token = Context.token;
  const finalChild = chaild.filter((item) => item.parentId == user._id);

  const handelSubmit = () => {
    setGoal(true);
  };
  const handelDeletGoal = async () => {
    await axios.delete(`${API_URL}/goal/${deleteGoal}`);
    setReload(e => !e);
    setdeleteGoal(false);
    
  };

  const handelClose = () => {
    setModalVisible(false);
    setGoal(false);
  };

  const handelPress = () => {
    setGoal(false);
    setModalVisible(true);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        direction: "ltr",
      }}
    >
      <View style={{ flex: 3, padding: 10, gap: 10 }}>
        {goals.map((item, index) => (
          <View
          key={item._id}
            style={{
              flexDirection: "row",
              height: 100,
              width: "100%",
              backgroundColor: "#3B3A7A",
              borderRadius: 15,
              flexDirection: "row",
              direction: "rtl",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity onPress={() => setdeleteGoal(item._id)}>
              <Ionicons size={25} color={"white"} name="close-circle" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handelPress();
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>{item.valueGoal}</Text>
              <View>
                <Text style={{ color: "#fff", fontSize: 20 }}>{item.name}</Text>
                <Text style={{ color: "#fff", fontSize: 20 }}>
                {item.typeGoal}

                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <Button
          Title={" أضافة الهدف جديد "}
          onPress={() => {
            navigation.navigate("AddGoal");
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => toggleModal(null)}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 200,
            }}
          >
            {goal == false && (
              <View style={styles.centeredView}>
                <Text
                  style={{
                    color: "#3B3A7A",
                    fontSize: 20,
                    textAlign: "right",
                    width: "100%",
                    marginBottom: 20,
                  }}
                >
                  اختر الحساب
                </Text>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#3B3A7A",
                      paddingHorizontal: 30,
                      borderRadius: 10,
                      display: "block",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>حساب الادخار</Text>
                    <Text style={{ color: "white" }}>200</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#5A5859",
                      paddingHorizontal: 30,
                      borderRadius: 10,
                      display: "block",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>حساب الجاري</Text>
                    <Text style={{ color: "white" }}>200</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    color: "#3B3A7A",
                    fontSize: 20,
                    textAlign: "right",
                    width: "100%",
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                >
                  اختر المبلغ المراد اضافته
                </Text>
                <Input placeholder={"المبلغ"}></Input>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handelClose()}
                    style={{
                      backgroundColor: "red",
                      padding: 10,
                      paddingHorizontal: 30,
                      borderRadius: 10,
                      display: "block",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ color: "white", marginTop: 2, fontSize: 15 }}
                    >
                      اغلاق
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handelSubmit()}
                    style={{
                      backgroundColor: "green",
                      padding: 10,
                      paddingHorizontal: 30,
                      borderRadius: 10,
                      display: "block",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ color: "white", marginTop: 2, fontSize: 15 }}
                    >
                      تاكيد
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {goal && (
              <View style={{ backgroundColor: "white", alignItems: "center" }}>
                <Text
                  style={{ color: "#3B3A7A", marginVertical: 60, fontSize: 40 }}
                >
                  تمت الاضافة بنجاح
                </Text>
                <Button Title={"استمرار"} onPress={() => handelClose()} />
              </View>
            )}
          </View>
        </Modal>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!deleteGoal}
          onRequestClose={() => toggleModal(null)}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 200,
            }}
          >
            <View style={{ backgroundColor: "white", alignItems: "center" }}>
              <Text
                style={{ color: "#3B3A7A", marginVertical: 60, fontSize: 30 }}
              >
                هل انت متأكد من حذف المهمة ؟
              </Text>
              <View
                style={{
                  display: "flex",
                  gap: 20,
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setdeleteGoal(false)}
                  style={{
                    backgroundColor: "red",
                    padding: 10,

                    paddingHorizontal: 30,
                    borderRadius: 10,
                    display: "block",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", marginTop: 2, fontSize: 15 }}>
                    اغلاق
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handelDeletGoal()}
                  style={{
                    backgroundColor: "#3B3A7A",
                    padding: 10,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    display: "block",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", marginTop: 2, fontSize: 15 }}>
                    حذف المهمة
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    top: 20,
    marginTop: 22,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default Goal;