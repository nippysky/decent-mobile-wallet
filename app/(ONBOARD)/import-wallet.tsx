import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import BackButton from "@/lib/components/shared/BackButton";
import { BUTTON_TEXT, HEADING_BOLD, NORMAL_TEXT } from "@/lib/constants/font";
import { COLORS } from "@/lib/constants/colors";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import Toast from "react-native-toast-message";
import { usePostData } from "@/lib/api";
import { saveWalletData } from "@/lib/constants/secure-wallet";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define API response structure
interface WalletImportResponse {
  address: string;
  passphrase: string;
}

export default function ImportWallet() {
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");

  // API Hook
  const { mutate, isLoading } = usePostData<
    { userPassphrase: string },
    WalletImportResponse
  >("/api/etn/import-wallet");

  // Validate Recovery Phrase: Disable button if empty or more than 24 words
  const isButtonDisabled = useMemo(() => {
    const words = recoveryPhrase.trim().split(/\s+/);
    return recoveryPhrase.trim() === "" || words.length > 24;
  }, [recoveryPhrase]);

  // Handle Import
  const handleImport = () => {
    if (!isButtonDisabled) {
      mutate(
        { userPassphrase: recoveryPhrase.trim() },
        {
          onSuccess: async (response) => {
            // Ensure valid API response
            if (response?.address && response?.passphrase) {
              // Show success toast
              Toast.show({
                type: "success",
                text1: "Success",
                text2: "Wallet imported successfully!",
              });

              // Save wallet data securely
              await saveWalletData(response.address, response.passphrase);

              await AsyncStorage.setItem(
                "isFirstTimeUser",
                JSON.stringify({ address: response.address })
              );

              // Navigate to create PIN screen
              router.push("/(ONBOARD)/pin/create-pin");
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Invalid response from server.",
              });
            }
          },
          onError: (error) => {
            console.error("API Error:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to import wallet. Try again!",
            });
          },
        }
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Back Button */}
        <BackButton />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Head Text */}
          <View style={styles.headTextContainer}>
            <Text style={[HEADING_BOLD, styles.headText]}>
              Enter recovery phrase
            </Text>
            <Text style={[NORMAL_TEXT, styles.headTextDesc]}>
              Enter the 24 or 12 secret recovery words given to you when you
              created your wallet. Separate each word with a space.
            </Text>
          </View>

          {/* Multiline Text Input */}
          <View style={styles.inputContainer}>
            <TextInput
              multiline
              numberOfLines={10}
              style={styles.textInput}
              value={recoveryPhrase}
              onChangeText={setRecoveryPhrase}
              placeholder="Enter your recovery phrase..."
              placeholderTextColor={COLORS.decentAltText}
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[BUTTONSTYLE, isButtonDisabled && styles.disabledButton]}
            activeOpacity={0.5}
            onPress={handleImport}
            disabled={isButtonDisabled || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={BUTTON_TEXT}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  headTextContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  headText: {
    textAlign: "center",
  },
  headTextDesc: {
    textAlign: "center",
    paddingHorizontal: 15,
    marginTop: 10,
    color: COLORS.decentAltText,
    lineHeight: 22,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    minHeight: 150,
    backgroundColor: COLORS.decentAltLight,
    padding: 15,
    color: COLORS.white,
    textAlignVertical: "center",
    fontSize: 20,
    lineHeight: 30,
    fontFamily: "ManropeSemibold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
