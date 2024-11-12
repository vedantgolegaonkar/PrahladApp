// BookingScreen.js - User Panel
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useBooking } from "../context/BookingContext";

const BookingScreen = () => {
  const { bookings } = useBooking();

  // Function to send the updated booking to the server
  const updateBookingOnServer = async (booking) => {
    try {
      const response = await fetch("https://upasana-app-gdm2p.ondigitalocean.app/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        Alert.alert("Error", "Failed to update booking on server");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating booking");
    }
  };

  // Send bookings to the server when there's a change
  useEffect(() => {
    if (bookings.length > 0) {
      bookings.forEach((booking) => {
        updateBookingOnServer(booking);
      });
    }
  }, [bookings]);

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

              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Status:</Text>
                <Text
                  style={[
                    styles.bookingText,
                    item.status === "Confirmed"
                      ? styles.statusConfirmed
                      : styles.statusCancelled,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBookingsText}>No Bookings Found</Text>
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
  bookingLabel: { fontWeight: "bold", color: "#333" },
  bookingText: { color: "#555" },
  statusConfirmed: { color: "#4CAF50", fontWeight: "bold" },
  statusCancelled: { color: "#F44336", fontWeight: "bold" },
  noBookingsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default BookingScreen;
