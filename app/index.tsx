import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { COLORS } from "@/lib/constants/colors";

export default function InitialRoute() {
  const [newUser, setNewUser] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem("isFirstTimeUser");
        if (isFirstTime === null) {
          setNewUser(true);
        } else {
          setNewUser(false);
        }
      } catch (error) {
        console.error("Error checking first time user:", error);
      }
    };

    checkFirstTimeUser();
  }, []);

  if (newUser === null) {
    // Show a loading spinner while checking
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.black,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.decentPrimary} />
      </View>
    );
  }

  return (
    <>
      {newUser ? (
        <Redirect href="/(ONBOARD)/auth-page" />
      ) : (
        <Redirect href="/(ONBOARD)/auth-page" />
      )}
    </>
  );
}
