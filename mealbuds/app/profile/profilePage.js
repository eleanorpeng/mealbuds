import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Themes } from "../../assets/Themes";
import Profile from "../../components/profile";

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
  return (
    <View style={styles.container}>
      <Profile {...hardcodedProfileData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.backgroundOrange,
  },
});

export default ProfilePage;
