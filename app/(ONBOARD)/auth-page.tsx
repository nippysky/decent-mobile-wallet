import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import {
  BUTTON_TEXT,
  HEADING_BOLD,
  INFO_TEXT,
  NORMAL_TEXT,
} from "@/lib/constants/font";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import { COLORS } from "@/lib/constants/colors";
import { router } from "expo-router";

export default function AuthPage() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Image */}
        <View style={styles.centre}>
          <Image
            source={require("@/assets/images/Logo.png")}
            style={{ width: 85, height: 85 }}
          />
        </View>

        {/* /////////////////////////////////////////// */}
        {/* Text */}
        <View style={[styles.centre, { marginVertical: 20 }]}>
          <Text style={[HEADING_BOLD, { textAlign: "center" }]}>
            Decent Wallet
          </Text>
          <Text
            style={[
              INFO_TEXT,
              { textAlign: "center", marginTop: 10, paddingHorizontal: 85 },
            ]}
          >
            Create a new wallet or add an existing one
          </Text>
        </View>

        {/* ////////////////////////////////// */}
        {/* Buttons */}
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            style={BUTTONSTYLE}
            activeOpacity={0.5}
            onPress={() => router.push("/(ONBOARD)/create-wallet")}
          >
            <Text style={BUTTON_TEXT}>Create New Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(ONBOARD)/import-wallet")}
            activeOpacity={0.5}
            style={[
              BUTTONSTYLE,
              { backgroundColor: COLORS.decentAlt, marginTop: 20 },
            ]}
          >
            <Text style={[BUTTON_TEXT, { color: COLORS.decentPrimary }]}>
              Import Existing Wallet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 50,
  },

  centre: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
