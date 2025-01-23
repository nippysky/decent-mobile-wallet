import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

const LOCK_TIME = 3000;

export default function UserInactivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    const isFirstTime = await AsyncStorage.getItem("isFirstTimeUser");

    if (nextAppState === "inactive") {
      router.push("/(modals)/minimize");
    } else {
      if (router.canGoBack()) {
        router.back();
      }
    }

    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match("background") &&
      isFirstTime !== null
    ) {
      const elapsed =
        Date.now() - (Number(await AsyncStorage.getItem("startTime")) || 0);
      if (elapsed >= LOCK_TIME) router.push("/(modals)/lockscreen");
    }

    appState.current = nextAppState;
  };

  const recordStartTime = async () => {
    await AsyncStorage.setItem("startTime", `${Date.now()}`);
  };

  return children;
}
