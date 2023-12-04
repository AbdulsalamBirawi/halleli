import React, { useContext, useState } from "react";
import {
  Text,
  Platform,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Home, Portfolio, Prices, Settings, Transaction } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Restart } from "./Component/Restart";
import { ContextGlobal } from "./Store/index";

import {
  AntDesign,
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { I18nManager } from "react-native";

import SavingsScreen from "./screens/SavingsScreen";
import WalletScreen from "./screens/WalletScreen";
import HomeScreen from "./screens/HomeScreen";
import ParentLogin from "./screens/ParentLogin";
import ParentRegister from "./screens/ParentRegister";
import ResetPass from "./screens/ResetPass";
import CreateChild from "./screens/CreateChild";
import AddChild from "./screens/AddChild";
import PerentLogout from "./screens/PerentLogout";
import ChildLogin from "./screens/ChildLogin";
import Welcome from "./screens/Welcome";
import ChildQr from "./screens/ChildQr";
import ScannerScreen from "./screens/Scanner";
import Createpassword from "./screens/Createpassword";
import ProfileChild from "./screens/ProfileChild";
import HomeParent from "./screens/HomeParent";
import AddGoal from "./screens/addGaol";
import Goal from "./screens/Goal";
import AddTask from "./screens/AddTask";
import RootTask from "./screens/RootTask";
import Profile from "./screens/Profile";
// import Store
import ContextData from "./Store";
import { Button } from "./Component/Button";
import { Picker } from "@react-native-picker/picker";
import { Input } from "./Component/TextInput";

// const ModalScreen = ({ navigation }) => {
//   const [isInternaltransSucsess, setisInternaltransSucsess] = useState(false);
//   const [toCurrentAccountValue, settoCurrentAccountValue] = useState(null);
//   const [selectedAccountType, setSelectedAccountType] =
//     useState("savingAccount");
//   const [selectedTransferAccount, setSelectedTransferAccount] =
//     useState("currentAccount");
//   const [internalTransferModel, setinternalTransferModel] = useState(false);
//   const internalToggleModel = () => {
//     setinternalTransferModel(!internalTransferModel);
//     setisInternaltransSucsess(false);
//   };
//   const handelinternal = () => {
//     transferInternal();
//   };
//   const transferInternal = async () => {
//     const res = await axios.post(`${API_URL}/transaction/${user._id}`, {
//       from: selectedAccountType,
//       to: selectedTransferAccount,
//       amount: toCurrentAccountValue,
//     });
//     DeviceEventEmitter.emit("transfer->internal", { reload: true });
//     setisInternaltransSucsess(true);
//   };
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={internalTransferModel}
//           onRequestClose={() => internalToggleModel()}
//         >
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               // backgroundColor: "white",
//             }}
//           >
//             {isInternaltransSucsess && (
//               <View
//                 style={{
//                   backgroundColor: "white",
//                   padding: 20,
//                   borderRadius: 10,
//                   elevation: 5,
//                 }}
//               >
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     fontWeight: "600",
//                     fontSize: 20,
//                     marginVertical: 20,
//                   }}
//                 >
//                   تم التحويل بنجاح
//                 </Text>
//                 <Button
//                   onPress={() => internalToggleModel()}
//                   Title={"استمرار"}
//                 />
//               </View>
//             )}
//             {isInternaltransSucsess == false && (
//               <View
//                 style={{
//                   backgroundColor: "white",
//                   padding: 20,
//                   borderRadius: 10,
//                   elevation: 5,
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#3B3A7A",
//                     fontSize: 20,
//                     marginVertical: 10,
//                     fontWeight: "600",
//                   }}
//                 >
//                   التحويل بين الحسابات
//                 </Text>
//                 <View>
//                   <Text>اختر نوع الحساب:</Text>
//                   <Picker
//                     selectedValue={selectedAccountType}
//                     onValueChange={(itemValue) =>
//                       setSelectedAccountType(itemValue)
//                     }
//                   >
//                     <Picker.Item label="الحساب الادخاري" value="savingAccount" />
//                     <Picker.Item label="الحساب الجاري" value="currentAccount" />
//                   </Picker>
//                   <Text>اختر حساب النقل:</Text>
//                   <Picker
//                     selectedValue={selectedTransferAccount}
//                     onValueChange={(itemValue) =>
//                       setSelectedTransferAccount(itemValue)
//                     }
//                   >
//                     <Picker.Item label="الحساب الادخاري" value="savingAccount" />
//                     <Picker.Item label="الحساب الجاري" value="currentAccount" />
//                   </Picker>
//                 </View>
//                 <View>
//                   <Text>المبلغ</Text>
//                   <Input onChangeText={(e) => settoCurrentAccountValue(e)} />
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     width: "100%",
//                     gap: 20,
//                     marginVertical: 20,
//                     marginLeft: 35,
//                     alignItems: "center",
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => handelinternal()}
//                     style={{
//                       backgroundColor: "#3B3A7A",
//                       paddingHorizontal: 40,
//                       paddingVertical: 10,
//                       borderRadius: 10,
//                     }}
//                   >
//                     <Text style={{ color: "white", fontSize: 15 }}>ارسال</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => internalToggleModel(null)}
//                     style={{
//                       backgroundColor: "red",
//                       paddingHorizontal: 40,
//                       paddingVertical: 10,
//                       borderRadius: 10,
//                     }}
//                   >
//                     <Text style={{ color: "white", fontSize: 15 }}>الغاء</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };
// Thanks for watching
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

