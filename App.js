import React, { useContext } from "react";
import { Text, Platform, View, Image } from "react-native";
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
    return <View></View>   
  }
  return (
    
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { direction: "rtl" }, // تحديد اتجاه العرض
      }}
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
                  name="settings"
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
            title: "اهدافي",

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
          title: " مهام",

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
          title: "الحساب الادخار",
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
  return (
    <ContextData>
      <NavigationContainer>{RooteStack()}</NavigationContainer>
    </ContextData>
  );
}
