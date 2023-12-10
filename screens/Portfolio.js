import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "../Component/Button";
import Ellipse from "../assets/Ellipse.png";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import { ContextGlobal } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
const API_URL = "http://192.168.1.8:3000/api";

const Portfolio = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Context.token;
  const user = Context.loggedInChild;
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${API_URL}/task/notCmopletaed?childId=${user._id}`
        );
        if (response.data && Array.isArray(response.data)) {
          setTasks(response.data);
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
      setReload((r) => !r);
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [reload]);

  const finalChild = chaild.filter((item) => item.parentId == user._id);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isChecked, setisChecked] = useState(false);

  console.log(selectedTaskIndex);
  const [TaskId, setTaskId] = useState(null);
  const [tasks, setTasks] = useState([
  ]);
  const [completedTasks, setCompletedTasks] = useState([
  ]);
  
  
  const handleCheckboxToggle = (TaskId) => {
    // const updatedTasks = tasks.map((item, i) =>
    //   i === index ? { ...item, ischecked: !item.ischecked } : item
    // );
    completeTask(TaskId);
    setTaskId(null);

    // You can use the updatedTasks array for any further processing or set it to state

    // Other existing logic for the modal and checkbox
  };

  const completeTask = async (taskId) => {
    const res = await axios.get(`${API_URL}/task/${taskId}`);
    setReload((r) => !r);
    await Context.refreshChild();
    console.log(res);
  };
  const toggleModal = (index) => {
    setSelectedTaskIndex(index);
    setModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   console.log(taskId);
  // }, [taskId]);
  // // console.log(tasks);
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
        <View style={{ marginVertical: 10 }}>
          {TaskId != null ? (
            <Button
              Title={"انهاء المهمة "}
              onPress={() => handleCheckboxToggle(TaskId)}
            />
          ) : (
            <View></View>
          )}
        </View>
        <View style={{ width: "100%", gap: 10 }}>
          {tasks.filter(e => new Date(e.time) <= Date.now() ).map((item, index) => (
            <View
              key={index} // Add a key for each item in the map
              style={{
                height: 80,
                width: "100%",
                backgroundColor:'#646363',
                alignItems: "center",
                borderRadius: 20,
                flexDirection: "row",

                paddingHorizontal: 30,

                justifyContent: "space-between",
              }}
            >
              
              {/* setTaskId(item._id) */}
              {/* handleCheckboxToggle(item._id) */}
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
        <View style={{ width: "100%", gap: 10 }}>
          {tasks.filter(e => new Date(e.time) > Date.now() ).map((item, index) => (
            <View
              key={index} // Add a key for each item in the map
              style={{
                height: 80,
                width: "100%",
                backgroundColor:
                  item.type == "بدني"
                    ? "rgba(96, 96, 96, 0.7)"
                    : "عقلي"
                    ? "#3B3A7A"
                    : "rgba(84, 141, 84, 0.8)",
                alignItems: "center",
                borderRadius: 20,
                flexDirection: "row",

                paddingHorizontal: 30,

                justifyContent: "space-between",
              }}
            >
              <CheckBox
                checked={item._id == TaskId}
                onPress={() => {
                  setTaskId(item._id);
                }}
              />
              {/* setTaskId(item._id) */}
              {/* handleCheckboxToggle(item._id) */}
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
                  fontWeight: "700",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                التفاصيل
              </Text>
              <View>
                <View
                  style={{
                    borderBottomColor: "#3B3A7A",
                    borderBottomWidth: 2,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#3B3A7A",
                      fontWeight: "500",
                    }}
                  >
                    اسم المهمة:{" "}
                    <Text style={{ color: "black" }}>
                      {tasks[selectedTaskIndex]?.name}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "#3B3A7A",
                    borderBottomWidth: 2,
                    padding: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                    تفاصيل المهمة :{" "}
                    <Text style={{ color: "black" }}>
                      {tasks[selectedTaskIndex]?.desc}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "#3B3A7A",
                    borderBottomWidth: 2,
                    padding: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                    الوقت النهائي :{" "}
                    <Text style={{ color: "black" }}>
                      {new Date(tasks[selectedTaskIndex]?.time).toLocaleString('ar-SA', {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "#3B3A7A",
                    borderBottomWidth: 2,
                    padding: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                    المبلغ المستحق :{" "}
                    <Text style={{ color: "black" }}>
                      {tasks[selectedTaskIndex]?.valueTask}
                    </Text>
                  </Text>
                </View>
              </View>
              <Button Title={"الغاء"} onPress={() => toggleModal(null)} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Portfolio;
