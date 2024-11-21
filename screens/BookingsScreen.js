import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigation = useNavigation()

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

  const formatFieldName = (field) => {
    return field
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };
 
  // Function to fetch bookings from the server
  const [isAdmin, setIsAdmin] = useState(false); // Initialize as a boolean

  const fetchBookings = async () => {
    try {
      const response = await fetch("https://upasana-app-gdm2p.ondigitalocean.app/bookings/users");
      
      if (response.ok) {
        const data = await response.json();
       // console.log("@@@@Booking Data@@@@@:", JSON.stringify(data)); // Inspect the response data structure
        
        // Assuming the response contains a user object and its associated bookings
        setBookings(data.users); 

        // Retrieve the logged-in userId from AsyncStorage
        const loggedInUserId = await getData("userId");

        // Find the logged-in user from the fetched data
        const loggedInUser = data.users.find(user => user.id.toString() === loggedInUserId);

        if (loggedInUser) {
          // Set the isadmin value for the logged-in user
          setIsAdmin(loggedInUser.isadmin);  // Update state to true or false
          //console.log(" user isadmin : ", loggedInUser);
        } else {
          console.error("Logged-in user not found in the fetched data.");
        }

      } else {
        console.log("Error", "Failed to fetch bookings");
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

  // If you want to log the value after the state is updated, use useEffect
  useEffect(() => {
    console.log("isAdmin state updated:", isAdmin);
  }, [isAdmin]); // This will run whenever `isAdmin` is updated

  

  // Fetch bookings when the component mounts
  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 20000); // Refresh every minute
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

  const handleEditBooking = (booking) => {
    console.log("Edit Booking Data:", booking);
    // Navigate to an Edit Screen or perform an action with the booking data
    navigation.navigate("EditBooking", { bookingData: booking });
  };

  return (
    <View style={styles.container}>
    {
      bookings && bookings.length > 0 ? (
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
                      {/* Edit Button */}
                      <Text style={styles.fieldName}></Text>

                      <TouchableOpacity
                        style={[
                          styles.editButton, 
                          !isAdmin && { display: 'none' } // Apply display: 'none' if not isAdmin (when isAdmin is false)
                        ]}
                        onPress={() => handleEditBooking(booking)} // Pass the full booking object
                        disabled={!isAdmin} // Disable the button if isAdmin is false
                      >
                        <Text style={styles.editButtonText}>Edit</Text>
                      </TouchableOpacity>


                      {/* Dynamically Render Booking Fields */}
                      {Object.keys(booking).map((field, index) => (
                        <View key={index} style={styles.fieldRow}>
                          <Text style={styles.fieldName}>{formatFieldName(field)}:</Text>
                          <Text style={styles.fieldValue}>{String(booking[field])}</Text>
                        </View>
                      ))}
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
          Bookings not available !
        </Text>
      )
    }
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
  editButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  fieldName: {
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  fieldValue: {
    color: "#555",
  }
  
});

export default BookingsScreen;
