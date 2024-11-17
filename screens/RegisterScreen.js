import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

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

  const appEnv =
    (Constants.manifest && Constants.manifest.releaseChannel) || "dev";

  const envConfig = Constants.manifest?.extra?.[appEnv] || {
    apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",
  };

  const apiUrl = envConfig.apiUrl;

  const handleRegistration = async () => {
    if (!firstName.trim()) {
      Alert.alert("Error", "First Name is Required");
      return;
    }
    if (!lastName.trim()) {
      Alert.alert("Error", "Last Name is Required");
      return;
    }
    // if (!email.trim()) {
    //   Alert.alert("Error", "Email is Required");
    //   return;
    // }
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
      city: "Pune",
      state: "Maharashtra",
      pincode: pincode.trim(),
      anugrahit: anugrahit.trim(),
      gender: gender.trim(),
    };
  
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("&&&&&Error***********", JSON.stringify(errorData));
        // If the server sends an error message, show it in an alert
        const errorMessage =
          errorData?.message;
        throw new Error(JSON.stringify(errorData));
      }
  
      const data = await response.json();
      Alert.alert("Success", "You have been registered successfully, Please login");
  
      // Clear the form after successful registration
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMobileNumber("");
      setAltMobileNumber("");
      setFlatNo("");
      setFullAddress("");
      setArea("");
      setLandmark("");
      setPincode("");
      setAnugrahit("no");
      setGender("male");
  
      // Navigate to the Login screen
      navigation.navigate("Login");
  
    } catch (error) {
      // Show the error message from the server or a generic message
      /* Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message || "An error occurred during registration.",
      }); */
      Alert.alert("Registration Failed!", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name *"
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
        placeholder="Last Name *"
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
        placeholder="Password *"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password *"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number *"
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
        placeholder="Flat No/House Name"
        value={flatNo}
        onChangeText={setFlatNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Address *"
        value={fullAddress}
        onChangeText={setFullAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Area *"
        value={area}
        onChangeText={setArea}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark *"
        value={landmark}
        onChangeText={setLandmark}
      />
      <TextInput
      style={styles.input}
      placeholder="City"
      value="Pune"
      editable={false} // Disable the TextInput
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        value="Maharashtra"
        editable={false} 
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode *"
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
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  pickerContainer: {
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default RegisterScreen;
