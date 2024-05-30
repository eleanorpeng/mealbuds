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

const windowWidth = Dimensions.get("window").width;

export default function Onboarding(props, { navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        props.storeName(email);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login to MealBuds</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Ionicons name="arrow-forward" size={24} color="black" />
      </TouchableOpacity>
      <Link href={{ pathname: "home/SignUp" }} asChild>
        <TouchableOpacity>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </Link>
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

/*import { useState } from "react";
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
*/
