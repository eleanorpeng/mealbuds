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
