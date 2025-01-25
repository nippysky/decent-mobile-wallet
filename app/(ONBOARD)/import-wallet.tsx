import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import BackButton from "@/lib/components/shared/BackButton";
import { HEADING_BOLD, NORMAL_TEXT } from "@/lib/constants/font";
import { COLORS } from "@/lib/constants/colors";
import TabViewToggle from "@/lib/components/shared/TabViewToggle";
import TwelveWordsInput from "@/lib/components/auth/TwelveWordsInput";
import TwentyFourWordsInput from "@/lib/components/auth/TwentyFourWordsInput";

const tabOptions = [
  {
    label: "12 Words",
    content: <TwelveWordsInput />,
  },
  {
    label: "24 Words",
    content: <TwentyFourWordsInput />,
  },
];

export default function ImportWallet() {
  return (
    <ScreenWrapper>
      <ScrollView
        style={{ flex: 1, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <BackButton />

        {/* ////////////HEAD TEXT/////////// */}
        <View style={styles.headText}>
          <Text style={[HEADING_BOLD, { textAlign: "center" }]}>
            Enter recovery phrase
          </Text>
          <Text style={[NORMAL_TEXT, styles.headTextDesc]}>
            To restore access to your wallet, enter the 24 or 12 secret recovery
            words given to you when you created your wallet.
          </Text>
        </View>

        {/* ///////////////TOGGLE TAB////////////////////// */}
        <View style={{ flex: 1, marginTop: 20 }}>
          <TabViewToggle options={tabOptions} />
        </View>
      </ScrollView>
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
});
