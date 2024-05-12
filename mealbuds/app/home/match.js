import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Images, Themes } from "../../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import MatchCard from "../../components/matchCard";
export default function Match() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Meal Bud is</Text>
      <MatchCard />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
  },
  header: {
    fontFamily: "Inter-Bold",
    fontSize: 25,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: Themes.colors.backgroundOrange,
  },
  buttonText: {
    color: Themes.colors.orange,
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
});
