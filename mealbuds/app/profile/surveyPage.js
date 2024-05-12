import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Themes } from "../../assets/Themes";
import Profile from "../../components/profile";
import {
  router,
  Link,
  useLocalSearchParams,
  Stack,
  useNavigation,
} from "expo-router";

export default function SurveyPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: Themes.colors.white,
          },
        }}
      />
      <Text>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
  },
});
