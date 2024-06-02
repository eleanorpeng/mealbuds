// SignUp1.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Themes } from "../../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "../firebase"; // Ensure this is the correct path to your firebase.js
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useRouter } from "expo-router";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import storage from "../../data/storage";

const windowWidth = Dimensions.get("window").width;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid;
        const userData = { name: name, uid: userId };
        storage.save({ key: "user", data: userData });
        // Add the email to the "users" collection in Firestore
        await setDoc(doc(db, "users", userId), {
          userInfo: {
            userId: userId,
            email: email,
            name: name,
            lastMessage: {
              input: "",
              timestamp: serverTimestamp(),
            },
            profilePicUrl:
              "https://c0.klipartz.com/pngpicture/753/432/gratis-png-perfil-de-usuario-2018-in-sight-conferencia-de-usuario-expo-negocio-predeterminado-negocio-thumbnail.png",
          },
        });

        // WORKS
        // await setDoc(doc(db, "userChats", userId), {
        //   userInfo: {
        //     userId: userId,
        //     email: email,
        //     name: name,
        //     messages: [],
        //     lastMessage: {
        //       input: "",
        //       timestamp: serverTimestamp(),
        //     },
        //     profilePicUrl:
        //       "https://c0.klipartz.com/pngpicture/753/432/gratis-png-perfil-de-usuario-2018-in-sight-conferencia-de-usuario-expo-negocio-predeterminado-negocio-thumbnail.png",
        //     // Add any other user fields you want to store here
        //   },
        // });

        //TEST
        await setDoc(doc(db, "chats", userId), {
          userInfo: {
            userId: userId,
            email: email,
            name: name,
            messages: [],
            lastMessage: {
              input: "",
              timestamp: serverTimestamp(),
            },
            profilePicUrl:
              "https://c0.klipartz.com/pngpicture/753/432/gratis-png-perfil-de-usuario-2018-in-sight-conferencia-de-usuario-expo-negocio-predeterminado-negocio-thumbnail.png",
            // Add any other user fields you want to store here
          },
        });
        router.push("home/homeDefault"); // Navigate to the home page after successful sign-up
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up for MealBuds</Text>
      <View style={styles.main_container}>
        <View style={styles.input_container}>
          <Text style={styles.text_label}>Name</Text>
          <TextInput
            onChangeText={setName}
            placeholder="Enter your name"
            style={styles.input}
          />
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
        <View style={styles.signup_container}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.text_label}>Sign Up</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Link href={{ pathname: "home/homeDefault" }} asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
    backgroundColor: Themes.colors.grayBackground,
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
  signup_container: {
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
