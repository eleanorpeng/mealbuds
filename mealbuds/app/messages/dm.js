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
  FlatList,
} from "react-native";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { Themes } from "../../assets/Themes";
import { useNavigation } from "expo-router";
import { useState, useContext, useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../context/firebase";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext, AuthProvider } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const params = useLocalSearchParams();
  let { messages, name, profilePicUrl, uid } = params;
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const flatListRef = useRef(null);

  const combinedId =
    currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;

  console.log("combinedID:", combinedId);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      if (doc.exists()) {
        setChatHistory(doc.data().messages || []);
      }
    });
    return () => unsubscribe();
  }, [currentUser, uid, combinedId]);

  const onMessageSend = async () => {
    const messageId = uuid.v4();

    const newMessage = {
      id: messageId,
      input,
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };

    console.log(currentUser.uid);
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      messages: arrayUnion(newMessage),
      lastMessage: {
        input,
      },
      date: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", uid), {
      messages: arrayUnion(newMessage),
      lastMessage: {
        input,
      },
      date: serverTimestamp(),
    });

    await updateDoc(doc(db, "users", currentUser.uid), {
      lastMessage: {
        input,
      },
      date: serverTimestamp(),
    });

    await updateDoc(doc(db, "users", uid), {
      lastMessage: {
        input,
      },
      date: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", combinedId), {
      messages: arrayUnion(newMessage),
    });

    setInput("");
    console.log("chatHistory:", chatHistory);
  };

  const renderMessage = ({ item }) => {
    console.log("Rendering message:", item);
    const isCurrentUser = item.senderId === currentUser.uid;
    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.input}</Text>
      </View>
    );
  };

  return (
    <AuthProvider>
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
        <FlatList
          ref={flatListRef}
          data={chatHistory}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
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
    </AuthProvider>
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
  currentUserMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: "10%",
    marginTop: 2,
    marginBottom: 2,
  },
  otherUserMessage: {
    backgroundColor: Themes.colors.gray,
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: "10%",
    marginTop: 2,
    marginBottom: 2,
  },
  messageText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
});
