import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Themes } from "../../assets/Themes";
import Profile from "../../components/profile";
import {
  router,
  Link,
  useLocalSearchParams,
  Stack,
  useNavigation,
} from "expo-router";
import { useState, useEffect, useContext } from "react";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function AvailabilityPage() {
  const [BStartText, onChangeBStartText] = useState("Ex: 8 AM");
  const [BEndText, onChangeBEndText] = useState("Ex: 9:30 AM");
  const [LStartText, onChangeLStartText] = useState("Ex: 11:30 AM");
  const [LEndText, onChangeLEndText] = useState("Ex: 12:30 PM");
  const [DStartText, onChangeDStartText] = useState("Ex: 5 PM");
  const [DEndText, onChangeDEndText] = useState("Ex: 8 PM");

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Edit Availability",
          headerStyle: {
            backgroundColor: Themes.colors.white,
          },
        }}
      />
      <View>
        <Text style={styles.titleText}>When are you free this week?</Text>
        <Text style={styles.dayText}>Monday, May 13th</Text>
      </View>
      <View>
        <Text style={styles.mealText}>Breakfast</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.startText}>Start</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={onChangeBStartText}
            value={BStartText}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.EndText}>End</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={onChangeBEndText}
            value={BEndText}
          />
        </View>
      </View>
      <View>
        <Text style={styles.mealText}>Lunch</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.startText}>Start</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={onChangeLStartText}
            value={LStartText}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.EndText}>End</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={onChangeLEndText}
            value={LEndText}
          />
        </View>
      </View>
      <View>
        <Text style={styles.mealText}>Dinner</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.startText}>Start</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={onChangeDStartText}
            value={DStartText}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.EndText}>End</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={onChangeDEndText}
            value={DEndText}
          />
        </View>
      </View>
      <View style={styles.next}>
        <Link
          href={{
            pathname: "profile/profilePage",
          }}
          asChild
        >
          <TouchableOpacity style={styles.nextButton}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter-Bold",
                alignSelf: "center",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
    //justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },
  dayText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    padding: 20,
    color: Themes.colors.orange,
  },
  mealText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    paddingLeft: 20,
  },
  startText: {
    fontSize: 18,
    fontFamily: "Inter",
    paddingLeft: 20,
  },
  EndText: {
    fontSize: 18,
    fontFamily: "Inter",
    paddingLeft: 20,
    paddingRight: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    //borderWidth: 5,
  },
  textBox: {
    height: 40,
    width: "75%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Themes.colors.orange,
    color: Themes.colors.gray,
  },
  next: {
    alignItems: "center",
    padding: 15,
  },
  nextButton: {
    backgroundColor: Themes.colors.midOrange,
    borderRadius: "50%",
    paddingHorizontal: 12,
    justifyContent: "center",
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
  },
});
