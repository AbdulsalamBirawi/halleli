import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";

import React, { useContext, useState } from "react";
import { Input } from "../../Component/TextInput";
import female from "../../assets/female.png";
import SetPrices from "../../Component/setPrices";
import { ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { Button } from "../../Component/Button";
import { ContextGlobal } from "../../Store";
import { useNavigation } from "@react-navigation/native";
import { DeviceEventEmitter } from "react-native";

import axios from "axios";
export default function AddTask({ setReload }) {
  const navigation = useNavigation();

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
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [submited, setsubmited] = useState(false);
  const [newTask, setNewTask] = useState({
    taskType: null,
    taskName: "",
    mony: "",
    date: new Date(),
  });
  const context = useContext(ContextGlobal);
  const isChild = !context.isParent;
  const childrens = context.chaild;
  console.log(childrens);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setsubmited(false);
  };
  const handleCheckboxChange = (value) => {
    setSelectedValue(value === selectedValue ? null : value);
    setNewTask({ ...newTask, taskType: selectedValue });
  };
  const currentDate = new Date();

  const handleDateChange = (e, date) => {
    setShowDatePicker(false);
    console.log({ date });
    if (date !== undefined) {
      setNewTask({ ...newTask, date: date });
    }
  };
  const handelSubmit = async () => {
    if (isChild) {
      const data = {
        desc: newTask.desc,
        typeTask: selectedValue,
        name: newTask.taskName,
        time: newTask.date,
        valueTask: newTask.mony,
        childId: context.loggedInChild._id,
      };
      await axios.post("http://192.168.1.66:3000/api/requesttask", data);
      DeviceEventEmitter.emit("tasks->reload", { reload: true });
      navigation.goBack();
      setsubmited(true);
      return;
    }
    const data = {
      desc: newTask.desc,
      typeTask: selectedValue,
      name: newTask.taskName,
      time: newTask.date,
      valueTask: newTask.mony,
      childId: selectedChild,
    };
    await axios.post("http://192.168.1.66:3000/api/task", data, {
      headers: {
        Authorization: "Bearer " + context.token,
      },
    });
    navigation.goBack();
    DeviceEventEmitter.emit("tasks->reload", { reload: true });
    setsubmited(true);
  };
  console.log(childrens);
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
        {/* <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          {options.map((option) => (
            <CheckBox
              key={option.label}
              title={option.label}
              checked={option.value === selectedValue}
              onPress={() => handleCheckboxChange(option.value)}
            />
          ))}
        </View> */}

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
          error={newTask.taskName ? false : <Text>the name is empty</Text>}
        />
      </View>
      <View style={{ marginTop: 20, marginTop: 20 }}>
        <Text style={{ textAlign: "right", color: "#3B3A7A", fontSize: 22 }}>
          وصف المهمة
        </Text>
        <Input
          onChangeText={(e) => setNewTask({ ...newTask, desc: e })}
          placeholder={"وصف"}
          backColor={"#fff"}
          error={newTask.desc ? false : <Text>the description is empty</Text>}
        />
      </View>

      {/*  */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "right", color: "#3B3A7A", fontSize: 22 }}>
          المبلغ المستحق
        </Text>
        <Input
          keyboardType="phone-pad"
          onChangeText={(e) => setNewTask({ ...newTask, mony: e })}
          placeholder={"المبلغ المستحق"}
          backColor={"#fff"}
          error={newTask.mony ? false : <Text>the value is empty</Text>}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "right", color: "#3B3A7A", fontSize: 22 }}>
          اخر موعد لانجاز المهمة{" "}
        </Text>
        <Input
          value={newTask.date.toISOString().split("T")[0]}
          placeholder="اختر تاريخ"
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
          onFocus={() => setShowDatePicker(true)}
          error={newTask.date ? false : <Text>the date is empty</Text>}
        />
        {showDatePicker && (
          <DatePicker
            minimumDate={new Date()}
            value={newTask.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      {!isChild && (
        <View>
          <Text style={{ textAlign: "right", color: "#3B3A7A", fontSize: 22 }}>
            اختر الطفل
          </Text>
          {childrens.map((option) => (
            <CheckBox
              key={option._id}
              title={option?.name}
              checked={option._id === selectedChild}
              onPress={() => {
                setSelectedChild(
                  option._id === selectedChild ? null : option._id
                );
              }}
            />
          ))}
        </View>
      )}
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
                        الغاء
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
                  <Button Title={"الغاء"} onPress={() => toggleModal(null)} />
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
