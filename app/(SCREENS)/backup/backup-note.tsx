import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { COLORS } from "@/lib/constants/colors";
import {
  BUTTON_TEXT,
  HEADING_BOLD,
  INFO_TEXT,
  NORMAL_TEXT,
} from "@/lib/constants/font";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { BUTTONSTYLE } from "@/lib/constants/styles";

export default function BackupNote() {
  return (
    <ScreenWrapper>
      <ScrollView>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome6
              name="arrow-left-long"
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={HEADING_BOLD}>Attention</Text>
          <Text style={[INFO_TEXT, styles.headerSubtext]}>
            Please read the following carefully before viewing your recovery
            phrase
          </Text>
        </View>

        {/* Notes Section */}
        <View style={styles.notesContainer}>
          <View style={styles.noteItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={[styles.noteText, NORMAL_TEXT]}>
              Never give out your recovery phrase to anyone, no matter whatever
              reason.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={[styles.noteText, NORMAL_TEXT]}>
              Decentroncum support will never ask you for a recovery phrase.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={[styles.noteText, NORMAL_TEXT]}>
              Everybody with your recovery phrase can access your wallet.
            </Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[BUTTONSTYLE, { marginTop: 50 }]}
          activeOpacity={0.5}
          onPress={() => router.push("/(SCREENS)/backup/enter-pin")}
        >
          <Text style={BUTTON_TEXT}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    width: "100%",
    marginVertical: 10,
  },
  backButton: {
    width: "20%",
  },
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
  notesContainer: {
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  bulletPoint: {
    fontSize: 20,
    marginRight: 10,
    color: COLORS.white,
  },
  noteText: {
    flex: 1,
  },
});
