// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAaM4ZMtwijYFenx5amCDo-SyJewXaT2Yk",
  authDomain: "cs278mealbudge.firebaseapp.com",
  projectId: "cs278mealbudge",
  storageBucket: "cs278mealbudge.appspot.com",
  messagingSenderId: "641438036615",
  appId: "1:641438036615:ios:ae4ea9ea4f11a3d6a53e22",
};

const app = initializeApp(firebaseConfig);

import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { Themes } from "../../assets/Themes";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const params = useLocalSearchParams();
  let { messages, name, profilePicUrl } = params;

  const [input, setInput] = useState("");
  const [allMessages, setAllMessages] = useState(messages);

  const onMessageSend = () => {
    if (input.trim() !== "") {
      const newMessage = {
        username: "James Landay",
        profilePicUrl:
          "https://pbs.twimg.com/profile_images/1258841358220972032/MzL1iXMN_400x400.jpg",
        message: input,
        timestamp: "Now",
      };
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Image
          style={styles.profilePic}
          source={{
            uri: profilePicUrl,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter-Bold",
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)}
          value={input}
          fontFamily="Inter"
          placeholder="Send a message..."
          placeholderTextColor="rgba(34, 65, 89, .5)"
        />
        <TouchableOpacity style={styles.send} onPress={onMessageSend}>
          {input.trim() !== "" ? (
            <FontAwesome name="send" size={20} color="black" />
          ) : (
            <FontAwesome name="send" size={20} color="#C4C4C4" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
    justifyContent: "space-between",
  },
  header: {
    paddingTop: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  profilePic: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    marginBottom: 4,
  },
  composer: {
    backgroundColor: "#f0efed",
    height: windowHeight * 0.06,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderRadius: "20%",
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 1,
  },
  input: {
    width: "92%",
  },
});
