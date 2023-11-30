import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "../../Component/Button";
import Ellipse from "../../assets/Ellipse.png";
import axios from "axios";
import { ContextGlobal } from "../../Store";
import family from "../../assets/family2.jpg";
const API_URL = "http://192.168.1.66:3000/api";

const HomeParent = ({ navigation }) => {
  const Context = useContext(ContextGlobal);

  const [chaild, setChaild] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Context.token;
  const user = Context.user;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/child`);
        if (response.data && Array.isArray(response.data)) {
          setChaild(response.data);
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
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        direction: "ltr",
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginRight: 30,
        }}
      >
        <Text style={{ textAlign: "right", fontSize: 35, color: "#3B3A7A" }}>
          مرحبا {user.name}
        </Text>
      </View>

      <View style={{ flex: 3, padding: 10 }}>
        <View
          style={{
            width: 200,
            height: 350,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              marginLeft: 80,
            }}
            source={family}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            color: "#3B3A7A",
            marginTop: 20,
          }}
        >
          لم يتم تسجيل أي طفل حتى الآن
        </Text>
        <Button
          Title={" إضافة الطفل "}
          onPress={() => {
            navigation.navigate("AddChild");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeParent;
