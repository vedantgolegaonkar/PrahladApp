import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import Constants from 'expo-constants';

const RegisterScreen = ({ navigation, onRegister }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [altMobileNumber, setAltMobileNumber] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [anugrahit, setAnugrahit] = useState("no");
  const [gender, setGender] = useState("male");

  // Determine the environment safely
  const appEnv = (Constants.manifest && Constants.manifest.releaseChannel) || 'dev';
  // How to get this IP 
  //cmd -->
  //  ipconfig --Will Give
  //        -->IPv4 Address. . . . . . . . . . . : 192.168.1.9
  //Replace in apiUrl: 'http://192.168.1.9:5000'

  const envConfig = Constants.manifest?.extra?.[appEnv] || { apiUrl: 'http://192.168.1.9:5000' }; // Default API URL

  // Use the environment-specific API URL
  const apiUrl = envConfig.apiUrl;

  const handleRegistration = async () => {
    console.log('###################');
      console.log('URL IS',  `${appEnv}`);
      console.log('###################');
      console.log('###################');
      console.log('envConfig IS',  JSON.stringify(Constants.manifest));
      console.log('###################');
     if (!firstName.trim()) {
      Alert.alert("Error", "First Name is Required");
      return;
    }
    if (!lastName.trim()) {
      Alert.alert("Error", "Last Name is Required");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Email is Required");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Password is Required");
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!mobileNumber.trim()) {
      Alert.alert("Error", "Mobile Number is Required");
      return;
    }
    if (!fullAddress.trim()) {
      Alert.alert("Error", "Full Address is Required");
      return;
    }
    if (!area.trim()) {
      Alert.alert("Error", "Area is Required");
      return;
    }
    if (!landmark.trim()) {
      Alert.alert("Error", "Landmark is Required");
      return;
    }
    if (!city.trim()) {
      Alert.alert("Error", "City is Required");
      return;
    }
    if (!state.trim()) {
      Alert.alert("Error", "State is Required");
      return;
    }
    if (!pincode.trim()) {
      Alert.alert("Error", "Pincode is Required");
      return;
    }
    if (!anugrahit.trim()) {
      Alert.alert("Error", "Anugrahit field is Required");
      return;
    }
    if (!gender.trim()) {
      Alert.alert("Error", "Gender is Required");
      return;
    }

    // Create the JSON payload
    const payload = {
      first_name: firstName.trim(),
      middle_name: middleName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
      confirm_password: confirmPassword.trim(),
      mobile_number: mobileNumber.trim(),
      alternate_mobile_number: altMobileNumber.trim(),
      flat_no: flatNo.trim(),
      full_address: fullAddress.trim(),
      area: area.trim(),
      landmark: landmark.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      anugrahit: anugrahit.trim(),
      gender: gender.trim(),
    };

    // Send the registration request
    try {

      console.log('###################');
      console.log('URL IS',  `${apiUrl}/register`);
      console.log('###################');
      console.log('###################');
      console.log('PAYLOAD IS',  JSON.stringify(payload));
      console.log('###################');
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log('RESPONSE IS ******',JSON.stringify(response));
      if (!response.ok) {
        
        throw new Error("Registration failed. Please try again.");
      }

      const data = await response.json(); // Parse the response
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "You have been registered successfully",
      });

      // Optionally, you can navigate to another screen or reset form state
      onRegister(navigation);

    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message || "An error occurred during registration.",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Alternate Mobile Number"
        value={altMobileNumber}
        onChangeText={setAltMobileNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Flat No."
        value={flatNo}
        onChangeText={setFlatNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Address"
        value={fullAddress}
        onChangeText={setFullAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Area"
        value={area}
        onChangeText={setArea}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark"
        value={landmark}
        onChangeText={setLandmark}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Anugrahit:</Text>
        <Picker
          selectedValue={anugrahit}
          style={styles.picker}
          onValueChange={(itemValue) => setAnugrahit(itemValue)}
        >
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#ff4500",
  },
  input: {
    borderWidth: 1,
    marginVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: "100%",
    height: 40,
    borderColor: "#cccccc",
  },
  pickerContainer: { width: "100%", marginVertical: 10 },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ff4500",
  },
  picker: { width: "100%", height: 50, borderWidth: 1, borderColor: "#cccccc" },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff4500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
});

export default RegisterScreen;
