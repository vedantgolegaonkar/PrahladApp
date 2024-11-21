import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput, // Added for search functionality
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]); // Added state for filtered bookings
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigation = useNavigation();

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

  const formatFieldName = (field) => {
    return field
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "https://upasana-app-gdm2p.ondigitalocean.app/bookings/users"
      );

      if (response.ok) {
        const data = await response.json();
        setBookings(data.users); // Set original bookings
        setFilteredBookings(data.users); // Set filtered bookings initially

        const loggedInUserId = await getData("userId");
        const loggedInUser = data.users.find(
          (user) => user.id.toString() === loggedInUserId
        );

        if (loggedInUser) {
          setIsAdmin(loggedInUser.isadmin);
        } else {
          console.error("Logged-in user not found in the fetched data.");
        }
      } else {
        Alert.alert("No bookings to display");
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching bookings");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 20000); // Refresh every 20 seconds
    return () => clearInterval(interval);
  }, []);

  // Filter bookings whenever the search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBookings(bookings); // Reset to all bookings if the query is empty
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = bookings.filter(
        (item) =>
          `${item.first_name} ${item.last_name}`
            .toLowerCase()
            .includes(lowercasedQuery)
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]); // Dependencies: searchQuery and bookings

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff4500" />
        <Text style={styles.loadingText}>Loading bookings...</Text>
      </View>
    );
  }

  const handleEditBooking = (booking) => {
    console.log("Edit Booking Data:", booking);
    navigation.navigate("EditBooking", { bookingData: booking });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput} // Added style for search bar
        placeholder="Search by name..."
        value={searchQuery} // Controlled input
        onChangeText={(text) => setSearchQuery(text)} // Update search query state
      />

      {filteredBookings && filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings} // Use filtered bookings here
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Name:</Text>
                <Text style={styles.bookingText}>
                  {item.first_name} {item.last_name}
                </Text>
              </View>

              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Address:</Text>
                <Text style={styles.bookingText}>
                  {`${item.flat_no}, ${item.full_address}, ${item.area}, ${item.landmark}, ${item.city}, ${item.state} - ${item.pincode}`}
                </Text>
              </View>

              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Anugrahit:</Text>
                <Text style={styles.bookingText}>{item.anugrahit}</Text>
              </View>

              <View style={styles.bookingDetails}>
                <FlatList
                  horizontal
                  data={item.bookings}
                  keyExtractor={(booking, index) => index.toString()}
                  renderItem={({ item: booking }) => (
                    <View style={styles.bookingCard}>
                      <TouchableOpacity
                        style={[
                          styles.editButton,
                          !isAdmin && { display: "none" },
                        ]}
                        onPress={() => handleEditBooking(booking)}
                        disabled={!isAdmin}
                      >
                        <Text style={styles.editButtonText}>Edit</Text>
                      </TouchableOpacity>
                      {/* Below Text is for an empty space between button and first line */}
                      <Text style={styles.fieldName}></Text>
                      {Object.keys(booking).map((field, index) => (
                        <View key={index} style={styles.fieldRow}>
                          <Text style={styles.fieldName}>
                            {formatFieldName(field)}:
                          </Text>
                          <Text
                            style={[
                              styles.fieldValue,
                              field === "is_active" && booking[field] === false
                                ? styles.inactiveField
                                : field === "is_active" && booking[field] === true
                                ? styles.activeField
                                : null,
                            ]}
                          >
                            {String(booking[field])}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>


              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Mobile Number:</Text>
                <Text style={styles.bookingText}>{item.mobile_number}</Text>
              </View>

              <View style={styles.bookingDetails}>
                <Text style={styles.bookingLabel}>Alternate Mobile:</Text>
                <Text style={styles.bookingText}>
                  {item.alternate_mobile_number}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBookingsText}>Bookings not available!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f4f4" },
  searchInput: { // Added styles for search input
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  // Rest of the styles remain unchanged
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#ff4500" },
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
  bookingDetails: { flexDirection: "row", justifyContent: "space-between" },
  bookingLabel: { fontWeight: "bold", color: "#333" },
  bookingText: { color: "#555", flexWrap: "wrap", flex: 1 },
  noBookingsText: { fontSize: 16, textAlign: "center", marginTop: 20 },
  editButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 4,
  },
  editButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  fieldRow: { flexDirection: "row", marginBottom: 5 },
  fieldName: { fontWeight: "bold", color: "#333", marginRight: 5 },
  fieldValue: { color: "#555" },
  inactiveField: {
    fontWeight: "bold",
    color: "red",
  },
  activeField: {
    fontWeight: "bold",
    color: "green",
  },
});

export default BookingsScreen;
