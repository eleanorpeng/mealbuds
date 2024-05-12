import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Themes, Images } from "../assets/Themes";

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
          // headerShown: false,
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
