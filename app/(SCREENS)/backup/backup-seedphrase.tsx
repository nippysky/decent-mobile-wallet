import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/lib/constants/colors";
import { BUTTON_TEXT, HEADING_BOLD, INFO_TEXT } from "@/lib/constants/font";
import { SafeAreaView } from "react-native-safe-area-context";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import { router } from "expo-router";

export default function BackupSeedPhrase() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.black, padding: 20 }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={HEADING_BOLD}>Recovery Phrase</Text>
          <Text style={[INFO_TEXT, styles.headerSubtext]}>
            Write down these words accordingly and store them in a safe place.
          </Text>
        </View>

        {/* PHRASE */}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={[
              HEADING_BOLD,
              {
                color: COLORS.decentPrimary,
                textAlign: "center",
                lineHeight: 40,
              },
            ]}
          >
            lady does destroy word cannot their numbers and store them in a safe
            place
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[BUTTONSTYLE, { marginBottom: 30 }]}
          activeOpacity={0.5}
          onPress={() => router.replace("/(TABS)/wallet")}
        >
          <Text style={BUTTON_TEXT}>Done backing up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  headerSubtext: {
    marginTop: 10,
    textAlign: "center",
  },
});
