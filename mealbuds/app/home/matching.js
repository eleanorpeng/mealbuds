import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Themes, Images } from "../../assets/Themes";
import { Link, Stack } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function Matching() {
  return (
    <View style={styles.container}>
      <View style={styles.match_container}>
        <Image style={styles.image} source={Images.matching}></Image>
        <Text style={styles.text}>Matching with a meal bud...</Text>
        <Link href={{ pathname: "home/match" }} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>View Match</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  match_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: windowWidth / 2,
    height: windowWidth / 2,
  },
  text: {
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    backgroundColor: Themes.colors.backgroundOrange,
  },
});
