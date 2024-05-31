// Login.js
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import storage from "../data/storage";

const windowWidth = Dimensions.get("window").width;

export default function Login(props, { navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        storage.save({ key: "loggedIn", data: true });
        storage.save({ key: "uid", data: user.uid });
        props.setIsLoggedIn(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login to MealBuds</Text>
      <View style={styles.main_container}>
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
        <View style={styles.login_container}></View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text_label}>Login</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Link href={{ pathname: "home/SignUp" }} asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
    padding: 40,
  },
  text: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  text_label: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
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
    justifyContent: "center",
  },
  button: {
    backgroundColor: Themes.colors.backgroundOrange,
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 16,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
  login_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 30,
  },
});
