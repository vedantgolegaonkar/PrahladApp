import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import moment from "moment";

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch bookings from the server
  const fetchBookings = async () => {
    try {
      const response = await fetch("https://upasana-app-gdm2p.ondigitalocean.app/bookings/users");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", JSON.stringify(data)); // Inspect the response data structure
        setBookings(data.users); // Assuming data contains the "users" array directly
      } else {
        console.log("Error", "Failed to fetch bookings");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings when the component mounts
  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff4500" />
        <Text style={styles.loadingText}>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookings && bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              {/* Name Column */}
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Name:</Text>
                <Text style={styles.bookingText}>
                  {item.first_name} {item.last_name}
                </Text>
              </View>

              {/* Address Column */}
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Address:</Text>
                <Text style={styles.bookingText}>
                  {`${item.flat_no}, ${item.full_address}, ${item.area}, ${item.landmark}, ${item.city}, ${item.state} - ${item.pincode}`}
                </Text>
              </View>

              {/* Anugrahit Field */}
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Anugrahit:</Text>
                <Text style={styles.bookingText}>{item.anugrahit}</Text>
              </View>

              {/* Bookings Array - Horizontal FlatList */}
              <View style={styles.bookingDetails}>
                <FlatList
                  horizontal
                  data={item.bookings}
                  keyExtractor={(booking, index) => index.toString()}
                  renderItem={({ item: booking }) => (
                    <View style={styles.bookingCard}>
                      {/* Booking Date */}
                      <Text style={styles.bookingInfoText}>
                        Booking Date: {moment(booking.booking_date).format("DD MMM YYYY")}
                      </Text>

                      {/* Mahaprasad Available */}
                      <Text style={styles.bookingInfoText}>
                        Mahaprasad Available: {booking.mahaprasad ? "Yes" : "No"}
                      </Text>
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
                />
              </View>


              {/* Mobile Number */}
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Mobile Number:</Text>
                <Text style={styles.bookingText}>{item.mobile_number}</Text>
              </View>

              {/* Alternate Mobile Number */}
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Alternate Mobile:</Text>
                <Text style={styles.bookingText}>{item.alternate_mobile_number}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBookingsText}>
          Bookings not available for the logged-in user
        </Text>
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
  bookingText: { color: "#555", flexWrap: "wrap", flex: 1 },
  bookingInfoText: {
    color: "#555",
    flexWrap: "wrap",
    flex: 1,
    fontWeight: 'bold',  // Make text bold
    fontStyle: 'italic', // Make text italic
    fontSize: 12,        // Make text slightly smaller
  },
  noBookingsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute the columns evenly
    marginBottom: 10,
    marginRight: 10, // Add spacing between horizontal items
  },
  
});

export default BookingsScreen;
