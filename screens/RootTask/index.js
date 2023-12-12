import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  DeviceEventEmitter,
} from "react-native";
import female from "../../assets/female.png";
import Ellipse from "../../assets/Ellipse.png";
import { Ionicons } from "@expo/vector-icons";
import Deteils from "../../Component/Deteils";
import { ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { Input } from "../../Component/TextInput";
import { Button } from "../../Component/Button";
import male from "../../assets/male.png";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { ContextGlobal } from "../../Store";
import DatePicker from "@react-native-community/datetimepicker";

export default RootTask = ({ navigation }) => {
  const api = "http://192.168.43.79:3000/api";
  const options = [
    { label: "بدنية", value: 1 },
    { label: "عقلية", value: 2 },
    { label: "تطوعية", value: 3 },
  ];
  const context = useContext(ContextGlobal);
  const [open, setOpen] = useState("kareem");
  const [visible, setVisible] = useState(false);
  const [deletTask, setdeletTask] = useState(null);
  const [editeTask, setediteTask] = useState(null);
  const [editTypeTask, setEditTypeTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const [completeTask, setcompleteTask] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [latestsTasks, setLatestTasks] = useState([]);
  const [submited, setsubmited] = useState({
    edit: false,
    delet: false,
  });
  const [visibleComplete, setvisibleComplete] = useState(false);
  const [requestTask, setrequestTask] = useState({
    accept: false,
    denied: false,
  });
  const [requestTasksData, setrequestTasksData] = useState([]);

  const [completeTaskId, setcompleteTaskId] = useState(null);

  const getRequestTasks = async () => {
    const res = await axios.get(`${api}/requesttask`, {
      headers: { Authorization: "Bearer " + context.token },
    });
    const requsetTasks = res.data;
    console.log({ requsetTasks });
    setrequestTasksData(requsetTasks);
  };

  const getTasks = async () => {
    const res = await axios.get(`${api}/task/parentTasks`, {
      headers: { Authorization: "Bearer " + context.token },
    });
    const sortedTasks = res.data
      .map((e) => ({
        ...e,
        typeTask: options.find((x) => x.value === e.typeTask)?.label,
        child: e.childId?.name,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setTasks(sortedTasks);

    const { data } = await axios.get(`${api}/task/Cmopletaed`, {
      headers: { Authorization: "Bearer " + context.token },
    });
    setLatestTasks(
      data
        .map((e) => ({
          ...e,
          typeTask: options.find((x) => x.value === e.typeTask)?.label,
          child: e.childId?.name,
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };

  useEffect(() => {
    DeviceEventEmitter.addListener("tasks->reload", (d) => {
      setReload((r) => !r);
    });
    getRequestTasks();
    getTasks();
    const internal = setInterval(() => {
      setReload((r) => !r);
    }, 10 * 1000);
    return () => {
      DeviceEventEmitter.removeAllListeners();
      clearInterval(internal);
    };
  }, [reload]);

  const handleCheckboxChange = (value) => {
    setEditTypeTask(value === editTypeTask ? null : value);
    //setediteTask({ ...editTask, taskType: editTypeTask });
  };

  const handelDeletTask = async () => {
    const id = deletTask;
    await axios.delete(`${api}/task/${id}`, {
      headers: { Authorization: "Bearer " + context.token },
    });
    setReload((r) => !r);
    setdeletTask(false);
    setsubmited({ ...submited, delet: true });
  };
  const handelEditeTask = async () => {
    if (descError != "" || taskNameError != "") {
      return;
    }
    const newTask = editeTask;
    const data = {
      desc: newTask.desc || viewTask.desc,
      typeTask: editTypeTask,
      name: newTask.taskName || viewTask.name,
      time: newTask.date || viewTask.time,
      valueTask: newTask.mony || viewTask.valueTask,
      childId: editeTask.childId._id,
    };
    const id = viewTask._id;
    await axios.put(`${api}/task/${id}`, data, {
      headers: { Authorization: "Bearer " + context.token },
    });
    setReload((r) => !r);
    setediteTask(false);

    setsubmited({ ...submited, edit: true });
  };
  const [viewTask, setViewTask] = useState(null);
  const handleDateChange = (e, date) => {
    setShowDatePicker(false);

    if (date !== undefined) {
      setediteTask({ ...editeTask, date: date });
    }
  };
  const returnCompleteTask = async () => {
    const res = await axios.put(`${api}/task/${completeTaskId}`, {
      status: false,
    });
  };
  const [taskNameError, setTaskNameError] = useState("");

  const handleTaskNameChange = (input) => {
    setediteTask({ ...editeTask, taskName: input });
  };

  const handleTaskNameBlur = () => {
    // Regular expression for Arabic characters
    const arabicRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;

    if (editeTask.taskName.length < 3 || editeTask.taskName.length > 30) {
      setTaskNameError("Task name should be between 3 and 30 characters.");
    } else if (!arabicRegex.test(editeTask.taskName)) {
      setTaskNameError(
        "Task name should contain only Arabic and English characters."
      );
    } else {
      setTaskNameError("");
    }
  };

  const [descError, setDescError] = useState("");

  const handleDescChange = (input) => {
    setediteTask({ ...editeTask, desc: input });
  };

  const handleDescBlur = () => {
    // Regular expression for Arabic characters
    const arabicRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
    if (editeTask.desc.length < 3 || editeTask.desc.length > 150) {
      setDescError("Description should be between 3 and 150 characters.");
    } else if (!arabicRegex.test(editeTask.desc)) {
      setDescError(
        "Description should contain only Arabic and English characters."
      );
    } else {
      setDescError("");
    }
  };

  return (
    <View>
      <Deteils
        visible={visible && !!viewTask}
        setvisible={setVisible}
        deteils={viewTask}
      />
      <Deteils
        visible={visibleComplete}
        setvisible={setvisibleComplete}
        deteils={completeTask}
        completeTaskId={completeTaskId}
      />
      <View style={{ borderBottomWidth: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setOpen("kareem");
          }}
          style={{
            height: 50,
            width: "50%",
            borderBottomWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            borderColor: open == "kareem" ? "black" : "#fff",
          }}
        >
          <Text style={{ fontWeight: open == "kareem" ? "bold" : "400" }}>
            طلبات المهام
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpen("reem");
          }}
          style={{
            height: 50,
            width: "50%",
            borderBottomWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            borderColor: open == "reem" ? "black" : "#fff",
          }}
        >
          <Text style={{ fontWeight: open == "reem" ? "bold" : "400" }}>
            مهام أطفالي
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {open == "kareem" ? (
          <ScrollView
            style={{
              height: "100%",
              backgroundColor: "#fff",
              padding: 10,
              gap: 10,
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
            <Text style={{ textAlign: "right", fontSize: 20 }}>
              احدث الطلبات
            </Text>
            {requestTasksData.map(
              (
                item,
                index //user.requestTask
              ) => (
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                  }}
                  style={{
                    height: 100,
                    width: "100%",
                    borderWidth: 1,
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {item.childId.gender == "male" ? (
                      <Image
                        source={male}
                        style={{ height: 50, width: 50, resizeMode: "contain" }}
                      />
                    ) : (
                      <Image
                        source={female}
                        style={{ height: 50, width: 50, resizeMode: "contain" }}
                      />
                    )}

                    <Text style={{ fontSize: 23 }}>{item.childId?.name}</Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{ fontSize: 20, width: 200, textAlign: "right" }}
                    >
                      {item.desc}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        width: 200,
                        textAlign: "right",
                        color: "#3B3A7A",
                      }}
                    >
                      {item.taskType}
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <TouchableOpacity
                      onPress={async () => {
                        await axios.get(`${api}/requesttask/${item._id}`);
                        setReload((r) => !r);
                      }}
                      style={{
                        height: 30,
                        width: 40,
                        backgroundColor: "green",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff" }}>قبول</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        await axios.delete(`${api}/requesttask/${item._id}`);
                        setReload((r) => !r);
                      }}
                      style={{
                        height: 30,
                        width: 40,
                        backgroundColor: "black",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff" }}>رفض</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            )}
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
                visible={requestTask.accept || requestTask.denied}
                onRequestClose={() =>
                  setrequestTask({ accept: false, denied: true })
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    elevation: 200,
                  }}
                >
                  <View
                    style={{ backgroundColor: "white", alignItems: "center" }}
                  >
                    {requestTask.accept && (
                      <Text
                        style={{
                          color: "#3B3A7A",
                          marginVertical: 60,
                          fontSize: 30,
                        }}
                      >
                        تم قبول المهمة
                      </Text>
                    )}
                    {requestTask.denied && (
                      <Text
                        style={{
                          color: "#3B3A7A",
                          marginVertical: 60,
                          fontSize: 30,
                        }}
                      >
                        تم حذف المهمة
                      </Text>
                    )}

                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <Button
                        onPress={() =>
                          setrequestTask({ accept: false, denied: false })
                        }
                        Title={"استمرار"}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={{
              height: "100%",
              backgroundColor: "#fff",
              padding: 10,
              gap: 10,
            }}
          >
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
              <Text style={{ fontSize: 20, color: "#3B3A7A" }}>
                اضافة المهام
              </Text>
              <Ionicons
                name="add-circle-outline"
                size={35}
                color={"#2C2B66D6"}
              />
            </TouchableOpacity>
            {latestsTasks.length > 0 && (
              <View style={{ flex: 1.5, gap: 10 }}>
                <Text style={{ textAlign: "right", fontSize: 20 }}>
                  احدث المهام المنجزة
                </Text>
                {latestsTasks.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setcompleteTask(item);
                      setvisibleComplete(true);
                      setcompleteTaskId(item._id);
                    }}
                    style={{
                      height: 100,
                      width: "100%",
                      borderWidth: 1,
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: "lightgreen",
                    }}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      {item.childId.gender == "male" ? (
                        <Image
                          source={male}
                          style={{
                            height: 50,
                            width: 50,
                            resizeMode: "contain",
                          }}
                        />
                      ) : (
                        <Image
                          source={female}
                          style={{
                            height: 50,
                            width: 50,
                            resizeMode: "contain",
                          }}
                        />
                      )}
                    </View>
                    <View style={{}}>
                      <Text style={{ fontSize: 23, textAlign: "right" }}>
                        {item.child}
                      </Text>

                      <Text
                        style={{ fontSize: 18, width: 200, textAlign: "right" }}
                      >
                        {item.desc}
                      </Text>
                    </View>
                    <View style={{ gap: 2 }}></View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View
              style={{
                flex: 1,
                marginRight: 30,
              }}
            ></View>
            <View style={{ flex: 2, gap: 10 }}>
              <Text style={{ textAlign: "right", fontSize: 20 }}>
                المهام المسندة
              </Text>
              <ScrollView>
                {tasks.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(true);
                      setViewTask(item);
                      console.log({ item });
                    }}
                    style={{
                      height: 100,
                      width: "100%",
                      borderWidth: 1,
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: index == tasks.length - 1 ? 100 : 20,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      {item.childId.gender == "male" ? (
                        <Image
                          source={male}
                          style={{
                            height: 50,
                            width: 50,
                            resizeMode: "contain",
                          }}
                        />
                      ) : (
                        <Image
                          source={female}
                          style={{
                            height: 50,
                            width: 50,
                            resizeMode: "contain",
                          }}
                        />
                      )}
                    </View>
                    <View style={{}}>
                      <Text style={{ fontSize: 23, textAlign: "right" }}>
                        {item.child}
                      </Text>

                      <Text
                        style={{ fontSize: 18, width: 200, textAlign: "right" }}
                      >
                        {item.desc}
                      </Text>
                    </View>
                    <View
                      style={{
                        gap: 2,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setdeletTask(item._id)}
                        style={{
                          height: 30,
                          width: 40,
                          backgroundColor: "green",
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#fff" }}>حدف</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setediteTask(item);
                          setViewTask(item);
                        }}
                        style={{
                          height: 30,
                          width: 40,
                          backgroundColor: "black",
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#fff" }}>تعديل</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
                visible={!!deletTask}
                onRequestClose={() => setdeletTask(false)}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    elevation: 200,
                  }}
                >
                  <View
                    style={{ backgroundColor: "white", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "#3B3A7A",
                        marginVertical: 60,
                        fontSize: 30,
                      }}
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
                        onPress={() => setdeletTask(null)}
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
                          الغاء
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handelDeletTask()}
                        style={{
                          backgroundColor: "#3B3A7A",
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
                          حذف المهمة
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
                visible={!!editeTask}
                onRequestClose={() => setediteTask(false)}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    elevation: 200,
                  }}
                >
                  <View
                    style={{ backgroundColor: "white", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "#3B3A7A",

                        fontSize: 30,
                      }}
                    >
                      تعديل المهمة
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
                            title={option?.label}
                            checked={option?.value === editTypeTask}
                            onPress={() => handleCheckboxChange(option.value)}
                          />
                        ))}
                      </View>
                    </View>
                    <View style={{ marginTop: 20, marginTop: 20 }}>
                      <Text
                        style={{
                          textAlign: "right",
                          color: "#3B3A7A",
                          fontSize: 22,
                        }}
                      >
                        اسم المهمة{" "}
                      </Text>
                      <Input
                        onChangeText={(e) => handleTaskNameChange(e)}
                        onBlur={handleTaskNameBlur}
                        defaultValue={editeTask?.name}
                        placeholder={"اسم المهمة"}
                        backColor={"#fff"}
                        error={taskNameError}
                      />
                    </View>
                    <View style={{ marginTop: 20, marginTop: 20 }}>
                      <Text
                        style={{
                          textAlign: "right",
                          color: "#3B3A7A",
                          fontSize: 22,
                        }}
                      >
                        وصف المهمة{" "}
                      </Text>
                      <Input
                        onChangeText={(e) => handleDescChange(e)}
                        onBlur={handleDescBlur}
                        defaultValue={editeTask?.desc}
                        placeholder={"وصف المهمة"}
                        backColor={"#fff"}
                        error={descError}
                      />
                    </View>

                    {/*  */}
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          textAlign: "right",
                          color: "#3B3A7A",
                          fontSize: 22,
                        }}
                      >
                        المبلغ المستحق
                      </Text>
                      <Input
                        onChangeText={(e) =>
                          setediteTask({ ...editeTask, mony: e })
                        }
                        defaultValue={editeTask?.valueTask?.toString()}
                        placeholder={"المبلغ المستحق"}
                        backColor={"#fff"}
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          textAlign: "right",
                          color: "#3B3A7A",
                          fontSize: 22,
                        }}
                      >
                        اخر موعد لانجاز المهمة{" "}
                      </Text>

                      <Input
                        defaultValue={
                          new Date(editeTask?.time || Date.now())
                            ?.toISOString()
                            ?.split("T")?.[0]
                        }
                        placeholder="اختر تاريخ"
                        style={{ borderBottomWidth: 1, marginBottom: 10 }}
                        onFocus={() => setShowDatePicker(true)}
                      />
                      {showDatePicker && (
                        <DatePicker
                          minimumDate={new Date()}
                          value={new Date(editeTask?.date || Date.now())}
                          mode="date"
                          display="default"
                          onChange={handleDateChange}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        display: "flex",
                        gap: 20,
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setediteTask(false)}
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
                          الغاء
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handelEditeTask()}
                        style={{
                          backgroundColor: "#3B3A7A",
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
                          تعديل المهمة
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
                visible={submited.delet || submited.edit}
                onRequestClose={() =>
                  setsubmited({ delet: false, edit: false })
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    elevation: 200,
                  }}
                >
                  <View
                    style={{ backgroundColor: "white", alignItems: "center" }}
                  >
                    {submited.delet && (
                      <Text
                        style={{
                          color: "#3B3A7A",
                          marginVertical: 60,
                          fontSize: 30,
                        }}
                      >
                        تم الحذف بنجاح
                      </Text>
                    )}
                    {submited.edit && (
                      <Text
                        style={{
                          color: "#3B3A7A",
                          marginVertical: 60,
                          fontSize: 30,
                        }}
                      >
                        تم التعديل بنجاح
                      </Text>
                    )}

                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <Button
                        onPress={() =>
                          setsubmited({ delet: false, edit: false })
                        }
                        Title={"استمرار"}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};
