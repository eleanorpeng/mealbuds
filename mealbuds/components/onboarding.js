import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Themes } from "../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;

export default function Onboarding(props) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to MealBuds!</Text>
      <View style={styles.input_container}>
        <Text style={styles.text_name}>What's your name?</Text>
        <TextInput
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.storeName(name)}
      >
        <Ionicons name="arrow-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",

    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  text_name: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: windowWidth - 50,
  },
  input_container: {
    display: "flex",
    gap: 10,
    flex: 1,
    justifyContent: "center",
  },
  button: {
    // position: "absolute",
    backgroundColor: Themes.colors.backgroundOrange,
    padding: 20,
    borderRadius: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // left: 50,
    bottom: 10,
    right: 10,
  },
});
