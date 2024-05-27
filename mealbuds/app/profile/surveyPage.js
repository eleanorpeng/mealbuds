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

export default function SurveyPage() {
  const [hometownText, onChangeHometownText] = useState("Hometown...");
  const [majorText, onChangeMajorText] = useState("Major...");
  const [hobbiesText, onChangeHobbiesText] = useState("Hobbies...");
  const [dietaryText, onChangeDietaryText] = useState(
    "Vegetarian, vegan, etc..."
  );

  const [yearCheckboxes, setYearCheckboxes] = useState([
    { id: 1, label: "Freshman", checked: false },
    { id: 2, label: "Sophomore", checked: false },
    { id: 3, label: "Junior", checked: false },
    { id: 4, label: "Senior", checked: false },
    { id: 5, label: "Grad Student", checked: false },
  ]);
  const [hallCheckboxes, setHallCheckboxes] = useState([
    { id: 1, label: "Wilbur", checked: false },
    { id: 2, label: "Stern", checked: false },
    { id: 3, label: "Arillaga", checked: false },
    { id: 4, label: "Flomo", checked: false },
    { id: 5, label: "Lakeside", checked: false },
    { id: 6, label: "Ricker", checked: false },
  ]);

  const [yapRanking, setYapRanking] = useState([
    { id: 1, label: "1", checked: false },
    { id: 2, label: "2", checked: false },
    { id: 3, label: "3", checked: false },
    { id: 4, label: "4", checked: false },
    { id: 5, label: "5", checked: false },
  ]);
  const [indoorRanking, setIndoorRanking] = useState([
    { id: 1, label: "1", checked: false },
    { id: 2, label: "2", checked: false },
    { id: 3, label: "3", checked: false },
    { id: 4, label: "4", checked: false },
    { id: 5, label: "5", checked: false },
  ]);
  const [nightRanking, setNightRanking] = useState([
    { id: 1, label: "1", checked: false },
    { id: 2, label: "2", checked: false },
    { id: 3, label: "3", checked: false },
    { id: 4, label: "4", checked: false },
    { id: 5, label: "5", checked: false },
  ]);
  const [planRanking, setPlanRanking] = useState([
    { id: 1, label: "1", checked: false },
    { id: 2, label: "2", checked: false },
    { id: 3, label: "3", checked: false },
    { id: 4, label: "4", checked: false },
    { id: 5, label: "5", checked: false },
  ]);
  const [bookRanking, setBookRanking] = useState([
    { id: 1, label: "1", checked: false },
    { id: 2, label: "2", checked: false },
    { id: 3, label: "3", checked: false },
    { id: 4, label: "4", checked: false },
    { id: 5, label: "5", checked: false },
  ]);
  const [eatRanking, setEatRanking] = useState([
    { id: 1, label: "1", checked: false },
    { id: 2, label: "2", checked: false },
    { id: 3, label: "3", checked: false },
    { id: 4, label: "4", checked: false },
    { id: 5, label: "5", checked: false },
  ]);

  const toggleYearCheckbox = (id) => {
    setYearCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const toggleHallCheckbox = (id) => {
    setHallCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const toggleYapRanking = (id) => {
    setYapRanking((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };
  const toggleIndoorRanking = (id) => {
    setIndoorRanking((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };
  const toggleNightRanking = (id) => {
    setNightRanking((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };
  const togglePlanRanking = (id) => {
    setPlanRanking((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };
  const toggleBookRanking = (id) => {
    setBookRanking((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };
  const toggleEatRanking = (id) => {
    setEatRanking((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: Themes.colors.white,
          },
        }}
      />
      <Text style={styles.titleText}>Compatibility Survey</Text>
      <ScrollView style={styles.scrollStyle}>
        <Text style={styles.questionText}>Where are you from?</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={onChangeHometownText}
          value={hometownText}
        />
        <Text style={styles.questionText}>What year are you?</Text>
        <View style={{ alignItems: "center" }}>
          {yearCheckboxes.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.checkbox, checkbox.checked && styles.checked]}
              onPress={() => toggleYearCheckbox(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.questionText}>What's your major?</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={onChangeMajorText}
          value={majorText}
        />
        <Text style={styles.questionText}>What are your hobbies?</Text>
        <TextInput
          style={styles.textBox}
          onChangeText={onChangeHobbiesText}
          value={hobbiesText}
        />
        <Text style={styles.questionText}>
          Answer the following questions by choosing a number from 1 to 5.
        </Text>
        <Text style={styles.rankingText}>How much of a yapper are you?</Text>
        <View style={styles.rankingOptions}>
          {yapRanking.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.rankingBox, checkbox.checked && styles.checked]}
              onPress={() => toggleYapRanking(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.rankingText}>
          Are you more of an indoor (1) or outdoor (5) person?
        </Text>
        <View style={styles.rankingOptions}>
          {indoorRanking.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.rankingBox, checkbox.checked && styles.checked]}
              onPress={() => toggleIndoorRanking(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.rankingText}>
          Do you prefer a chill night in (1) or a crazy night out (5)?
        </Text>
        <View style={styles.rankingOptions}>
          {nightRanking.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.rankingBox, checkbox.checked && styles.checked]}
              onPress={() => toggleNightRanking(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.rankingText}>
          Are you more of a planner (1) or more spontaneous (5)?
        </Text>
        <View style={styles.rankingOptions}>
          {planRanking.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.rankingBox, checkbox.checked && styles.checked]}
              onPress={() => togglePlanRanking(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.rankingText}>
          Would you rather read a book (1) or play a video game (5)?
        </Text>
        <View style={styles.rankingOptions}>
          {bookRanking.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.rankingBox, checkbox.checked && styles.checked]}
              onPress={() => toggleBookRanking(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.rankingText}>
          Do you live to eat (1) or eat to live (5)?
        </Text>
        <View style={styles.rankingOptions}>
          {eatRanking.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.rankingBox, checkbox.checked && styles.checked]}
              onPress={() => toggleEatRanking(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.questionText}>
          List any dietary restrictions you have.
        </Text>
        <TextInput
          style={styles.textBox}
          onChangeText={onChangeDietaryText}
          value={dietaryText}
        />
        <Text style={styles.questionText}>
          Select your preferred dining halls.
        </Text>
        <View style={{ alignItems: "center", paddingBottom: 10 }}>
          {hallCheckboxes.map((checkbox) => (
            <TouchableOpacity
              key={checkbox.id}
              style={[styles.checkbox, checkbox.checked && styles.checked]}
              onPress={() => toggleHallCheckbox(checkbox.id)}
            >
              <Text style={styles.checkboxText}>{checkbox.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.questionText}>
          Thank you for filling out the survey!
        </Text>
        <View style={styles.submit}>
          <Link
            href={{
              pathname: "profile/profilePage",
            }}
            asChild
          >
            <TouchableOpacity style={styles.submitButton}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter-Bold",
                  alignSelf: "center",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Themes.colors.grayBackground,
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    paddingTop: 8,
    paddingBottom: 10,
    textAlign: "center",
  },
  questionText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    padding: 10,
    textAlign: "center",
  },
  rankingText: {
    fontSize: 17,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    padding: 10,
  },
  rankingOptions: {
    alignItems: "center",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  textBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Themes.colors.orange,
    color: Themes.colors.gray,
  },
  rankingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 7,
    justifyContent: "center",
    width: "10%",
    backgroundColor: Themes.colors.midOrange,
    borderRadius: 10,
    margin: 15,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 7,
    justifyContent: "center",
    width: "50%",
    backgroundColor: Themes.colors.midOrange,
    borderRadius: 10,
  },
  checkboxText: {
    fontSize: 15,
    fontFamily: "Inter",
  },
  checked: {
    backgroundColor: Themes.colors.orange,
  },
  submit: {
    alignItems: "center",
    padding: 15,
  },
  submitButton: {
    backgroundColor: Themes.colors.midOrange,
    borderRadius: "50%",
    paddingHorizontal: 12,
    justifyContent: "center",
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
  },
  scrollStyle: {
    //width: windowWidth * 0.9,
  },
});
