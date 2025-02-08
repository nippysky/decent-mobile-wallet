import React, { useState, useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import PinScreen from "@/lib/components/shared/PinScreen";
import { router } from "expo-router";
import { getPin } from "@/lib/constants/secure-wallet";
import * as Haptics from "expo-haptics";

export default function BackupEnterPIN() {
  // Initialize state with null
  const [pin, setPin] = useState<string | null>(null);

  // Function to fetch the PIN
  const fetchPin = async () => {
    const result = await getPin();
    setPin(result);
  };

  // Call fetchPin on component mount
  useEffect(() => {
    fetchPin();
  }, []);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  ); // Change to string | undefined
  const shakeAnimation = useRef(new Animated.Value(0)).current; // For shake animation

  // Function to trigger shake animation
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSubmit = async (result: string | boolean) => {
    // Since ConfirmPIN only deals with boolean (matching PINs), cast result to boolean
    const isMatch = result as boolean;

    if (isMatch) {
      router.push("backup/backup-seedphrase");
    } else {
      // Trigger haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      // Trigger shake animation
      triggerShake();

      // Display error message
      setErrorMessage("PINs do not match. Try again.");

      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage(undefined); // Use undefined instead of null
      }, 3000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PinScreen
        title="Enter Your PIN"
        mode="confirm"
        validationPin={pin as string}
        onSubmit={handleSubmit} // Pass the updated onSubmit function
        shakeAnimation={shakeAnimation} // Pass shake animation to PinScreen
        errorMessage={errorMessage} // Pass error message to PinScreen
      />
    </View>
  );
}
