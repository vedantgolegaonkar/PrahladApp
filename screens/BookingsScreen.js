// BookingsScreen.js - Admin Panel
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from "react-native";

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch bookings from the server
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://192.168.1.9:5000/bookings");
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        Alert.alert("Error", "Failed to fetch bookings");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching bookings");
    } finally {
      setLoading(false); // Stop loading indicator once data is fetched
    }
  };

  // Fetch bookings when the component mounts
  useEffect(() => {
    fetchBookings();

    // Optionally, set an interval to refresh the data every few seconds
    const interval = setInterval(fetchBookings, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  if (loading) {
    // Show a loading indicator while data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff4500" />
        <Text style={styles.loadingText}>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Date:</Text>
                <Text style={styles.bookingText}>{item.date}</Text>
              </View>

              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Timeslot:</Text>
                <Text style={styles.bookingText}>{item.timeslot}</Text>
              </View>

              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Mahaprasad:</Text>
                <Text style={styles.bookingText}>{item.mahaprasad}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBookingsText}>No Bookings Available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f4f4" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#ff4500",
  },
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
  bookingLabel: { fontWeight: "bold", color: "#333" },
  bookingText: { color: "#555" },
  noBookingsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default BookingsScreen;
