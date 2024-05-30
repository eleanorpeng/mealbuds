import { Stack, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Themes, Images } from "../assets/Themes";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/firebase";
export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerStyle: { backgroundColor: Themes.colors.grayBackground },
        headerTitle: "MealBuds",
        headerShown: false,
        headerBackTitleStyle: {
          fontSize: 20,
          color: Themes.colors.orange,
          fontFamily: "Inter-Regular",
        },
        headerTintColor: Themes.colors.orange,
        tabBarActiveTintColor: Themes.colors.orange,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbox-ellipses" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
