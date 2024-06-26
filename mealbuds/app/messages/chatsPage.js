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
import { db } from "../../context/firebase"; // Import firebase from the same directory
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
  startAt,
  endAt,
} from "firebase/firestore";
import storage from "../../data/storage";
import { AuthContext, AuthProvider } from "../../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Redirect } from "expo-router";
import Unauthenticated from "../../components/unauthenticated";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatsPage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("mamma mia: ", currentUser);
  const [chatsData, setChatsData] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [uid, setUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const retrieveUserUid = async () => {
      try {
        const userUid = await storage.load({ key: "uid" });
        console.log("userUid: ", userUid);
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

        // WOrks
        const q = query(usersRef, where("userInfo.userId", "!=", userUid));

        console.log("QUERY:", q);

        // WORKS
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

          const sortedUsers = users.sort((a, b) => {
            if (
              a.userInfo.lastMessage.timestamp &&
              b.userInfo.lastMessage.timestamp
            ) {
              return (
                b.userInfo.lastMessage.timestamp.seconds -
                a.userInfo.lastMessage.timestamp.seconds
              );
            }
            return 0;
          });

          console.log("CHATSDATA:", users);
          setChatsData(users);
        });

        storage
          .getBatchData([{ key: "loggedIn" }, { key: "uid" }])
          .then((results) => {
            setIsLoggedIn(results[0]);
            setUid(results[1]);
          })
          .catch((err) => {
            console.log(err);
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
  }, [refresh, isLoggedIn, uid]);

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
    console.log("chat item:", item);

    // const getTime = (timestamp) => {
    //   if (timestamp) {
    //     const date = new Date(timestamp.seconds * 1000);
    //     return formatDistanceToNow(date, { addSuffix: true });
    //   }
    //   return "Just now";
    // };

    return (
      <Chat
        name={item.userInfo.name}
        profilePicUrl={item.userInfo.profilePicUrl}
        // time={getTime(item.date)}
        // lastMessage={item.lastMessage && item.lastMessage.input}
        messages={item.messages}
        uid={item.userInfo.userId}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AuthProvider>
        <View>
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
        </View>
      </AuthProvider>
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
