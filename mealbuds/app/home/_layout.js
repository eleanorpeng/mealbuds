import { Stack } from "expo-router";
import { Themes } from "../../assets/Themes";
import { AuthProvider } from "../../context/AuthContext";

export default function HomeLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            fontSize: 20,
            backgroundColor: Themes.colors.grayBackground,
          },
          headerTitle: "MealBuds",
          headerBackTitle: "Back",
          headerTitleStyle: {
            fontSize: 20,
            color: Themes.colors.orange,
            fontFamily: "Inter-Regular",
          },
          headerBackTitleStyle: {
            fontSize: 18,
            color: Themes.colors.orange,
            fontFamily: "Inter-Regular",
          },
          headerTintColor: Themes.colors.orange,
          tabBarActiveTintColor: Themes.colors.orange,
        }}
      ></Stack>
    </AuthProvider>
  );
}
