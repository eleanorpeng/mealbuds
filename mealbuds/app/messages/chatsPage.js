import React, { useEffect, useState, useContext } from "react";
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
import { db } from "../firebase"; // Import firebase from the same directory
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
  undefined,
} from "firebase/firestore";
import storage from "../../data/storage";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { formatDistanceToNow } from "date-fns";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatsPage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("mamma mia: ", currentUser);
  const [chatsData, setChatsData] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const retrieveUserUid = async () => {
      try {
        const userUid = await storage.load({ key: "uid" });
        return userUid;
      } catch (error) {
        console.error("Error retrieving user data:", error);
        return null;
      }
    };

    const fetchData = async () => {
      const userUid = await retrieveUserUid();
      console.log("userUid:", userUid);

      if (userUid) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userInfo.userId", "!=", userUid));
        console.log("QUERY:", q);
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const users = snapshot.docs
            .map((doc) => {
              const data = doc.data();
              if (data.userInfo && data.userInfo.lastMessage !== undefined) {
                return { id: doc.id, ...data };
              }
              return null;
            })
            .filter((user) => user !== null);

          console.log("CHATSDATA:", users);
          setChatsData(users);
        });

        return () => unsubscribe();
      } else {
        console.log("User data not found");
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setRefresh((prev) => !prev);
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  const renderChats = ({ item }) => {
    console.log("chat item:", item);

    const getTime = (timestamp) => {
      if (timestamp) {
        const date = new Date(timestamp.seconds * 1000);
        return formatDistanceToNow(date, { addSuffix: true });
      }
      return "Just now";
    };

    return (
      <Chat
        name={item.userInfo.name}
        profilePicUrl={item.userInfo.profilePicUrl}
        time={getTime(item.date)}
        lastMessage={item.lastMessage && item.lastMessage.input}
        messages={item.messages}
        uid={item.userInfo.userId}
      />
    );
  };

  return (
    <AuthProvider>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter-Bold",
            paddingLeft: 24,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          Messages
        </Text>
        <FlatList
          data={chatsData}
          renderItem={renderChats}
          keyExtractor={(item) => item.id}
        />
      </View>
    </AuthProvider>
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
