import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function Button({
  Title,
  disabled,
  onPress,
  Color,
  icon,
  colorText,
  Loading,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          // backgroundColor: Color ? Color : "black",
          flexDirection: "row",
          gap: 10,
        },
      ]}
      accessible={true}
      accessibilityLabel="Tap me!"
      disabled={disabled}
      onPress={onPress}
    >
      <LinearGradient
        // locations={[0, 0.5, 0]}
        colors={["#3B3A7A", "#B566F2"]}
        style={{
          height: 50,
          width: "100%",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {icon ? (
          <Image source={icon} style={{ height: 30, width: 30 }} />
        ) : null}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: colorText ? colorText : "#fff",
          }}
        >
          {Title}
        </Text>
        {Loading ? <ActivityIndicator size="small" color="#fff" /> : null}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 2,
  },
});
