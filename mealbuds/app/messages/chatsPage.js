import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Themes } from "../../assets/Themes";
import Chat from "../../components/chat";

const hardCodedChatsData = [
  {
    name: "Aaron Cho",
    profilePicUrl:
      "https://media.licdn.com/dms/image/D5603AQFtUPv_B0NNTw/profile-displayphoto-shrink_200_200/0/1699481575573?e=2147483647&v=beta&t=pDsCuDe7xvEDUxnyMKuCdc9bxUgr84Q6mPeu61MO30k",
    time: "2min",
    thumbnailMessage: "What side of Wilbur?",
  },
  {
    name: "Nick Troccoli",
    profilePicUrl: "https://stanford.edu/~troccoli/headshot1.jpg",
    time: "4d",
    thumbnailMessage: "It was great meeting you!",
  },
  {
    name: "Jerry Cain",
    profilePicUrl:
      "https://pbs.twimg.com/profile_images/599266502269886464/A2cgh6gg_400x400.jpg",
    time: "2wk",
    thumbnailMessage: "Let's grab another meal som...",
  },
];

const renderChats = ({ item }) => {
  return (
    <Chat
      name={item.name}
      profilePicUrl={item.profilePicUrl}
      time={item.time}
      thumbnailMessage={item.thumbnailMessage}
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
