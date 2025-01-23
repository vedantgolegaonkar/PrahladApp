import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";

const JanmotsavDetails = ({ navigation }) => {
  // Function to handle Google Maps navigation
  const handleGoogleMaps = () => {
    const url = "https://www.google.com/maps?q=your_location"; // Replace with actual Google Maps link
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Unable to open Google Maps.")
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Janmotsav 2025</Text>

      {/* Button for उपस्थिती नोोंदवण्यासाठी */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AttendanceScreen")} // Replace with your attendance screen name
      >
        <Text style={styles.buttonText}>Attendance Registration</Text>
      </TouchableOpacity>

      {/* Button for जन्मोत्सवाचे गूगलमॅप लोकेशन */}
      <TouchableOpacity style={styles.button} onPress={handleGoogleMaps}>
        <Text style={styles.buttonText}>Map</Text>
      </TouchableOpacity>

      {/* Button for जन्मोत्सव Photos/Videos */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MediaScreen")} // Replace with your media screen name
      >
        <Text style={styles.buttonText}>Janmotsav Photos/Videos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff4500",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#008080",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default JanmotsavDetails;
