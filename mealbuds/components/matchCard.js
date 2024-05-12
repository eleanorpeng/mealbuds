import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Images, Themes } from "../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MatchInfo = (title, description) => {
  return (
    <View style={styles.match_container}>
      <Text style={styles.match_title}>{title}</Text>
      <Text style={styles.match_description}>{description}</Text>
    </View>
  );
};

export default function MatchCard() {
  const matchingInfo = [
    { title: "Common Interests", description: "Education" },
  ];
  return (
    <ScrollView style={styles.shadow}>
      <View style={[styles.card, styles.shadow]}>
        <Image style={styles.image} source={Images.michael}></Image>
        <Text style={styles.name}>Michael Bernstein</Text>

        <View style={styles.meal_info_container}>
          <View style={styles.date}>
            <Text style={styles.date_text}>14</Text>
            <Text style={styles.date_text}>May</Text>
          </View>
          <View style={styles.info_container}>
            <View style={styles.info}>
              <Ionicons
                name="location-sharp"
                size={28}
                color={Themes.colors.orange}
              />
              <Text style={styles.info_text}>Arrillaga Dining</Text>
            </View>
            <View style={styles.info}>
              <Ionicons
                name="time-outline"
                size={28}
                color={Themes.colors.orange}
              />
              <Text style={styles.info_text}>6:00PM, Tue</Text>
            </View>
          </View>
        </View>
        <View style={styles.match_main}>
          <View style={styles.match_container}>
            <View style={styles.match_title_container}>
              <Text style={styles.match_title}>Common Interests</Text>
            </View>
            <Text style={styles.match_description}>
              Education, food, social computing
            </Text>
          </View>
          <View style={styles.match_container}>
            <View style={styles.match_title_container}>
              <Text style={styles.match_title}>Major</Text>
            </View>
            <Text style={styles.match_description}>Symbolic Systems</Text>
          </View>
          <View style={styles.match_container}>
            <View style={styles.match_title_container}>
              <Text style={styles.match_title}>Interests</Text>
            </View>
            <Text style={styles.match_description}>
              Traveling, food, photography, social computing, education
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    display: "flex",
    borderRadius: 16,
    backgroundColor: Themes.colors.white,
    // justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: Themes.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
    width: windowWidth - 40,
    // height: windowHeight - 100,
  },
  meal_info_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  name: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
  },
  date: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.backgroundOrange,
    borderRadius: 16,
    padding: 20,
  },
  date_text: {
    fontSize: 22,
    color: Themes.colors.orange,
    fontFamily: "Inter-Bold",
  },
  image: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  info_text: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },
  info_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  match_title: {
    padding: 10,
    color: "Black",
    fontFamily: "Inter-Regular",
    fontSize: 15,
  },
  match_description: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
  },
  match_container: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  match_title_container: {
    borderRadius: 30,
    backgroundColor: Themes.colors.backgroundOrange,
  },
  match_main: {
    display: "flex",
    gap: 20,
  },
});
