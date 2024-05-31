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
import { Link, useLocalSearchParams } from "expo-router";
import {
  convertTime,
  capitalize,
  getDay,
  getMonth,
  getDayOfWeek,
  getTime,
} from "../../assets/utilities";

export default function Match(props) {
  const params = useLocalSearchParams();
  const matchDataJSON = params.matchData ? JSON.parse(params.matchData) : null;

  const matchData = {
    common_interests: capitalize(matchDataJSON.common_interests.join(", ")),
    match_name: matchDataJSON.match_name,
    day: getDay(matchDataJSON.time.seconds),
    month: getMonth(matchDataJSON.time.seconds),
    major: matchDataJSON.major,
    interests: capitalize(matchDataJSON.interests.join(", ")),
    dining_hall: matchDataJSON.dining_hall,
    time: getTime(matchDataJSON.time.seconds),
    dayOfWeek: getDayOfWeek(matchDataJSON.time.seconds),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Meal Bud is</Text>
      <MatchCard match={matchData} />
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
