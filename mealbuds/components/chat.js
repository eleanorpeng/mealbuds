import {
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Images, Themes } from "../assets/Themes";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";
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
} from "firebase/firestore";
import { db } from "../context/firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Chat = ({ name, profilePicUrl, messages, uid }) => {
  const { currentUser } = useContext(AuthContext);

  const onChatPress = async () => {
    console.log("CurrentUser:", currentUser);
    console.log("User:", uid);

    const combinedId =
      currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;

    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      // await updateDoc(doc(db, "userChats", currentUser.uid), {
      //   [combinedId + ".userInfo"]: {
      //     uid: uid,
      //     displayName: name,
      //     photoUrl: profilePicUrl,
      //   },
      //   [combinedId + ".date"]: serverTimestamp(),
      // });

      // await updateDoc(doc(db, "userChats", uid), {
      //   [combinedId + ".userInfo"]: {
      //     uid: currentUser.uid,
      //     displayName: currentUser.displayName,
      //     photoUrl: currentUser.photoUrl,
      //   },
      //   [combinedId + ".date"]: serverTimestamp(),
      // });
    }
  };
  return (
    <View>
      <Link
        href={{
          pathname: "messages/dm",
          params: {
            messages: JSON.stringify(messages),
            name: name,
            profilePicUrl: profilePicUrl,
            uid: uid,
          },
        }}
        asChild
      >
        <TouchableOpacity
          style={styles.chatPreviewContainer}
          onPress={onChatPress}
        >
          <Image
            style={styles.profilePic}
            source={{
              uri: profilePicUrl,
            }}
          />
          <View style={styles.nameThumbnailTimeContainer}>
            <View style={styles.nameTimeRow}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter-Bold",
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  chatPreviewContainer: {
    height: windowHeight * 0.1,
    flexDirection: "row",
    paddingLeft: 24,
    alignItems: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  profilePic: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    marginRight: 32,
  },
  nameThumbnailTimeContainer: {
    flexDirection: "column",
    flex: 1,
    height: "90%",
    justifyContent: "space-evenly",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  nameTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 24,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  separator: {
    height: 1, // Adjust the height as needed
    // borderColor: "black",
    // borderWidth: 1,
    backgroundColor: Themes.colors.gray,
    marginHorizontal: 24, // Adjust the margins as needed
  },
});

export default Chat;
