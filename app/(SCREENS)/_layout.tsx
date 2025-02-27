import React from "react";
import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="wallet" />
      <Stack.Screen name="send" />
      <Stack.Screen name="recieve" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="token" />
      <Stack.Screen name="backup/backup-note" />
      <Stack.Screen name="backup/enter-pin" />
      <Stack.Screen name="backup/backup-seedphrase" />
      <Stack.Screen name="confirmations/send-native-confirm" />
      <Stack.Screen name="confirmations/send-tokens-confirm" />
    </Stack>
  );
}
