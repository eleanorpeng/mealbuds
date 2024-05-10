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
import { useCallback } from "react";
import { Themes, Images } from "../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import Card from "../components/card";
// SplashScreen.preventAutoHideAsync();
const windowWidth = Dimensions.get("window").width;

export default function App() {
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
  return (
    <View style={styles.container}>
      <View style={[styles.toggle_container, styles.shadow]}>
        <TouchableOpacity
          style={[
            styles.toggle,
            { borderBottomLeftRadius: 12, borderTopLeftRadius: 12 },
          ]}
        >
          <Text style={styles.toggle_text}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggle,
            {
              borderBottomRightRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: Themes.colors.lightGray,
            },
          ]}
        >
          <Text style={[styles.toggle_text, { color: Themes.colors.gray }]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Upcoming Meals</Text>
      <Card
        name="Michael Bernstein"
        profile_img={Images.michael}
        dining="Arrillaga Dining"
        time="5/14 6:00PM"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.button_text}>Find New Match</Text>
      </TouchableOpacity>
    </View>
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
