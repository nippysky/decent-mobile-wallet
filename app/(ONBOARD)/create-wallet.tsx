import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import BackButton from "@/lib/components/shared/BackButton";
import { BUTTON_TEXT, HEADING_BOLD, NORMAL_TEXT } from "@/lib/constants/font";
import { COLORS } from "@/lib/constants/colors";
import TabToggleSelector from "@/lib/components/shared/TabToggleSelector";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import { router } from "expo-router";

export default function CreateWallet() {
  const handleOptionSelect = (value: string | number) => {
    console.log("Selected option:", value);
    // Use this value in your API or other logic
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, paddingVertical: 20 }}>
        {/* Back Button */}
        <BackButton />

        {/* ////////////HEAD TEXT/////////// */}
        <View style={styles.headText}>
          <Text style={[HEADING_BOLD, { textAlign: "center" }]}>
            Secret Phrase Option
          </Text>
          <Text style={[NORMAL_TEXT, styles.headTextDesc]}>
            Your pass phrase should be kept in secret and is the master key to
            your wallet
          </Text>
        </View>

        {/* ///////////////TOGGLE TAB////////////////////// */}
        <View style={{ flex: 1, marginVertical: 25 }}>
          <TabToggleSelector
            options={[
              { label: "12 Words", value: 12 },
              { label: "24 Words", value: 24 },
            ]}
            onOptionSelect={handleOptionSelect}
          />
        </View>

        {/* //////////// AGRREMENT ///////// */}
        <View style={styles.agreement}>
          <View style={[styles.headText]}>
            <Text style={[NORMAL_TEXT, styles.headTextDesc]}>
              Agree to the below, and check all boxes to continue.
            </Text>
          </View>
          <TouchableOpacity
            style={[BUTTONSTYLE, { marginTop: 50 }]}
            activeOpacity={0.5}
            onPress={() => router.push("/(ONBOARD)/create-wallet")}
          >
            <Text style={BUTTON_TEXT}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headText: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 25,
  },

  headTextDesc: {
    textAlign: "center",
    paddingHorizontal: 30,
    color: COLORS.decentAltText,
    lineHeight: 22,
  },

  agreement: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 50,
    justifyContent: "flex-end",
  },
});
