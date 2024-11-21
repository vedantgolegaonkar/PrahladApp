import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const appEnv =
    (Constants.manifest && Constants.manifest.releaseChannel) || "dev";
  const envConfig = Constants.manifest?.extra?.[appEnv] || {
    apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",
  };
  const apiUrl = envConfig.apiUrl;

  // Helper function to fetch data from AsyncStorage
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error("Failed to fetch data from AsyncStorage:", e);
    }
    return null;
  };

  // Function to fetch user data and bookings
  const fetchUserData = async () => {
    try {
      setError(null); // Reset error state
      const storedUserId = await getData("userId");
      console.log("Retrieved user ID from AsyncStorage:", storedUserId);

      if (!storedUserId) {
        console.error("User ID not found in AsyncStorage");
        setError("User ID not found");
        return;
      }

      setUserId(storedUserId);
      console.log("Fetching bookings for user:", storedUserId);

      const response = await fetch(`${apiUrl}/bookings/user/${storedUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to fetch bookings.";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setUser(data.user);
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  // Use useFocusEffect to fetch data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userLabel}>User Information:</Text>
          <Text style={styles.userText}>
            Name: {user.first_name} {user.middle_name} {user.last_name}
          </Text>
          <Text style={styles.userText}>Email: {user.email}</Text>
          <Text style={styles.userText}>Mobile: {user.mobile_number}</Text>
          <Text style={styles.userText}>Address: {user.full_address}</Text>
        </View>
      )}

      {/* Display bookings if available */}
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Upasana Booking Date:</Text>
                <Text style={styles.bookingText}>
                    {new Date(item.booking_date).toLocaleDateString()} 
                </Text>
              </View>
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Mahaprasad:</Text>
                <Text style={styles.bookingText}>
                  {item.mahaprasad ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBookingsText}>
          There is no bookings for the current user
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f4f4" },
  bookingCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderColor: "#ff4500",
  },
  bookingDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userInfo: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  userLabel: { fontWeight: "bold", color: "#333" },
  userText: { color: "#555" },
  bookingLabel: { fontWeight: "bold", color: "#333" },
  bookingText: { color: "#555" },
  noBookingsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  errorText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 20 },
});

export default BookingScreen;
