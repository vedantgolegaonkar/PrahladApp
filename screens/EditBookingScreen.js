import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const EditBookingScreen = ({ route, navigation }) => {
  const { bookingData } = route.params;
  const [editedBooking, setEditedBooking] = useState(bookingData);
  const [loading, setLoading] = useState(true);
 // const [bookings, setBookings] = useState([]);

  const handleInputChange = (field, value) => {
    setEditedBooking((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log("Updated Booking Data:", editedBooking);
    try {
      // Construct the payload with the required fields
      const payload = {
        user_id: editedBooking.user_id, // Assuming the user_id is part of the editedBooking object
        booking_id: editedBooking.booking_id, // Similarly for booking_id
        is_active: editedBooking.is_active, // The is_active field from the form
      };
      console.log("Payload is ", JSON.stringify(payload));
      // Send the request with the dynamic payload
      const response = await fetch("https://upasana-app-gdm2p.ondigitalocean.app/update_booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Assuming response contains updated bookings data
        console.log("@@@@Updated Booking Data@@@@@:", JSON.stringify(data));
        //setBookings(data.users); // Update your bookings state with the response data
      } else {
        console.log("Error", "Failed to update booking");
        Alert.alert("No bookings to update");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while updating the booking");
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  
    // Go back after the update operation
    navigation.goBack();
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Booking</Text>
      {Object.keys(editedBooking).map((field, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>{formatFieldName(field)}:</Text>
          {field === "is_active" ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editedBooking[field]}
                onValueChange={(value) => handleInputChange(field, value)}
                style={styles.picker}
              >
                <Picker.Item label="True" value={true} />
                <Picker.Item label="False" value={false} />
              </Picker>
            </View>
          ) : (
            <TextInput
              style={styles.input}
              value={String(editedBooking[field])}
              editable={false} // Non-editable for all fields except 'is_active'
            />
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const formatFieldName = (field) => {
  return field
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditBookingScreen;
