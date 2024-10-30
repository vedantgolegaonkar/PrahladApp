import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import AdminDashboard from "../screens/AdminDashboard";
import UserDashboard from "../screens/UserDashboard";
import SlotBookingScreen from "../screens/SlotBookingScreen";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [home, setHome] = useState(null);

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

  const handleRegister = (details) => {
    setHome(details);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 500);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
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
            </Stack.Screen>
            <Stack.Screen name="SlotBooking">
              {(props) => (
                <SlotBookingScreen {...props} addBooking={addBooking} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen {...props}  home={home}/>
              )}
            </Stack.Screen>
        </Stack.Navigator>
      ) : isAdminLoggedIn ? (
        <Stack.Navigator>
           <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboard}
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
