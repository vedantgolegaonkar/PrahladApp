// MembersDetailsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const MembersDetailsScreen = ({ route, navigation }) => {
  const { member } = route.params;

  // State to manage editable member data
  const [isEditing, setIsEditing] = useState(false);
  const [editableMember, setEditableMember] = useState(member);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://upasana-app-gdm2p.ondigitalocean.app/users/${editableMember.id}`,
        {
          method: "PUT", // or 'PATCH', depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableMember), // Send the updated member data
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Member details updated successfully");
        setIsEditing(false);
      } else {
        Alert.alert("Error", "Failed to update member details");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while updating the member details"
      );
    }
  };

  const handleChange = (key, value) => {
    setEditableMember({ ...editableMember, [key]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.memberName}>
          {editableMember.first_name} {editableMember.last_name}
        </Text>

        {isEditing ? (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.email}
                onChangeText={(value) => handleChange("email", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Mobile:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.mobile_number}
                onChangeText={(value) => handleChange("mobile_number", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Address:</Text>
              <TextInput
                style={styles.input}
                value={`${editableMember.flat_no}, ${editableMember.full_address}, ${editableMember.area}, ${editableMember.landmark}, ${editableMember.city}, ${editableMember.state} - ${editableMember.pincode}`}
                onChangeText={(value) => handleChange("address", value)}
                multiline
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Gender:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.gender}
                onChangeText={(value) => handleChange("gender", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Anugrahit:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.anugrahit}
                onChangeText={(value) => handleChange("anugrahit", value)}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{editableMember.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{editableMember.mobile_number}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>
                {editableMember.flat_no}, {editableMember.full_address},{" "}
                {editableMember.area}, {editableMember.landmark},{" "}
                {editableMember.city}, {editableMember.state} -{" "}
                {editableMember.pincode}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{editableMember.gender}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Anugrahit:</Text>
              <Text style={styles.value}>{editableMember.anugrahit}</Text>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderColor: "#ff4500",
  },
  memberName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
    width: "30%",
  },
  value: {
    color: "#555",
    fontSize: 16,
    width: "70%",
    flexWrap: "wrap",
  },
  input: {
    color: "#555",
    fontSize: 16,
    width: "70%",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 4,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#ff4500",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MembersDetailsScreen;
