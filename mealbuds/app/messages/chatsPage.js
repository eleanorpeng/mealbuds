import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Themes } from "../../assets/Themes";
import Chat from "../../components/chat";
import { firestore } from "./firebase"; // Import firebase from the same directory
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import storage from "../../data/storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatsPage = () => {
  const [chatsData, setChatsData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(firestore, "messages"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatsData(chats);
    });

    return () => unsubscribe();
  }, []);

  const onMessageSend = async () => {
    const storedData = await storage.load({ key: "name" });
    const username = String(storedData.name);
    if (input.trim() !== "") {
      await addDoc(collection(firestore, "messages"), {
        username: username, // Placeholder for user name
        profilePicUrl: "https://example.com/default-profile-pic.jpg", // Placeholder profile picture URL
        message: input,
        timestamp: serverTimestamp(),
      });
      setInput("");
    }
  };

  const renderChats = ({ item }) => {
    return (
      <Chat
        name={item.username}
        profilePicUrl={item.profilePicUrl}
        time={
          item.timestamp
            ? new Date(item.timestamp.seconds * 1000).toLocaleString()
            : "Just now"
        }
        thumbnailMessage={item.message}
        messages={item.message}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Inter-Bold",
          paddingLeft: 24,
          paddingTop: 8,
        }}
      >
        Messages
      </Text>
      <FlatList
        data={chatsData}
        renderItem={renderChats}
        keyExtractor={(item) => item.id}
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
            <Text style={{ color: "blue" }}>Send</Text>
          ) : (
            <Text style={{ color: "gray" }}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: Themes.colors.grayBackground,
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

export default ChatsPage;

/*import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Themes } from "../../assets/Themes";
import Chat from "../../components/chat";

const hardCodedChatsData = [
  {
    name: "Aaron Cho",
    profilePicUrl:
      "https://media.licdn.com/dms/image/D5603AQFtUPv_B0NNTw/profile-displayphoto-shrink_200_200/0/1699481575573?e=2147483647&v=beta&t=pDsCuDe7xvEDUxnyMKuCdc9bxUgr84Q6mPeu61MO30k",
    time: "2min",
    thumbnailMessage: "What side of Wilbur?",
    messages: [],
  },
  {
    name: "Nick Troccoli",
    profilePicUrl: "https://stanford.edu/~troccoli/headshot1.jpg",
    time: "4d",
    thumbnailMessage: "It was great meeting you!",
    messages: [],
  },
  {
    name: "Jerry Cain",
    profilePicUrl:
      "https://pbs.twimg.com/profile_images/599266502269886464/A2cgh6gg_400x400.jpg",
    time: "2wk",
    thumbnailMessage: "Let's grab another meal som...",
    messages: [],
  },
];

const renderChats = ({ item }) => {
  return (
    <Chat
      name={item.name}
      profilePicUrl={item.profilePicUrl}
      time={item.time}
      thumbnailMessage={item.thumbnailMessage}
      messages={item.messages}
    />
  );
};

const ChatsPage = (chatsData) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Inter-Bold",
          paddingLeft: 24,
          paddingTop: 8,
        }}
      >
        Messages
      </Text>
      <FlatList
        data={hardCodedChatsData}
        renderItem={renderChats}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: Themes.colors.grayBackground,
  },
});

export default ChatsPage;
*/
