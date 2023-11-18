import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Input } from "../../Component/TextInput";
import female from "../../assets/female.png";
import SetPrices from "../../Component/setPrices";
import { ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { Button } from "../../Component/Button";
export default function AddTask() {
  // const PROP = [
  //   {
  //     key: "female",
  //     text: "عالية",
  //   },
  //   {
  //     key: "male",
  //     text: "متوسط",
  //   },
  //   {
  //     key: "male",
  //     text: "منخفضة",
  //   },
  // ];
  const options = [
    { label: "بدنية", value: 1 },
    { label: "عقلية", value: 2 },
    { label: "تطوعية", value: 3 },
  ];
  const [selectedValue, setSelectedValue] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [submited, setsubmited] = useState(false);
  const [newTask, setNewTask] = useState({
    taskType: null,
    taskName: "",
    mony: "",
    date: "",
  });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setsubmited(false);
  };
  const handleCheckboxChange = (value) => {
    setSelectedValue(value === selectedValue ? null : value);
    setNewTask({ ...newTask, taskType: selectedValue });
  };
  const handelSubmit = () => {
    setsubmited(true);
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      {/* <SetPrices visible={true} /> */}
      <Text
        style={{
          textAlign: "right",
          color: "#3B3A7A",
          fontSize: 22,
        }}
      >
        تصنيف المهمة
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          marginTop: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          {options.map((option) => (
            <CheckBox
              key={option.value}
              title={option.label}
              checked={option.value === selectedValue}
              onPress={() => handleCheckboxChange(option.value)}
            />
          ))}
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          {options.map((option) => (
            <CheckBox
              key={option.value}
              title={option.label}
              checked={option.value === selectedValue}
              onPress={() => handleCheckboxChange(option.value)}
            />
          ))}
        </View>
      </View>
      <View style={{ marginTop: 20, marginTop: 20 }}>
        <Text style={{ textAlign: "right", color: "#3B3A7A", fontSize: 22 }}>
          اسم المهمة{" "}
        </Text>
        <Input
          onChangeText={(e) => setNewTask({ ...newTask, taskName: e })}
          placeholder={"اسم المهمة"}
          backColor={"#fff"}
        />
      </View>

      {/*  */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "right", color: "#3B3A7A", fontSize: 22 }}>
          المبلغ المستحق
        </Text>
        <Input
          onChangeText={(e) => setNewTask({ ...newTask, mony: e })}
          placeholder={"المبلغ المستحق"}
          backColor={"#fff"}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "right", color: "#3B3A7A", fontSize: 22 }}>
          اخر موعد لانجاز المهمة{" "}
        </Text>
        <Input
          onChangeText={(e) => setNewTask({ ...newTask, date: e })}
          placeholder={"اخر موعد لانجاز المهمة"}
          backColor={"#fff"}
        />
      </View>

      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#3B3A7A",
          padding: 15,
          borderRadius: 20,
          marginTop: 20,
        }}
        onPress={toggleModal}
      >
        <Text style={{ color: "#fff" }}>حفظ المهمة</Text>
      </TouchableOpacity>
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
                elevation: 10,
              }}
            >
              {submited == false && (
                <View>
                  <Text
                    style={{
                      color: "#3B3A7A",
                      fontSize: 20,
                      marginVertical: 20,
                      marginBottom: 50,
                      textAlign: "center",
                    }}
                  >
                    هل انت متأكد من طلب اضافة مهمة ؟
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
                      onPress={() => handelSubmit()}
                      style={{
                        backgroundColor: "green",
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 15 }}>
                        تأكيد
                      </Text>
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
                      <Text style={{ color: "white", fontSize: 15 }}>
                        اغلاق
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {submited && (
                <View>
                  <Text
                    style={{
                      color: "#3B3A7A",
                      fontSize: 20,
                      marginVertical: 20,
                      marginBottom: 50,
                      textAlign: "center",
                    }}
                  >
                    تم الاضافة بنجاح{" "}
                  </Text>
                  <Button Title={"اغلاق"} onPress={() => toggleModal(null)} />
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
