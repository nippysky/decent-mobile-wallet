import React from "react";
import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="send" />
      <Stack.Screen name="recieve" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
