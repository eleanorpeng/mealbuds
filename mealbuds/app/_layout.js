import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Themes, Images } from "../assets/Themes";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Link, useRouter } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

export default function Layout() {
  // const { currentUser } = useContext(AuthContext);
  // const router = useRouter();

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     router.push("home/SignUp");
  //     return null;
  //   }
  //   return children;
  // };
  return (
    // <ProtectedRoute>
    <AuthProvider>
      <ChatContextProvider>
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
      </ChatContextProvider>
      {/* // </ProtectedRoute> */}
    </AuthProvider>
  );
}
