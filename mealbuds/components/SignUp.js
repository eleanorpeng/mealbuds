// SignUp.js
import React, { useState } from "react";
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
import { auth } from "./firebase"; // Adjust the path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";

const windowWidth = Dimensions.get("window").width;

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up for MealBuds</Text>
      <View style={styles.input_container}>
        <Text style={styles.text_label}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
        />
        <Text style={styles.text_label}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Ionicons name="arrow-forward" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
    marginTop: 50,
  },
  text_label: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: windowWidth - 50,
    marginBottom: 20,
  },
  input_container: {
    display: "flex",
    gap: 10,
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: Themes.colors.backgroundOrange,
    padding: 20,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  link: {
    marginTop: 20,
    color: Themes.colors.primary,
    fontFamily: "Inter-Regular",
    textDecorationLine: "underline",
  },
});
