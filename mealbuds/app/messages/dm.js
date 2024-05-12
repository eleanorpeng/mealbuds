import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { Themes } from "../../assets/Themes";
import { useNavigation } from "expo-router";

export default function Page() {
  const params = useLocalSearchParams();
  let { messages } = params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>hello</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.background,
    gap: 20,
  },
  header: {
    borderColor: "red",
    borderWidth: 1,
    flexDirection: "row",
    // alignContent: "center",
  },
});
