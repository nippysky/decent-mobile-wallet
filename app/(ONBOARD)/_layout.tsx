import React from "react";
import { Stack } from "expo-router";

export default function OnboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth-page" />
      <Stack.Screen name="create-wallet" />
      <Stack.Screen name="import-wallet" />
      <Stack.Screen name="pin/create-pin" />
      <Stack.Screen name="pin/confirm-pin" />
    </Stack>
  );
}
