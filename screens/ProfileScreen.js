import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ onLogout }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [gender, setGender] = useState(user?.gender || "male");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation()

  // const userFields = [
  //   { label: 'First Name', value: first_name },
  //   { label: 'Middle Name', value: middle_name },
  //   { label: 'Last Name', value: last_name },
  //   { label: 'Email', value: email },
  //   { label: 'Mobile Number', value: mobile_number },
  //   { label: 'Alternate Mobile Number', value: alternate_mobile_number },
  //   { label: 'Flat No', value: flat_no },
  //   { label: 'Full Address', value: full_address },
  //   { label: 'Area', value: area },
  //   { label: 'Landmark', value: landmark },
  //   { label: 'City', value: city },
  //   { label: 'State', value: state },
  //   { label: 'Pincode', value: pincode },
  //   { label: 'Anugrahit', value: anugrahit },
  //   { label: 'Gender', value: gender },
  // ];

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.uri);

      setProfilePic(result.assets[0].uri);
    }
  };

  const renderProfilePicture = () => {
    if (profilePic) {
      return (
        <Image source={{ uri: profilePic }} style={styles.profilePic} rounded />
      );
    } else {
      return (
        <Image
          source={
            gender === "male"
              ? require("../assets/male.jpg")
              : require("../assets/female.jpg")
          }
          style={styles.profilePic}
        />
      );
    }
  };

  const removeProfilePic = () => {
    setProfilePic(null);
  };

  const handleLogout = () => {
    // Show confirmation alert
    Alert.alert(
      "Logout", // Title of the alert
      "Are you sure you want to log out?", // Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"), // If user selects "Cancel"
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => onLogout(), // If user selects "Yes", log out
        },
      ],
      { cancelable: false }
    );
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Value exists
        return value;
      }
    } catch (e) {
      console.error('Failed to fetch data from AsyncStorage:', e);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await getData("userId");
      if (!userId) {
        alert("Please log in to view your profile");
        navigation.navigate("Login"); // Redirect if not logged in
        return;
      }

      try {
      
        const apiUrl = "http://192.168.31.124:5000";
        console.log("userId",userId," ", typeof userId)
        const response = await fetch(`${apiUrl}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        console.log("resposeeeee",response)
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        console.log("data",data)
        setUser(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [navigation]);

  return (
    <>
      {error && <Text>{error}</Text>}

      {user ? (
        <ScrollView contentContainerStyle={styles?.scrollContainer}>
          <View style={styles?.container}>
            <Text style={styles?.header}>Profile</Text>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles?.logoutButton}
            >
              <Ionicons name="log-out-outline" size={30} color="#ff4500" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImage}
              style={styles?.avatarContainer}
            >
              {renderProfilePicture()}
              <Text style={styles.editText}>Edit Profile Picture</Text>
            </TouchableOpacity>

            {profilePic && (
              <Text style={styles.removePic} onPress={removeProfilePic}>
                Remove Profile Picture
              </Text>
            )}

<View style={styles.formGroup}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.first_name}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Middle Name:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.middle_name}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.last_name}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.email}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mobile Number:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.mobile_number}
            // keyboardType="numeric"
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Alternate Mobile Number:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.alternate_mobile_number}
            // keyboardType="numeric"
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Flat No:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.flat_no}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Address:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.full_address}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Area:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.area}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Landmark:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.landmark}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>City:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.city}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>State:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.state}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Pincode:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.pincode}
            // keyboardType="numeric"
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Anugrahit:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.anugrahit}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.input}
            placeholder={user.gender}
            editable={false}
          />
        </View>

          </View>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ff4500",
  },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 16, color: "#333", marginBottom: 5 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#FF6F00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ff4500",
    marginBottom: 10,
  },
  editText: { color: "#ff4500", fontWeight: "bold", textAlign: "center" },
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  removePic: {
    color: "#ff4500",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 1,
    borderRadius: 5,
    position: "absolute",
    top: 15,
    right: 15,
    shadowOpacity: 1,
  },
});

export default ProfileScreen;
