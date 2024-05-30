import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import { Link, Redirect } from "expo-router";

export default function Unauthenticated() {
  const handleReturn = () => {
    <Redirect href="/home/homeDefault" />;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hmm... seems like you haven't login yet</Text>
      <Link href={{ pathname: "/" }} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Return to Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    gap: 30,
  },

  header: {
    fontFamily: "Inter-Bold",
    fontSize: 25,
    textAlign: "center",
  },
  text: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.backgroundOrange,
    padding: 16,
    borderRadius: 16,
  },
});
