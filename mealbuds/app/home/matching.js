import { View, StyleSheet, Image, Text } from "react-native";
import { Themes, Images } from "../../assets/Themes";
import { Stack } from "expo-router";

export default function Matching() {
  return (
    <View style={styles.container}>
      <View style={styles.match_container}>
        <Image style={styles.image} source={Images.matching}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  match_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});
