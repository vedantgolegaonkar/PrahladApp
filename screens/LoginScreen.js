import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Constants from 'expo-constants';
import Toast from "react-native-toast-message";


const LoginScreen = ({ navigation, onLogin, onAdminLogin }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  

  const adminCredentials = {
    mobileNumber: '8825784512',
    password: "A",
  };
  
    // Determine the environment safely
    const appEnv = (Constants.manifest && Constants.manifest.releaseChannel) || 'dev';
    const envConfig = Constants.manifest?.extra?.[appEnv] || { apiUrl: 'http://192.168.1.9:5000' }; // Default API URL
  
    // Use the environment-specific API URL
    const apiUrl = envConfig.apiUrl;
  
    const handleLogin = async () => {
      // Basic validation for mobile number and password fields
      if (!mobileNumber.trim()) {
        Alert.alert("Error", "Mobile Number is Required");
        return;
      }
      if (!password.trim()) {
        Alert.alert("Error", "Password is Required");
        return;
      }
    
      if (
        mobileNumber === adminCredentials.mobileNumber &&
        password === adminCredentials.password
      ) {
        onAdminLogin();
          return;
        }

      // Create the payload for the login request
      const payload = {
        mobile_number: mobileNumber.trim(),
        password: password.trim(),
      };
    
      try {
        console.log('###################');
        console.log('URL IS', `${apiUrl}/login`);
        console.log('###################');
        console.log('PAYLOAD IS', JSON.stringify(payload));
        console.log('###################');
    
        // Send the login request to the backend
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        console.log('RESPONSE IS ******', JSON.stringify(response));
    
        // Check if the login was successful
        if (!response.ok) {
          throw new Error("Login failed. Please check your mobile number and password.");
        }
    
        const data = await response.json(); // Parse the response
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "You have been logged in successfully",
        });
    
        // Optionally, navigate to the home page or dashboard after successful login
       onLogin(navigation);
    
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.message || "An error occurred during login.",
        });
      }
      
    
      
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate("Register")} style={styles.link}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
    height: 40,
    borderColor: "#cccccc",
  },
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
  link: { color: "blue", marginTop: 16, textAlign: "center" },
});

export default LoginScreen;
