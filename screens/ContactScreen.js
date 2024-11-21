import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactScreen = ({ navigation, onLogout }) => {
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
      
      <Text style={styles.title}>Contact Us</Text>
      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={30} color="#ff4500" />
      </TouchableOpacity>

      {/* Contact Information */}
      <View style={styles.contactContainer}>
        <View style={styles.zoneContainer}>
          <Text style={styles.zoneName}>Zone A (East Pune)</Text>
          <Text style={styles.contactName}>Umesh Jaltare</Text>
          <Text style={styles.contactNumber}>93731 00155</Text>
        </View>
        <View style={styles.zoneContainer}>
          <Text style={styles.zoneName}>Zone B (Rest of Pune)</Text>
          <Text style={styles.contactName}>Ajinkya Deshpande</Text>
          <Text style={styles.contactNumber}>94044 39445</Text>
        </View>
        <View style={styles.zoneContainer}>
          <Text style={styles.zoneName}>Zone C (PCMC)</Text>
          <Text style={styles.contactName}>Hrushikesh Mayee</Text>
          <Text style={styles.contactNumber}>99879 66798</Text>
        </View>
      </View>
    
       {/* Footer with "Developed by Innervation IT Solutions" */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>@Innervation IT Solutions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ff4500",
  },
  contactContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align content at the top
  },
  zoneContainer: {
    padding: 15,
    marginBottom: 10, // Reduced space between zone containers
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  zoneName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactName: {
    fontSize: 18,
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 18,
    color: "#555",
  },
  footer: {
    position: "absolute",
    bottom: 5, // Adjust distance from the bottom
    right: 10, // Adjust distance from the right
  },
  footerText: {
    fontSize: 12,
    color: "grey",
  },
});

export default ContactScreen;
