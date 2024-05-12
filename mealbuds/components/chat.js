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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Chat = ({ name, profilePicUrl, time, thumbnailMessage, messages }) => {
  return (
    <View>
      <Link
        href={{
          pathname: "messages/dm",
          params: {
            messages: JSON.stringify(messages),
            name: name,
            profilePicUrl: profilePicUrl,
          },
        }}
        asChild
      >
        <TouchableOpacity style={styles.chatPreviewContainer}>
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
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Inter",
                }}
              >
                {time}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter",
              }}
            >
              {thumbnailMessage}
            </Text>
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
