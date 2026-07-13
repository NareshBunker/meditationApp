import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "../context/ThemeProvider";

// Set up initial route configuration for deep linking deep routing safety
export const unstable_settings = {
  initialRouteName: "login",
};

const Layout = () => {
  // Initialize State Variables
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load Custom Fonts
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  // Check Login State with Async Storage on mount
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const user = await AsyncStorage.getItem("userDetails");
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginState();
  }, []);

  // Show Loading Screen while checking login state or waiting for fonts
  if (isLoading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Set Up Navigation with Theme Support
  return (
    <ThemeProvider>
      <Stack
        initialRouteName={isLoggedIn ? "home" : "login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="SettingsScreen" />
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;