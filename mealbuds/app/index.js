import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { Themes, Images } from "../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import Card from "../components/card";
import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

// SplashScreen.preventAutoHideAsync();
const windowWidth = Dimensions.get("window").width;

function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return <Redirect href="/home/homeDefault" />;
}

export default function Index() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
    padding: 20,
    gap: 30,
  },
  header: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: Themes.colors.backgroundOrange,
  },
  button_text: {
    fontFamily: "Inter-Bold",
    fontSize: 23,
    color: Themes.colors.orange,
  },
  toggle_container: {
    display: "flex",
    flexDirection: "row",
  },
  toggle_text: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: Themes.colors.orange,
  },
  toggle: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.backgroundOrange,
    padding: 12,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});
