import { View, Text, Image } from "react-native";
import React from "react";
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import SuccessTost from "../../Component/SuccessTost";
const ResetPass = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [loder, setLoder] = React.useState(false);

  const changepass = () => {
    setLoder(true);
    setTimeout(() => {
      setLoder(false);
      navigation.navigate("Createpassword", { email: email });
    }, 2000);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        direction: "ltr",
      }}
    >
      <SuccessTost
        visible={loder}
        image={require("../../assets/lottie/mail.json")}
        Titel={"Success Saend"}
      />
      <Image
        source={Ellipse}
        style={{
          position: "absolute",
          marginTop: "100%",
          resizeMode: "contain",
        }}
      />
      <View style={{ flex: 1, marginTop: 100, marginRight: 30 }}>
        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#843636",
            marginTop: 20,
          }}
        >
          إعادة تعين كلمة المرور
        </Text>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#3B3A7A",
            marginBottom: 20,
          }}
        >
          فضلا قم بإدخال البريد الالكتروني
        </Text>

        <Input
          placeholder={"البريد الالكتروني"}
          onChangeText={(text) => setEmail(text)}
          value={email}
        >
          <MaterialIcons name={"email"} size={25} color="#AAAA" />
        </Input>

        <Button Title={"تأكيد"} onPress={changepass} />
      </View>
    </View>
  );
};

export default ResetPass;
