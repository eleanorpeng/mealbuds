import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Themes } from "../../assets/Themes";
import Profile from "../../components/profile";
import { useState, useEffect } from "react";
import storage from "../../data/storage";

import {
  router,
  Link,
  useLocalSearchParams,
  Stack,
  useNavigation,
} from "expo-router";
import Unauthenticated from "../../components/unauthenticated";

const hardcodedProfileData = {
  name: "James Landay",
  profilePicUrl:
    "https://pbs.twimg.com/profile_images/1258841358220972032/MzL1iXMN_400x400.jpg",
  major: "Computer Science",
  year: "Postdoc",
  interests: ["Teaching", "HCI", "design-thinking", "food", "jazz"],
  hobbies: [
    "Pickle ball",
    "trying new boba spots",
    "watching movies",
    "sunbathing",
  ],
  hometown: "Lansing, Michigan",
  diningHalls: ["Stern", "Wilbur", "Lakeside"],
};

const renderProfile = () => {
  return (
    <Profile
      name={hardcodedProfileData.name}
      profilePicUrl={hardcodedProfileData.profilePicUrl}
      major={hardcodedProfileData.major}
      year={hardcodedProfileData.year}
      interests={hardcodedProfileData.interests}
      hobbies={hardcodedProfileData.hobbies}
      hometown={hardcodedProfileData.hometown}
      diningHalls={hardcodedProfileData.diningHalls}
    />
  );
};

const ProfilePage = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    storage
      .load({ key: "user" })
      .then((result) => {
        setUid(result.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  return (
    <View style={styles.container}>
      {uid ? <Profile {...hardcodedProfileData} /> : <Unauthenticated />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
  },
});

export default ProfilePage;
