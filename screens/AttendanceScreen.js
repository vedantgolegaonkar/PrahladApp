import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const AttendanceScreen = () => {
  const [attendance, setAttendance] = useState({
    feb26Lunch: "",
    feb26Dinner: "",
    feb27Lunch: "",
    feb27Dinner: "",
    sevaNidhi: "", // For Yes/No dropdown
  });

  const handleSubmit = () => {
    // Validation
    if (
      !attendance.feb26Lunch ||
      !attendance.feb26Dinner ||
      !attendance.feb27Lunch ||
      !attendance.feb27Dinner ||
      !attendance.sevaNidhi
    ) {
      Alert.alert("Error", "All fields are mandatory.");
      return;
    }

    if (
      isNaN(attendance.feb26Lunch) ||
      isNaN(attendance.feb26Dinner) ||
      isNaN(attendance.feb27Lunch) ||
      isNaN(attendance.feb27Dinner)
    ) {
      Alert.alert("Error", "All numeric fields should be valid numbers.");
      return;
    }

    // Submit the data
    console.log("Submitted Attendance:", attendance);
    Alert.alert("Success", "Attendance submitted successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Registration</Text>

      {/* Fields */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>26 Feb दुपारचा प्रसाद:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={attendance.feb26Lunch}
          onChangeText={(text) =>
            setAttendance({ ...attendance, feb26Lunch: text })
          }
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>26 Feb रात्रीचा प्रसाद:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={attendance.feb26Dinner}
          onChangeText={(text) =>
            setAttendance({ ...attendance, feb26Dinner: text })
          }
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>27 Feb दुपारचा प्रसाद:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={attendance.feb27Lunch}
          onChangeText={(text) =>
            setAttendance({ ...attendance, feb27Lunch: text })
          }
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>27 Feb रात्रीचा प्रसाद:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={attendance.feb27Dinner}
          onChangeText={(text) =>
            setAttendance({ ...attendance, feb27Dinner: text })
          }
        />
      </View>

      {/* Yes/No Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>जन्मोत्सव सेवा निधी दिला आहे का?</Text>
        <Picker
          selectedValue={attendance.sevaNidhi}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setAttendance({ ...attendance, sevaNidhi: itemValue })
          }
        >
          <Picker.Item label="Select Yes/No" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#008080",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AttendanceScreen;
