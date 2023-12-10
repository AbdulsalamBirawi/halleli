import { View, Text, Image, DeviceEventEmitter, Platform } from "react-native";
import React, { useState, useContext } from "react";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import Loader from "../../Component/Loader";
<<<<<<< HEAD
export const API_URL = "http://192.168.1.66:3000/api";
=======
export const API_URL = "http://192.168.1.8:3000/api";
>>>>>>> c07fec60b514acaec8a018d9dff86b4454cc8b7f
import axios from "axios";
import { ContextGlobal } from "../../Store";
import { CheckBox } from "react-native-elements";
import DatePicker from "@react-native-community/datetimepicker";

const CreateChild = () => {
  const Context = useContext(ContextGlobal);
  const [name, setName] = useState("");
  const [dateBirth, setDateBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [loder, setLoder] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const token = Context.token;
  const setIsFirstTime = Context.setIsFirstTime;
  const [nameError, setNameError] = useState("");

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleNameBlur = () => {
    // Regular expression for Arabic characters and special characters
    const arabicSpecialCharsRegex = /^[\u0600-\u06FF\s*!@#$%^&*()_+،؛؟]+$/;

    // Check the validation when the input loses focus
    if (name.length === 0) {
      setNameError("The name should not be empty.");
    } else if (name.length <= 3) {
      setNameError("The name should be more than 3 characters.");
    } else if (!arabicSpecialCharsRegex.test(name)) {
      setNameError(
        "Please enter a valid name with only Arabic characters and special characters."
      );
    } else {
      setNameError("");
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateError, setDateError] = useState("");

  const handleDateChange = (date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setDateBirth(date);
    }
  };

  const handleDateBlur = () => {
    // Validate the date when the input loses focus
    const currentYear = new Date().getFullYear();

    // Check if the selectedDate is a valid Date object
    if (!selectedDate || isNaN(selectedDate.getTime())) {
      setDateError("Please enter a valid date.");
      return;
    }

    if (
      selectedDate.getMonth() < 0 ||
      selectedDate.getMonth() > 11 ||
      selectedDate.getDate() < 1 ||
      selectedDate.getDate() > 31 ||
      selectedDate.getFullYear() < 2010 ||
      selectedDate.getFullYear() > currentYear
    ) {
      setDateError("Please enter a valid date.");
    } else {
      setDateError("");
    }
  };

  const handleCheckboxChange = (value) => {
    setSelectedValue(value === selectedValue ? null : value);
    setGender(value);
  };
  const options = [
    { label: "ذكر", value: "male" },
    { label: "انثى", value: "female" },
  ];
  const handleLogin = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      console.log({ name, dateBirth, gender });
      const response = await axios.post(
        `${API_URL}/child`,
        {
          name,
          dateBirth,
          gender,
        },
        config
      );
      setIsFirstTime(false);

      DeviceEventEmitter.emit("creat->child", { reload: true });
      console.log(response.data);

      setLoder(true);
      setTimeout(() => {
        setLoder(false);
        // navigation.navigate("ParentLogin");
      }, 2000);

      return response.data;
    } catch (error) {
      console.error("حدث خطأ أثناء  :", error);
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
      <Loader visible={loder} />

      <Image
        source={Ellipse}
        style={{
          position: "absolute",
          marginTop: "100%",
          resizeMode: "contain",
        }}
      />
      <View style={{ flex: 1, marginTop: 100, marginRight: 30 }}>
        <Text style={{ textAlign: "right", fontSize: 35, color: "#3B3A7A" }}>
          حساب طفل ...
        </Text>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <Text style={{ textAlign: "right", fontSize: 25, color: "#3B3A7A" }}>
          الاسم
        </Text>
        <Input
          placeholder={" الاسم"}
          Icon={"email"}
          value={name}
          onChangeText={handleNameChange}
          onBlur={handleNameBlur}
          error={nameError}
        >
          <FontAwesome name="user" size={25} color="#AAAA" />
        </Input>

        <Text
          style={{
            textAlign: "right",
            fontSize: 25,
            color: "#3B3A7A",
            marginTop: 20,
          }}
        >
          {" "}
          تاريخ الميلاد
        </Text>
        <Input
          defaultValue={
            new Date(dateBirth || Date.now())?.toISOString()?.split("T")?.[0]
          }
          placeholder="اختر تاريخ"
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
          onFocus={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DatePicker
            minimumDate={new Date()}
            value={new Date(dateBirth || Date.now())} // Ensure selectedDate is not undefined
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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

        <Button Title={" إضافة الطفل "} onPress={handleLogin} />
      </View>
    </View>
  );
};

export default CreateChild;
