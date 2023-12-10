import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.43.79:3000/api";
export const ContextGlobal = React.createContext();

const ContextData = (props) => {
  const [token, setToken] = React.useState(null);
  const [loder, setLoder] = useState(false);
  const [chaild, setChaild] = useState([]);
  const [Parent, setParent] = useState(false);
  const [auth, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [loggedInChild, setLoggedInChild] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isParent, setIsParent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [child, setChild] = useState(null);

  async function getData() {
    try {
      const retrievedValue = await SecureStore.getItemAsync("auth");

      setToken(retrievedValue);

      console.log("Retrieved value:", retrievedValue);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  const refreshChild = async () => {
    const res = await axios.get(`${API_URL}/child/child/${loggedInChild._id}`);
    const data = res.data.child;
    setLoggedInChild(data);
  };
  // save in  storage
  // Storing data in SecureStore
  async function saveData(value) {
    try {
      await SecureStore.setItemAsync("auth", value);
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  // Remove the item associated with the key
  async function removeAuth() {
    try {
      await SecureStore.deleteItemAsync("auth");
      console.log("Item removed successfully");
      setToken(null);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  const getChild = async (user) => {
    try {
      const response = await axios.get(`${API_URL}/child`);

      if (response.data && Array.isArray(response.data)) {
        const finalChild = response.data.filter(
          (item) => item.parentId == user._id
        );
        console.log({
          response: response.data,
          user: { od: user._id, id: user._id },
        });
        setChaild(finalChild);
      } else {
        console.error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
      if (token) {
        await getme();
      }
    })();
  }, [token]);

  const handleLogin = async ({ email, password }) => {
    try {
      await axios
        .post(`${API_URL}/users/login`, {
          email,
          password,
        })
        .then(async (res) => {
          setToken(res.data.token);

          saveData(res.data.token);
        })
        .catch((err) => {
          console.error;
        });

      setLoder(true);
      setTimeout(() => {
        setLoder(false);
      }, 2500);

      // return response.data;
    } catch (error) {
      console.error("حدث خطأ أثناء تسجيل الدخول:", error);
    }
  };
  const getme = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.get(
        `${API_URL}/users/me`,

        config
      );

      await getChild(response.data);
      setUser(response.data);
      setIsFirstTime(response.data.firstTime);
      setIsParent(true);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error("حدث خطأ أثناء  :", error);
    }
  };

  const handelChangePassword = async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_URL}/users/newpass`, {
        email,
        password,
      });

      setLoder(true);

      setTimeout(() => {
        setLoder(false);
      }, 2000);

      return response.data;
    } catch (error) {
      console.error("حدث خطأ أثناء تسجيل الدخول:", error);
      throw error;
    }
  };

  return (
    <ContextGlobal.Provider
      value={{
        handleLogin,
        token,
        loder,
        Parent,
        setParent,
        removeAuth,
        saveData,
        handelChangePassword,
        open,
        setOpen,
        user,
        isFirstTime,
        isParent,
        isLoading,
        chaild,
        setIsParent,
        loggedInChild,
        setLoggedInChild,
        setIsLoading,
        child,
        setChild,
        refreshChild,
        setIsFirstTime,
        setChaild,
        getChild,
      }}
    >
      {props.children}
    </ContextGlobal.Provider>
  );
};

export default ContextData;
