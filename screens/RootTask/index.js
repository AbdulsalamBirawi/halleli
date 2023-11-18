import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import female from "../../assets/female.png";
import Ellipse from "../../assets/Ellipse.png";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import Deteils from "../../Component/Deteils";
import { ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { Input } from "../../Component/TextInput";
import { Button } from "../../Component/Button";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { ContextGlobal } from "../../Store";

export default RootTask = ({ navigation }) => {
  const api = "http://192.168.43.79:3000/api";
  const options = [
    { label: "بدنية", value: 1 },
    { label: "عقلية", value: 2 },
    { label: "تطوعية", value: 3 },
  ];
  const context = useContext(ContextGlobal);
  const user = context.user;

  console.log(user);
  const [editTask, setEditTask] = useState({
    taskType: null,
    taskName: "",
    mony: "",
    date: "",
  });
  const [open, setOpen] = useState("kareem");
  const [visible, setVisible] = useState(false);
  const [deletTask, setdeletTask] = useState(false);
  const [editeTask, setediteTask] = useState(false);
  const [editTypeTask, setEditTypeTask] = useState(null);
  const [submited, setsubmited] = useState({
    edit: false,
    delet: false,
  });
  const [requestTask, setrequestTask] = useState({
    accept: false,
    denied: false,
  });
  const [requestTasksData, setrequestTasksData] = useState([]);

  const getRequestTasks = async () => {
    const res = await axios.get(`${api}/requesttask`);
    const requsetTasks = res.data;
    console.log(requsetTasks);
    setrequestTasksData(requsetTasks);
  };
  useEffect(() => {
    getRequestTasks();
  }, []);

  const handleCheckboxChange = (value) => {
    setSelectedValue(value === editTypeTask ? null : value);
    setNewTask({ ...editTask, taskType: editTypeTask });
  };

  const handelDeletTask = () => {
    setdeletTask(false);
    setsubmited({ ...submited, delet: true });
  };
  const handelEditeTask = () => {
    setediteTask(false);
    setsubmited({ ...submited, edit: true });
  };

  console.log(requestTasksData);
  return (
    <View>
      <Deteils visible={visible} setvisible={setVisible} />
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
            {[1, 2].map(
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
                    <Image
                      source={female}
                      style={{ height: 50, width: 50, resizeMode: "contain" }}
                    />
                    <Text style={{ fontSize: 23 }}>مرين</Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{ fontSize: 20, width: 200, textAlign: "right" }}
                    >
                      item.description
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        width: 200,
                        textAlign: "right",
                        color: "#3B3A7A",
                      }}
                    >
                      نوع المهمة : item.typeTask
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <TouchableOpacity
                      onPress={() =>
                        setrequestTask({ ...requestTask, accept: true })
                      }
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
                      onPress={() =>
                        setrequestTask({ ...requestTask, denied: true })
                      }
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
            {/* <Image
              source={Ellipse}
              style={{
                position: "absolute",
                marginTop: "100%",
                resizeMode: "contain",
              }}
            /> */}
            <View style={{ flex: 1.5, gap: 10 }}>
              <Text style={{ textAlign: "right", fontSize: 20 }}>
                احدث المهام المنجزة
              </Text>
              {[1].map((item, index) => (
                <View
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
                    <Image
                      source={female}
                      style={{ height: 70, width: 70, resizeMode: "contain" }}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={{ fontSize: 23, textAlign: "right" }}>
                      مرين
                    </Text>

                    <Text
                      style={{ fontSize: 18, width: 200, textAlign: "right" }}
                    >
                      قمت بطلب مهمة المساعدة في اعمال المنزل
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}></View>
                </View>
              ))}
            </View>
            <View style={{ flex: 2, gap: 10 }}>
              <Text style={{ textAlign: "right", fontSize: 20 }}>
                المهام المستندة
              </Text>
              {[1, 2].map((item, index) => (
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
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      source={female}
                      style={{ height: 70, width: 70, resizeMode: "contain" }}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={{ fontSize: 23, textAlign: "right" }}>
                      مرين
                    </Text>

                    <Text
                      style={{ fontSize: 18, width: 200, textAlign: "right" }}
                    >
                      قمت بطلب مهمة المساعدة في اعمال المنزل
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <TouchableOpacity
                      onPress={() => setdeletTask(true)}
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
                      onPress={() => setediteTask(true)}
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

              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                  marginRight: 30,
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
              </View>
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
                visible={deletTask}
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
                        onPress={() => setdeletTask(false)}
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
                visible={editeTask}
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
                            title={option.label}
                            checked={option.value === editTypeTask}
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
                        onChangeText={(e) =>
                          setediteTask({ ...editeTask, taskName: e })
                        }
                        placeholder={"اسم المهمة"}
                        backColor={"#fff"}
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
                        onChangeText={(e) =>
                          setediteTask({ ...editeTask, date: e })
                        }
                        placeholder={"اخر موعد لانجاز المهمة"}
                        backColor={"#fff"}
                      />
                      <Text
                        style={{
                          textAlign: "right",
                          color: "#3B3A7A",
                          fontSize: 22,
                        }}
                      >
                        الاولاد
                      </Text>
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
                          اغلاق
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
