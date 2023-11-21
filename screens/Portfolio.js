import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "../Component/Button";
import Ellipse from "../assets/Ellipse.png";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import { ContextGlobal } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
const API_URL = "http://192.168.43.79:3000/api";

const Portfolio = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Context.token;
  const user = Context.loggedInChild;
  const [reload, setReload] = useState(false);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         `${API_URL}/task/notCmopletaed?child=${user._id}`
  //       );
  //       if (response.data && Array.isArray(response.data)) {
  //         setTasks(response.data);
  //       } else {
  //         console.error("Invalid data format");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [reload]);

  const finalChild = chaild.filter((item) => item.parentId == user._id);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [taskId, settaskId] = useState("");
  console.log(selectedTaskIndex);
  const [tasks, setTasks] = useState([
    {
      type: "بدني",
      name: "ممارسة الرياضة",
      time: "12/12/2026",
      money: "24",
      ischecked: false,
      description: "بلا بلا بلا بلا ",
    },
    {
      type: "عقلي ",
      name: "ممارسة الرياضة aaaa",
      time: "12/12/2026",
      money: "24",
      ischecked: false,
      description: "بلا بلا بلا بلا ",
    },
    {
      type: "بدني",
      name: "ممارسة الرياضة",
      time: "12/12/2026",
      money: "24",
      ischecked: false,
      description: "بلا بلا بلا بلا ",
    },
    {
      type: "عقلي",
      name: "ممارسة الرياضة",
      time: "12/12/2026",
      money: "24",
      ischecked: false,
      description: "بلا بلا بلا بلا ",
    },
    {
      type: "بدني",
      name: "ممارسة الرياضة",
      time: "12/12/2026",
      money: "24",
      ischecked: false,
      description: "بلا بلا بلا بلا ",
    },
  ]);
  const handleCheckboxToggle = (TaskId) => {
    // const updatedTasks = tasks.map((item, i) =>
    //   i === index ? { ...item, ischecked: !item.ischecked } : item
    // );
    completeTask(TaskId);

    // You can use the updatedTasks array for any further processing or set it to state

    // Other existing logic for the modal and checkbox
  };

  const completeTask = async (taskId) => {
    const res = await axios.get(`${API_URL}/task/${taskId}`);
    setReload((r) => !r);
    console.log(res);
  };
  const toggleModal = (index) => {
    setSelectedTaskIndex(index);
    setModalVisible(!isModalVisible);
  };

  // console.log(tasks);
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

      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddTask");
          }}
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",

            gap: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "#3B3A7A" }}>اضافة مهمة</Text>
          <Ionicons name="add-circle-outline" size={35} color={"#2C2B66D6"} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 3, padding: 10 }}>
        <View style={{ width: "100%", gap: 10 }}>
          {tasks.map((item, index) => (
            <View
              key={index} // Add a key for each item in the map
              style={{
                height: 80,
                width: "100%",
                backgroundColor:
                  item.type == "بدني" ? "green" : "red" /*"#3B3A7A"*/,
                alignItems: "center",
                borderRadius: 20,
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                checked={item.status}
                onPress={() => handleCheckboxToggle(item._id)}
              />
              {/* <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 5,
                  padding: 7,
                  borderRadius: 10,
                }}
                onPress={() => handleCheckboxToggle(item._id)}
              >
                <Text style={{ color: "#3B3A7A", fontSize: 20 }}>اكتملت</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  width: "80%",
                  flexDirection: "row",
                  height: 80,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => toggleModal(index)}
              >
                <View>
                  <Text style={{ color: "#fff" }}>{item.valueTask} SAR</Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{ fontSize: 20, color: "#fff", textAlign: "right" }}
                  >
                    {item.type} {console.log(item.type)}
                  </Text>
                  <Text
                    style={{ fontSize: 20, color: "#fff", textAlign: "right" }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      textAlign: "right",
                      color: "red",
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
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
                elevation: 5,
              }}
            >
              <Text
                style={{
                  color: "#3B3A7A",
                  fontSize: 20,
                  marginVertical: 10,
                }}
              >
                التفاصيل
              </Text>
              <View>
                <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                  اسم المهمة: {tasks[selectedTaskIndex]?.name}
                </Text>
                <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                  تفاصيل المهمة : {tasks[selectedTaskIndex]?.desc}
                </Text>
                <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                  الوقت النهائي : {Date(tasks[selectedTaskIndex]?.time)}
                </Text>
                <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                  المبلغ المستحق : {tasks[selectedTaskIndex]?.valueTask}
                </Text>
              </View>
              <Button Title={"اغلاق"} onPress={() => toggleModal(null)} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Portfolio;
