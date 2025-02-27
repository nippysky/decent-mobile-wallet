import {
  ActivityIndicator,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { HEADING_BOLD, INFO_TEXT, NORMAL_TEXT } from "@/lib/constants/font";
import { COLORS } from "@/lib/constants/colors";
import QRCode from "react-native-qrcode-svg";
import { FontAwesome6, Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { getWalletData } from "@/lib/constants/secure-wallet";
import Toast from "react-native-toast-message";

export default function Receive() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch wallet address on component mount
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const { address } = await getWalletData();
        setWalletAddress(address);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletAddress();
  }, []);

  // Share Address Function
  const shareAddress = async () => {
    try {
      const result = await Share.share({
        message: walletAddress as string,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.error("Oops! Failed to share address", error);
    }
  };

  // Copy Address Function
  const copyAddress = async () => {
    try {
      await Clipboard.setStringAsync(walletAddress as string);
      Toast.show({
        type: "info",
        text1: "Address copied to clipboard",
      });
    } catch (error) {
      console.error("Oops! Failed to copy address", error);
      alert("Failed to copy address. Please try again.");
    }
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

        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={HEADING_BOLD}>Receive</Text>
          <Text style={[INFO_TEXT, styles.headerSubtext]}>
            Send only Electronuem (ETN) and tokens in the ETN network to this
            address, or it won't be displayed on this app.
          </Text>
        </View>

        {/* QR Code Box */}
        {loading ? (
          <ActivityIndicator color={COLORS.decentPrimary} />
        ) : (
          <View style={styles.qrCodeContainer}>
            <QRCode value={walletAddress as string} size={250} />
            <View style={styles.addressTextContainer}>
              <Text style={[NORMAL_TEXT, styles.addressText]}>
                {walletAddress as string}
              </Text>
            </View>
          </View>
        )}

        {/* Copy & Share Buttons */}
        <View style={styles.actionButtonsContainer}>
          {/* Copy Button */}
          <TouchableOpacity style={styles.actionButton} onPress={copyAddress}>
            <Text style={[INFO_TEXT, styles.actionButtonText]}>Copy</Text>
            <Ionicons
              name="copy-sharp"
              size={15}
              color={COLORS.decentPrimary}
            />
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity style={styles.actionButton} onPress={shareAddress}>
            <Text style={[INFO_TEXT, styles.actionButtonText]}>Share</Text>
            <Octicons name="share" size={20} color={COLORS.decentPrimary} />
          </TouchableOpacity>
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
  headerSubtext: {
    marginTop: 10,
    textAlign: "center",
  },
  qrCodeContainer: {
    width: "100%",
    marginVertical: 50,
    backgroundColor: COLORS.white,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addressTextContainer: {
    width: "100%",
    marginTop: 20,
  },
  addressText: {
    color: COLORS.black,
    textAlign: "center",
  },
  actionButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButtonText: {
    color: COLORS.decentPrimary,
  },
});
