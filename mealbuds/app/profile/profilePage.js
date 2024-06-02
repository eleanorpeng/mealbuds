import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Themes } from "../../assets/Themes";
import Profile from "../../components/profile";
import { useState, useEffect } from "react";
import storage from "../../data/storage";
import Unauthenticated from "../../components/unauthenticated";
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

const ProfilePage = () => {
  const [uid, setUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const profilePicUrl =
    "https://pbs.twimg.com/profile_images/1258841358220972032/MzL1iXMN_400x400.jpg";
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [interests, setInterests] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [hometown, setHometown] = useState("");
  const [diningHalls, setDiningHalls] = useState("");
  const [refresh, setRefresh] = useState(false);
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
    storage
      .getBatchData([{ key: "loggedIn" }, { key: "uid" }])
      .then((results) => {
        setIsLoggedIn(results[0]);
        setUid(results[1]);
        console.log(results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    const user = auth.currentUser;
    if (uid) {
      // const docRef = doc(firestore, "users", user.uid);
      const docRef = doc(firestore, "users", uid);
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
          setRefresh(true);
        } else {
          console.log("No profile update found.");
        }
      });

      return () => unsubscribe();
    }
  }, [
    isLoggedIn,
    uid,
    refresh,
    name,
    major,
    year,
    interests,
    hobbies,
    hometown,
    diningHalls,
  ]);

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
