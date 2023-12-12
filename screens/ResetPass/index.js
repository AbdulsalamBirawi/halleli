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
  const [emailError, setemailError] = React.useState("");

  const changepass = () => {
    if (emailError != "") {
      return;
    }
    setLoder(true);
    setTimeout(() => {
      setLoder(false);
      navigation.navigate("Createpassword", { email: email });
    }, 2000);
  };
  const handleEmailChange = (text) => {
    setEmail(text.toLowerCase());
  };

  const handleEmailBlur = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Check the validation when the input loses focus
    if (email.length === 0) {
      setemailError("The email should not be empty.");
    } else if (emailRegex.test(email)) {
      setemailError("");
    } else {
      setemailError("Please enter a valid email address.");
    }
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
          value={email}
          onChangeText={handleEmailChange}
          error={emailError}
          onBlur={handleEmailBlur}
        >
          <MaterialIcons name={"email"} size={25} color="#AAAA" />
        </Input>

        <Button Title={"تأكيد"} onPress={changepass} />
      </View>
    </View>
  );
};

export default ResetPass;
