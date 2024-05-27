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
  const [sunFree, setSunFree] = useState([
    { id: 1, label: "Breakfast", checked: false },
    { id: 2, label: "Lunch", checked: false },
    { id: 3, label: "Dinner", checked: false },
  ]);

  const toggleSunFree = (id) => {
    setSunFree((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const [monFree, setMonFree] = useState([
    { id: 1, label: "Breakfast", checked: false },
    { id: 2, label: "Lunch", checked: false },
    { id: 3, label: "Dinner", checked: false },
  ]);

  const toggleMonFree = (id) => {
    setMonFree((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const [tuesFree, setTuesFree] = useState([
    { id: 1, label: "Breakfast", checked: false },
    { id: 2, label: "Lunch", checked: false },
    { id: 3, label: "Dinner", checked: false },
  ]);

  const toggleTuesFree = (id) => {
    setTuesFree((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const [wedsFree, setWedsFree] = useState([
    { id: 1, label: "Breakfast", checked: false },
    { id: 2, label: "Lunch", checked: false },
    { id: 3, label: "Dinner", checked: false },
  ]);

  const toggleWedsFree = (id) => {
    setWedsFree((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const [thursFree, setThursFree] = useState([
    { id: 1, label: "Breakfast", checked: false },
    { id: 2, label: "Lunch", checked: false },
    { id: 3, label: "Dinner", checked: false },
  ]);

  const toggleThursFree = (id) => {
    setThursFree((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const [friFree, setFriFree] = useState([
    { id: 1, label: "Breakfast", checked: false },
    { id: 2, label: "Lunch", checked: false },
    { id: 3, label: "Dinner", checked: false },
  ]);

  const toggleFriFree = (id) => {
    setFriFree((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const [satFree, setSatFree] = useState([
    { id: 1, label: "Breakfast", checked: false },
    { id: 2, label: "Lunch", checked: false },
    { id: 3, label: "Dinner", checked: false },
  ]);

  const toggleSatfree = (id) => {
    setSatFree((prevCheckboxes) =>
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
          title: "Edit Availability",
          headerStyle: {
            backgroundColor: Themes.colors.white,
          },
        }}
      />
      <ScrollView>
        <View>
          <Text style={styles.titleText}>When are you free this week?</Text>
          <Text style={styles.dayText}>Sunday, June 2nd</Text>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            {sunFree.map((checkbox) => (
              <TouchableOpacity
                key={checkbox.id}
                style={[styles.checkbox, checkbox.checked && styles.checked]}
                onPress={() => toggleSunFree(checkbox.id)}
              >
                <Text style={styles.checkboxText}>{checkbox.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dayText}>Monday, June 3rd</Text>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            {monFree.map((checkbox) => (
              <TouchableOpacity
                key={checkbox.id}
                style={[styles.checkbox, checkbox.checked && styles.checked]}
                onPress={() => toggleMonFree(checkbox.id)}
              >
                <Text style={styles.checkboxText}>{checkbox.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dayText}>Tuesday, June 4th</Text>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            {tuesFree.map((checkbox) => (
              <TouchableOpacity
                key={checkbox.id}
                style={[styles.checkbox, checkbox.checked && styles.checked]}
                onPress={() => toggleTuesFree(checkbox.id)}
              >
                <Text style={styles.checkboxText}>{checkbox.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dayText}>Wednesday, June 5th</Text>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            {wedsFree.map((checkbox) => (
              <TouchableOpacity
                key={checkbox.id}
                style={[styles.checkbox, checkbox.checked && styles.checked]}
                onPress={() => toggleWedsFree(checkbox.id)}
              >
                <Text style={styles.checkboxText}>{checkbox.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dayText}>Thursday, June 6th</Text>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            {thursFree.map((checkbox) => (
              <TouchableOpacity
                key={checkbox.id}
                style={[styles.checkbox, checkbox.checked && styles.checked]}
                onPress={() => toggleThursFree(checkbox.id)}
              >
                <Text style={styles.checkboxText}>{checkbox.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dayText}>Friday, June 7th</Text>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            {friFree.map((checkbox) => (
              <TouchableOpacity
                key={checkbox.id}
                style={[styles.checkbox, checkbox.checked && styles.checked]}
                onPress={() => toggleFriFree(checkbox.id)}
              >
                <Text style={styles.checkboxText}>{checkbox.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dayText}>Saturday, June 8th</Text>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            {satFree.map((checkbox) => (
              <TouchableOpacity
                key={checkbox.id}
                style={[styles.checkbox, checkbox.checked && styles.checked]}
                onPress={() => toggleSatfree(checkbox.id)}
              >
                <Text style={styles.checkboxText}>{checkbox.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
});
