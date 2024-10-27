import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import AdminDashboard from "../screens/AdminDashboard";
import UserDashboard from "../screens/UserDashboard";
import SlotBookingScreen from "../screens/SlotBookingScreen";
import MembersDetailsScreen from "../screens/MembersDetailsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleUserLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 500);
  };

  const handleAdminLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAdminLoggedIn(true);
    }, 500);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff4500" />
      </View>
    );
  }

  const addBooking = (slot) => {
    setBookings([...bookings, slot]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 500);
  };

  // Bottom Tab Navigator for User
  const UserTabNavigator = () => (
    <Tab.Navigator>
      <Tab.Screen
        name="UserDashboard"
        options={{ headerShown: false }}
      >
        {(props) => (
          <UserDashboard
            {...props}
            bookings={bookings}
            handleLogout={handleLogout}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="SlotBooking">
        {(props) => (
          <SlotBookingScreen {...props} addBooking={addBooking} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );

  // Bottom Tab Navigator for Admin
  const AdminTabNavigator = () => (
    <Tab.Navigator>
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MembersDetails"
        component={MembersDetailsScreen}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="UserTabNavigator"
            component={UserTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : isAdminLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="AdminTabNavigator"
            component={AdminTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                onLogin={handleUserLogin}
                onAdminLogin={handleAdminLogin}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => (
              <RegisterScreen
                {...props}
                onRegister={() => handleRegister(props.navigation)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      )}
      <Toast />
    </NavigationContainer>
  );
};

export default AppNavigator;
