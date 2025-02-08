import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { StatusBar } from "expo-status-bar";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [loaded] = useFonts({
    NexaBold: require("../assets/fonts/NexaBold.otf"),
    NexaLight: require("../assets/fonts/NexaLight.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" animated translucent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="index"
              options={{
                title: "",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen name="(ONBOARD)" />
            <Stack.Screen name="(TABS)" />
            <Stack.Screen name="(SCREENS)" />
          </Stack>
        </PaperProvider>
      </GestureHandlerRootView>

      <Toast />
    </>
  );
}
