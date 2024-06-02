import { View, StyleSheet, Image, Text } from "react-native";
import { Themes, Images } from "../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Card(props) {
  return (
    <View style={[styles.card, styles.shadow]}>
      <View>
        <Image
          style={styles.profile_image}
          source={{
            uri: "https://c0.klipartz.com/pngpicture/753/432/gratis-png-perfil-de-usuario-2018-in-sight-conferencia-de-usuario-expo-negocio-predeterminado-negocio-thumbnail.png",
          }}
        />
      </View>
      <View style={styles.card_info_container}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.card_info_container}>
          <View style={styles.card_info}>
            <Ionicons
              name="location-sharp"
              size={28}
              color={Themes.colors.orange}
            />
            <Text>{props.dining}</Text>
          </View>
          <View style={styles.card_info}>
            <Ionicons
              name="calendar-clear"
              size={28}
              color={Themes.colors.orange}
            />
            <Text>{props.time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: Themes.colors.white,
    padding: 30,
    gap: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profile_image: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
  card_info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  card_info_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  card_right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
