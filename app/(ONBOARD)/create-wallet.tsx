import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import BackButton from "@/lib/components/shared/BackButton";
import {
  BUTTON_TEXT,
  HEADING_BOLD,
  INFO_TEXT,
  NORMAL_TEXT,
} from "@/lib/constants/font";
import { COLORS } from "@/lib/constants/colors";
import TabToggleSelector from "@/lib/components/shared/TabToggleSelector";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { useFetchData } from "@/lib/api"; // Use useFetchData for GET requests
import { saveWalletData } from "@/lib/constants/secure-wallet";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for the API response
type WalletResponse = {
  message: string;
  walletDetails: {
    address: string;
    passphrase: string;
  };
};

export default function CreateWallet() {
  const [selectedOption, setSelectedOption] = useState<number | null>(12);
  const [isCheckedOne, setCheckedOne] = useState(false);
  const [isCheckedTwo, setCheckedTwo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionSelect = (value: string | number) => {
    const numericValue =
      typeof value === "number" ? value : parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setSelectedOption(numericValue);
    }
  };

  const isContinueDisabled = !(isCheckedOne && isCheckedTwo);

  const handleContinue = async () => {
    if (selectedOption === null) return;

    setIsLoading(true);

    try {
      // Use useFetchData to trigger the GET request
      const response = await refetch(); // Manually trigger the fetch

      // Type the response data
      const data = response.data as WalletResponse;

      // Show success toast with the response message
      Toast.show({
        type: "success",
        text1: "Success",
        text2: data.message, // Use the message from the API response
      });

      // Save wallet data to SecureStore
      await saveWalletData(
        data.walletDetails.address,
        data.walletDetails.passphrase
      );

      await AsyncStorage.setItem(
        "isFirstTimeUser",
        JSON.stringify({ address: data.walletDetails.address })
      );

      // Navigate to the next screen
      router.push("/(ONBOARD)/pin/create-pin");
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create wallet. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Use useFetchData to fetch data
  const { refetch } = useFetchData(`/api/etn/create-wallet/${selectedOption}`);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Back Button */}
        <BackButton />

        {/* Header Text */}
        <View style={styles.headText}>
          <Text style={HEADING_BOLD}>Secret Phrase Option</Text>
        </View>

        {/* Toggle Selector */}
        <View style={styles.toggleContainer}>
          <TabToggleSelector
            options={[
              { label: "12 Words", value: 12 },
              { label: "24 Words", value: 24 },
            ]}
            onOptionSelect={handleOptionSelect}
          />

          <Text style={[styles.selectionText, NORMAL_TEXT]}>
            You have chosen to proceed with a{" "}
            {selectedOption ? `${selectedOption}-word` : "12-word or 24-word"}{" "}
            secret phrase.
          </Text>
        </View>

        {/* Agreement Section */}
        <View style={styles.agreement}>
          <Text
            style={[
              styles.agreementText,
              NORMAL_TEXT,
              { color: COLORS.decentAltText },
            ]}
          >
            Agree to the below, and check all boxes to continue.
          </Text>

          {/* Checkbox Items */}
          <View style={styles.checkboxContainer}>
            <CheckboxItem
              isChecked={isCheckedOne}
              setChecked={setCheckedOne}
              text="Decentroneum does not keep a copy of any of your wallet information."
            />
            <CheckboxItem
              isChecked={isCheckedTwo}
              setChecked={setCheckedTwo}
              text="Your secret phrase should be kept secret as it is the master key to your wallet."
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              BUTTONSTYLE,
              styles.continueButton,
              isContinueDisabled && styles.disabledButton,
            ]}
            activeOpacity={0.5}
            onPress={handleContinue}
            disabled={isContinueDisabled || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={BUTTON_TEXT}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

// Reusable Checkbox Component
const CheckboxItem = ({
  isChecked,
  setChecked,
  text,
}: {
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  text: string;
}) => (
  <TouchableOpacity
    style={styles.checkboxItem}
    onPress={() => setChecked(!isChecked)}
  >
    <Checkbox
      style={styles.checkbox}
      value={isChecked}
      onValueChange={setChecked}
      color={isChecked ? COLORS.decentPrimary : undefined}
    />
    <Text
      style={[
        INFO_TEXT,
        { color: isChecked ? COLORS.white : COLORS.decentAltText, flex: 1 },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },

  headText: {
    alignItems: "center",
    marginTop: 25,
  },

  toggleContainer: {
    flex: 1,
    marginVertical: 25,
    alignItems: "center",
  },

  selectionText: {
    color: COLORS.white,
    marginTop: 20,
    textAlign: "center",
  },

  agreement: {
    flex: 1,
    paddingBottom: 50,
    justifyContent: "flex-end",
  },

  agreementText: {
    textAlign: "center",
    paddingHorizontal: 30,
    lineHeight: 22,
  },

  checkboxContainer: {
    marginVertical: 10,
  },

  checkboxItem: {
    backgroundColor: COLORS.decentAlt,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 5,
    borderRadius: 10,
  },

  checkbox: {
    margin: 8,
  },

  continueButton: {
    marginTop: 20,
  },

  disabledButton: {
    opacity: 0.5,
  },
});
