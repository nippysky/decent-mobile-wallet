import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/lib/constants/colors";
import { BUTTON_TEXT, HEADING_BOLD, INFO_TEXT } from "@/lib/constants/font";
import { SafeAreaView } from "react-native-safe-area-context";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import { router } from "expo-router";
import { getWalletData } from "@/lib/constants/secure-wallet";

export default function BackupSeedPhrase() {
  const [passphrase, setPassPhrase] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch wallet address on component mount
  useEffect(() => {
    const fetchPassPhrase = async () => {
      try {
        const { passphrase } = await getWalletData();
        setPassPhrase(passphrase);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassPhrase();
  }, []);

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
        <View style={styles.phrase}>
          {loading ? (
            <ActivityIndicator color={COLORS.decentPrimary} />
          ) : (
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
              {passphrase}
            </Text>
          )}
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[BUTTONSTYLE, { marginBottom: 30 }]}
          activeOpacity={0.5}
          onPress={() => router.replace("/(SCREENS)/wallet")}
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
  phrase: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
});
