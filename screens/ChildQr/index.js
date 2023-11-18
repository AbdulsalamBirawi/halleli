import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "../../Component/Button";
import { Input } from "../../Component/TextInput";
import Ellipse from "../../assets/Ellipse.png";
import QRCode from "react-qr-code";

const ChildQr = ({ route, navigation }) => {
  const { IdChaild, token } = route.params;

  const childs = {
    token: token,
    IdChaild: IdChaild,
  };

  const newChilder = JSON.stringify(childs);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
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
            color: "#3B3A7A",
            marginTop: 20,
          }}
        >
          الباركود الخاص بطفلك
        </Text>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <View
          style={{
            width: "100%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={newChilder}
            viewBox={`0 0 256 256`}
          />
        </View>
        <Button Title={"إنشاء باركود لطفل اخر"} />
      </View>
    </View>
  );
};

export default ChildQr;
