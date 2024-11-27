import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = ({ navigation, onLogout }) => {
  const [usersSummary, setUsersSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUpasanaUsersSummary = async () => {
    try {
      setLoading(true); // Show loading indicator during data fetch
      const response = await fetch(
        "https://upasana-app-gdm2p.ondigitalocean.app/upasanaUsersSummary"
      );
      const data = await response.json();
      //console.log("####Summary Details ", JSON.stringify(data));
      setUsersSummary(data); // Assuming data includes the necessary fields
    } catch (error) {
      console.error("Failed to fetch upasana Users Summary:", error);
    } finally {
      setLoading(false); // Hide loading indicator after data fetch
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchUpasanaUsersSummary);
    return unsubscribe; // Clean up the listener on unmount
  }, [navigation]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Ramdasibana@Pune </Text>

      {/* Display loading indicator while fetching data */}
      {loading ? (
        <ActivityIndicator size="large" color="#ff4500" />
      ) : (
        // Display the card with summary data
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary Panel</Text>
          <Text style={[styles.cardText, styles.leftAlign]}>Total Anugrahit Users: {usersSummary.total_anugrahit_users || 0}</Text>
          <Text style={[styles.cardText, styles.leftAlign]}>{`Total Bookings            :`.padEnd(28, ' ')}{usersSummary.total_bookings || 0}</Text>
          <Text style={[styles.cardText, styles.leftAlign]}>{'Total Users                  :' .padEnd(31, ' ')}{usersSummary.total_users || 0}</Text>
        </View>
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={30} color="#ff4500" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    fontSize: 18,
    color: "#ff4500",
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
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
  leftAlign: {
    textAlign: 'left', // Ensures text alignment to the left
    alignSelf: 'stretch', // Makes the Text stretch to the parent width
  },
});

export default DashboardScreen;
