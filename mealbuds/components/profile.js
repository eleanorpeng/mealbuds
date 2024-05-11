import {
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import { Images, Themes } from "../assets/Themes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Profile = ({
  name,
  profilePicUrl,
  major,
  year,
  interests,
  hobbies,
  hometown,
  diningHalls,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.namePicContainer}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Inter-Bold",
              paddingBottom: 12,
            }}
          >
            {name}
          </Text>
          <Image
            style={styles.profilePic}
            source={{
              uri: profilePicUrl,
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.rectangle}>
            <View style={styles.detailContainer}>
              <View style={styles.detailHeaderContainer}>
                <View style={styles.detailHeader}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter-Bold",
                      alignSelf: "center",
                    }}
                  >
                    Major
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 8,
                  paddingHorizontal: 8,
                  fontSize: 12,
                  fontFamily: "Inter",
                  alignSelf: "center",
                }}
              >
                {major}
              </Text>
            </View>

            <View style={styles.detailContainer}>
              <View style={styles.detailHeaderContainer}>
                <View style={styles.detailHeader}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter-Bold",
                      alignSelf: "center",
                    }}
                  >
                    Year
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 8,
                  paddingHorizontal: 8,
                  fontSize: 12,
                  fontFamily: "Inter",
                  alignSelf: "center",
                }}
              >
                {year}
              </Text>
            </View>
          </View>
          <View style={styles.rectangle}>
            <View style={styles.detailContainer}>
              <View style={styles.detailHeaderContainer}>
                <View style={styles.detailHeader}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter-Bold",
                      alignSelf: "center",
                    }}
                  >
                    Interests
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 8,
                  paddingHorizontal: 8,
                  fontSize: 12,
                  fontFamily: "Inter",
                  alignSelf: "center",
                }}
              >
                {interests.join(", ")}
              </Text>
            </View>

            <View style={styles.detailContainer}>
              <View style={styles.detailHeaderContainer}>
                <View style={styles.detailHeader}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter-Bold",
                      alignSelf: "center",
                    }}
                  >
                    Hobbies
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 8,
                  paddingHorizontal: 8,
                  fontSize: 12,
                  fontFamily: "Inter",
                  alignSelf: "center",
                }}
              >
                {hobbies.join(", ")}
              </Text>
            </View>
          </View>
          <View style={styles.rectangle}>
            <View style={styles.detailContainer}>
              <View style={styles.detailHeaderContainer}>
                <View style={styles.detailHeader}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter-Bold",
                      alignSelf: "center",
                    }}
                  >
                    Hometown
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 8,
                  paddingHorizontal: 8,
                  fontSize: 12,
                  fontFamily: "Inter",
                  alignSelf: "center",
                }}
              >
                {hometown}
              </Text>
            </View>

            <View style={styles.detailContainer}>
              <View style={styles.detailHeaderContainer}>
                <View style={styles.detailHeader}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter-Bold",
                      alignSelf: "center",
                    }}
                  >
                    Preferred Dining Halls
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 8,
                  paddingHorizontal: 8,
                  fontSize: 12,
                  fontFamily: "Inter",
                  alignSelf: "center",
                }}
              >
                {diningHalls.join(", ")}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.editButtonsContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter",
              alignSelf: "center",
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter",
              alignSelf: "center",
            }}
          >
            Edit Availability
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: Themes.colors.background,
    alignItems: "center",
    paddingTop: 24,
  },
  profileContainer: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.6,
    borderRadius: "50%",
    alignContent: "center",
    flexDirection: "column",
    // borderColor: "red",
    // borderWidth: 1,
    padding: 16,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  namePicContainer: {
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  profilePic: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    borderRadius: (windowWidth * 0.35) / 2,
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 8,
    // borderColor: "red",
    // borderWidth: 1,
  },
  rectangle: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 4,
    // borderColor: "red",
    // borderWidth: 1,
  },
  detailContainer: {
    flex: 1,
    // borderColor: "green",
    // borderWidth: 1,
  },
  detailHeaderContainer: {
    height: "40%",
    paddingTop: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  detailHeader: {
    backgroundColor: Themes.colors.backgroundOrange,
    borderRadius: "50%",
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  editButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    width: windowWidth,
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  editButton: {
    height: "50%",
    width: "40%",
    backgroundColor: Themes.colors.midOrange,
    borderRadius: "50%",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});

export default Profile;
