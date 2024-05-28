import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { firestore, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Messaging({ route }) {
  const { userId } = route.params;
  const [input, setInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return unsubscribe;
  }, []);

  const onMessageSend = async () => {
    if (input.trim() !== "") {
      const user = auth.currentUser;
      await addDoc(collection(firestore, "messages"), {
        userId: user.uid,
        username: user.email,
        profilePicUrl: "https://example.com/default-profile-pic.jpg", // Replace with actual profile picture URL
        message: input,
        timestamp: new Date(),
      });
      setInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allMessages}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Image
              style={styles.profilePic}
              source={{ uri: item.profilePicUrl }}
            />
            <View>
              <Text style={styles.username}>{item.username}</Text>
              <Text>{item.message}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp.seconds * 1000).toLocaleString()}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  message: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  profilePic: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    marginBottom: 4,
  },
  username: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
  },
  composer: {
    backgroundColor: "#f0efed",
    height: windowHeight * 0.06,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderRadius: "20%",
    flexDirection: "row",
  },
  input: {
    width: "92%",
  },
  send: {
    marginLeft: 8,
  },
});
