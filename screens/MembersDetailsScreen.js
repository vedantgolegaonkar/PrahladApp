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
      console.log("Edited Data ####", JSON.stringify(editableMember));
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
        

        {/* Address as a header */}
        <Text style={styles.addressHeader}>Member Details:</Text>

        {isEditing ? (
          <>
            <View style={styles.detailRow}>
              <Text style={styles.label}>First Name:</Text>
                <TextInput
                  style={styles.input}
                  value={editableMember.first_name}
                  onChangeText={(value) => handleChange("first_name", value)}
                />
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Last Name:</Text>
                <TextInput
                  style={styles.input}
                  value={editableMember.last_name}
                  onChangeText={(value) => handleChange("filast_namerst_name", value)}
                />
            </View>
            {/* Editable Address Fields */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Flat No:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.flat_no}
                onChangeText={(value) => handleChange("flat_no", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Full Address:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.full_address}
                onChangeText={(value) => handleChange("full_address", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Area:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.area}
                onChangeText={(value) => handleChange("area", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Landmark:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.landmark}
                onChangeText={(value) => handleChange("landmark", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Pincode:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.pincode}
                onChangeText={(value) => handleChange("pincode", value)}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>City:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.city}
                editable={false} // Disable the TextInput
                onChangeText={(value) => handleChange("city", "Pune")}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>State:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.state}
                editable={false} // Disable the TextInput
                onChangeText={(value) => handleChange("state", "Maharashtra")}
              />
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Pincode:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.pincode}
                onChangeText={(value) => handleChange("pincode", value)}
              />
            </View>

            {/* Other editable fields */}
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

            {/* Editable Email Field */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.email}
                onChangeText={(value) => handleChange("email", value)}
              />
            </View>

            {/* Editable Mobile Field */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Mobile:</Text>
              <TextInput
                style={styles.input}
                value={editableMember.mobile_number}
                onChangeText={(value) => handleChange("mobile_number", value)}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Non-editable Fields */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>First Name:</Text>
              <Text style={styles.value}>{editableMember.first_name}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Last Name:</Text>
              <Text style={styles.value}>{editableMember.last_name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Flat No:</Text>
              <Text style={styles.value}>{editableMember.flat_no}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Full Address:</Text>
              <Text style={styles.value}>{editableMember.full_address}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Area:</Text>
              <Text style={styles.value}>{editableMember.area}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Landmark:</Text>
              <Text style={styles.value}>{editableMember.landmark}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Pincode:</Text>
              <Text style={styles.value}>{editableMember.pincode}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>City:</Text>
              <Text style={styles.value}>{editableMember.city}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>State:</Text>
              <Text style={styles.value}>{editableMember.state}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Pincode:</Text>
              <Text style={styles.value}>{editableMember.pincode}</Text>
            </View>

            {/* Non-editable fields */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{editableMember.gender}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Anugrahit:</Text>
              <Text style={styles.value}>{editableMember.anugrahit}</Text>
            </View>

            {/* Non-editable Email Field */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{editableMember.email}</Text>
            </View>

            {/* Non-editable Mobile Field */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{editableMember.mobile_number}</Text>
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
  addressHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
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
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MembersDetailsScreen;
