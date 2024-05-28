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
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import {
  router,
  Link,
  useLocalSearchParams,
  Stack,
  useNavigation,
} from "expo-router";
import { Images, Themes } from "../assets/Themes";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLibraryPermission = async () => {
    if (!hasLibraryPermission) {
      const libraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasLibraryPermission(libraryStatus.status === "granted");
    }
  };

  const pickImageAsync = async () => {
    getLibraryPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        await AsyncStorage.setItem("image", result.assets[0].uri);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log("image not selected");
    }
  };

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
          <View>
            {selectedImage ? (
              <Image
                style={styles.profilePic}
                source={{ uri: selectedImage }}
              />
            ) : (
              <View>
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: "https://c0.klipartz.com/pngpicture/753/432/gratis-png-perfil-de-usuario-2018-in-sight-conferencia-de-usuario-expo-negocio-predeterminado-negocio-thumbnail.png",
                  }}
                />
              </View>
            )}
            <TouchableOpacity onPress={pickImageAsync}>
              <Image
                style={styles.cameraIcon}
                source={{
                  uri: "data:image/jpeg;base64,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",
                }}
              />
            </TouchableOpacity>
          </View>
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
                    Hobbies
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: 8,
                  paddingHorizontal: 16,
                  fontSize: 12,
                  fontFamily: "Inter",
                  alignSelf: "center",
                }}
              >
                {hobbies.join(", ")}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.editButtonsContainer}>
        <Link
          href={{
            pathname: "profile/surveyPage",
          }}
          asChild
        >
          <TouchableOpacity style={styles.editButton}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter-Bold",
                alignSelf: "center",
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={{
            pathname: "profile/availabilityPage",
          }}
          asChild
        >
          <TouchableOpacity style={styles.editButton}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter-Bold",
                alignSelf: "center",
              }}
            >
              Edit Availability
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    // backgroundColor: Themes.colors.lightGray,
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
    backgroundColor: "#f5f7f5",
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
  cameraIcon: {
    borderRadius: "50%",
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    marginLeft: 105,
    marginTop: -40,
  },
});

export default Profile;
