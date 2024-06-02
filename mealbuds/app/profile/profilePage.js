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
import { firestore, auth } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

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
  const [name, setName] = useState("");
  const profilePicUrl =
    "https://pbs.twimg.com/profile_images/1258841358220972032/MzL1iXMN_400x400.jpg";
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [interests, setInterests] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [hometown, setHometown] = useState("");
  const [diningHalls, setDiningHalls] = useState("");
  var selectedYearLabel = "";
  var selectedDiningHalls = [];
  /*
  useEffect(() => {
    console.log("hello");
    const user = auth.currentUser;
    const updateProfile = async () => {
      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        for (var i = 0; i < data.year.length; i++) {
          if (data.year[i].checked) {
            selectedYearLabel = data.year[i].label;
            break;
          }
        }
        for (var i = 0; i < data.dining_halls.length; i++) {
          if (data.dining_halls[i].checked) {
            selectedDiningHalls.push(data.dining_halls[i].label);
          }
        }
        setName(data.name);
        setMajor(data.major);
        setYear(selectedYearLabel);
        setInterests("");
        setHobbies(data.hobbies);
        setHometown(data.hometown);
        setDiningHalls(selectedDiningHalls.join(", "));
      } else {
        console.log("No profile update found.");
      }
    };
    updateProfile();
  }, []);*/

  useEffect(() => {
    console.log("hello");
    const user = auth.currentUser;
    const docRef = doc(firestore, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists) {
        const data = doc.data();
        for (var i = 0; i < data.year.length; i++) {
          if (data.year[i].checked) {
            selectedYearLabel = data.year[i].label;
            break;
          }
        }
        for (var i = 0; i < data.dining_halls.length; i++) {
          if (data.dining_halls[i].checked) {
            selectedDiningHalls.push(data.dining_halls[i].label);
          }
        }
        setName(data.name);
        setMajor(data.major);
        setYear(selectedYearLabel);
        setInterests("");
        setHobbies(data.hobbies);
        setHometown(data.hometown);
        setDiningHalls(selectedDiningHalls.join(", "));
      } else {
        console.log("No profile update found.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Profile
        name={name}
        profilePicUrl={profilePicUrl}
        major={major}
        year={year}
        interests={interests}
        hobbies={hobbies}
        hometown={hometown}
        diningHalls={diningHalls}
      />
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