// const Parent = true;
function RooteTab() {
  // if (!I18nManager.isRTL) {
  //   I18nManager.allowRTL(false);
  //   I18nManager.forceRTL(false);
  //   Restart();
  // }
  const Context = useContext(ContextGlobal);
  const user = Context.user;
  const isLoading = Context.isLoading;
  // const Parent = Context.Parent;
  const Parent = Context.isParent;
  if (isLoading) {
    return <View></View>;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarOnPress: ({ navigation }) => {
          if (route.name === "ModalTab") {
            setModalVisible(true);
          } else {
            navigation.navigate(route.name);
          }
        },
        tabBarStyle: { direction: "rtl" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={
          Parent ? (Context.isFirstTime ? HomeParent : AddChild) : HomeScreen
        }
        // component={HomeScreen}
        options={{
          title: " الرئيسية",
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={24}
                color={focused ? "#2C2B66D6" : "#111"}
              />
            );
          },
        }}
      />

      {!Parent && (
        <Tab.Screen
          name="Prices"
          component={Prices}
          options={{
            title: " اخوتي",

            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="people-outline"
                  size={24}
                  color={focused ? "#2C2B66D6" : "#111"}
                />
              );
            },
          }}
        />
      )}
      {!Parent && (
        <Tab.Screen
          name="Transaction"
          component={Transaction}
          options={{
            title: " التحويلات",

            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#2C2B66D6",
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                  }}
                >
                  <FontAwesome name="exchange" size={24} color="#fff" />
                </View>
              );
            },
          }}
        />
      )}

      {!Parent && (
        <Tab.Screen
          name="Goalsss"
          component={Goal}
          options={{
            title: "أهدافي",

            tabBarIcon: ({ focused }) => {
              return (
                <MaterialIcons
                  name="stacked-line-chart"
                  size={24}
                  color={focused ? "#2C2B66D6" : "#111"}
                />
              );
            },
          }}
        />
      )}
      <Tab.Screen
        name="RootTask"
        component={Parent == true ? RootTask : Portfolio}
        options={{
          title: "مهامي",

          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="clipboard-list"
                size={24}
                color={focused ? "#2C2B66D6" : "#111"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
function RooteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChildLogin"
        component={ChildLogin}
        options={({ navigation, route }) => ({
          title: "ChildLogin",
          headerShown: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ParentLogin"
        component={ParentLogin}
        options={({ navigation, route }) => ({
          title: "ParentLogin",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ParentRegister"
        component={ParentRegister}
        options={({ navigation, route }) => ({
          title: "ParentRegister",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />

      <Stack.Screen
        name="ResetPass"
        component={ResetPass}
        options={({ navigation, route }) => ({
          title: "ResetPass",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Createpassword"
        component={Createpassword}
        options={({ navigation, route }) => ({
          title: "تعين كلمة مرور جديدة",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={({ navigation, route }) => ({
          title: "Scanner",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      {/* <Stack.Screen
            name="Home"
            component={RooteStack}
            options={{
              headerShown: false,
            }}
          /> */}
      <Stack.Screen
        name="RooteTab"
        component={RooteTab}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="VisaScreen"
        component={WalletScreen}
        options={({ navigation, route }) => ({
          title: "الحساب الجاري",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="SavingsScreen"
        component={SavingsScreen}
        options={({ navigation, route }) => ({
          title: "الحساب الادخاري",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreateChild"
        component={CreateChild}
        options={({ navigation, route }) => ({
          title: "إضافة طفل جديد",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />

      <Stack.Screen
        name="AddChild"
        component={AddChild}
        options={({ navigation, route }) => ({
          title: "اضافة طفل",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />

      <Stack.Screen
        name="PerentLogout"
        component={PerentLogout}
        options={({ navigation, route }) => ({
          title: "تسجيل الخروج",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={({ navigation, route }) => ({
          title: "تسجيل الدخول للطفل",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProfileChild"
        component={ProfileChild}
        options={({ navigation, route }) => ({
          title: "بروفايل الابن",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />

      <Stack.Screen
        name="ChildQr"
        component={ChildQr}
        options={({ navigation, route }) => ({
          title: "بار كود الطفل",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddGoal"
        component={AddGoal}
        options={({ navigation, route }) => ({
          title: "اضافة هدف ",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={({ navigation, route }) => ({
          title: "اضافة مهمة ",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="RootTask"
        component={RootTask}
        options={({ navigation, route }) => ({
          title: "اضافة هدف ",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Goal"
        component={Goal}
        options={({ navigation, route }) => ({
          title: "اضافة هدف ",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          title: " Profile ",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color="black"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <ContextData>
      <NavigationContainer>{RooteStack()}</NavigationContainer>
    </ContextData>
  );
}
