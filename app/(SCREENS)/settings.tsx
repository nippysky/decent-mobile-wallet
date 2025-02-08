import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { COLORS } from "@/lib/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import Backup from "@/assets/images/options/Backup";
import OptionCard from "@/lib/components/shared/OptionCard";
import Telegram from "@/assets/images/options/Telegram";
import X from "@/assets/images/options/x";

export default function Settings() {
  const handleTelegramPress = () => {
    Linking.openURL("https://t.me/DecentroneumChannel").catch((err) =>
      console.error("Failed to open Telegram link:", err)
    );
  };

  const handleXPress = () => {
    Linking.openURL("https://x.com/decentroneum").catch((err) =>
      console.error("Failed to open X link:", err)
    );
  };

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

        {/* //////////////OPTIONS /////////////////////// */}
        <View
          style={{
            width: "100%",
            backgroundColor: COLORS.decentAlt,
            paddingVertical: 30,
            paddingHorizontal: 20,
            marginVertical: 50,
          }}
        >
          <OptionCard
            title={"Backup your wallet"}
            onPress={() => router.push("/(SCREENS)/backup/backup-note")}
            icon={<Backup />}
          />
          <OptionCard
            title={"Join the Decentroneum channel"}
            onPress={handleTelegramPress}
            icon={<Telegram />}
          />
          <OptionCard
            title={"Follow Decentroneum on X"}
            onPress={handleXPress}
            icon={<X />}
          />
        </View>
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
});
