import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Themes, Images } from "../../assets/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import Card from "../../components/card";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import Login from "../../components/Login";
import storage from "../../data/storage";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";

// import { firestore } from "./firebase";

// SplashScreen.preventAutoHideAsync();
const windowWidth = Dimensions.get("window").width;

export default function HomeDefault() {
  const [onUpcoming, setOnUpcoming] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [uid, setUid] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const storeName = (name) => {
    storage.save({ key: "name", data: { name: name } });
    setHasOnboarded(true);
    setName(name);
  };

  const handleLogoutPressed = () => {
    // console.log(matchData);
    signOut(auth)
      .then(() => {
        storage.save({ key: "loggedIn", data: false });
        setIsLoggedIn(false);
        console.log("sign out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const convertTime = (seconds) => {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const padZero = (num) => (num < 10 ? "0" + num : num); // Helper function to pad single digit numbers with a leading zero

    const month = padZero(date.getMonth() + 1); // Months are zero-based
    const day = padZero(date.getDate());
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const initialSetup = async () => {
      storage
        .getBatchData([{ key: "loggedIn" }, { key: "uid" }])
        .then((results) => {
          setIsLoggedIn(results[0]);
          setUid(results[1]);
          const queryMatch = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists) {
              setMatchData(docSnap.data().match);
              setName(docSnap.data().name);
            } else {
              console.log("No match found.");
            }
          };
          queryMatch();
        })
        .catch((err) => console.log(err));
    };
    initialSetup();
  }, [uid, isLoggedIn]);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={styles.container}>
          <Text style={styles.header}>Welcome back, {name}</Text>
          <View style={[styles.toggle_container, styles.shadow]}>
            <TouchableOpacity
              style={[
                styles.toggle,
                {
                  borderBottomLeftRadius: 12,
                  borderTopLeftRadius: 12,
                  backgroundColor: onUpcoming
                    ? Themes.colors.backgroundOrange
                    : Themes.colors.lightGray,
                },
              ]}
              onPress={() => setOnUpcoming(true)}
            >
              <Text
                style={[
                  styles.toggle_text,
                  {
                    color: onUpcoming
                      ? Themes.colors.orange
                      : Themes.colors.gray,
                  },
                ]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggle,
                {
                  borderBottomRightRadius: 12,
                  borderTopRightRadius: 12,
                  backgroundColor: !onUpcoming
                    ? Themes.colors.backgroundOrange
                    : Themes.colors.lightGray,
                },
              ]}
              onPress={() => setOnUpcoming(false)}
            >
              <Text
                style={[
                  styles.toggle_text,
                  {
                    color: !onUpcoming
                      ? Themes.colors.orange
                      : Themes.colors.gray,
                  },
                ]}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.header}>
            {onUpcoming ? "Upcoming" : "Past"} Meals
          </Text>
          {matchData && onUpcoming ? (
            <Card
              name={matchData.match_name}
              profile_img={Images.michael}
              dining={matchData.dining_hall}
              time={convertTime(matchData.time.seconds)}
            />
          ) : null}

          {onUpcoming ? (
            <Link
              href={{
                pathname: "home/matching",
                params: {
                  matchData: matchData ? JSON.stringify(matchData) : null,
                },
              }}
              asChild
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.button_text}>Find New Match</Text>
              </TouchableOpacity>
            </Link>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleLogoutPressed}>
            <Text style={styles.button_text}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
    padding: 20,
    gap: 30,
  },
  header: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: Themes.colors.backgroundOrange,
  },
  button_text: {
    fontFamily: "Inter-Bold",
    fontSize: 23,
    color: Themes.colors.orange,
  },
  toggle_container: {
    display: "flex",
    flexDirection: "row",
  },
  toggle_text: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: Themes.colors.orange,
  },
  toggle: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Themes.colors.backgroundOrange,
    padding: 12,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});
