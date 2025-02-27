import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { COLORS } from "@/lib/constants/colors";
import { BUTTON_TEXT, HEADING_BOLD, NORMAL_TEXT } from "@/lib/constants/font";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { shortenAddress } from "@/lib/utils";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import { getWalletData } from "@/lib/constants/secure-wallet";
import { usePostData } from "@/lib/api"; // ✅ Import API hook
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";

export default function SendNativeConfirm() {
  const { amount, receiverAddress, name, symbol, icon } =
    useLocalSearchParams();
  const [sender, setSender] = useState<string | null>(null);
  const [userPassphrase, setUserPassphrase] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch sender address and passphrase from Secure Store
  useEffect(() => {
    const fetchWalletInfo = async () => {
      const walletData = await getWalletData();
      if (walletData) {
        setSender(walletData.address);
        setUserPassphrase(walletData.passphrase);
      }
    };

    fetchWalletInfo();
  }, []);

  // Send API Hook
  const { mutateAsync: sendTransaction } = usePostData<
    {
      sender: string;
      reciever: string;
      userPassphrase: string;
      amount: string;
    },
    { result: { status: number; transactionHash: string }; message?: string }
  >("/api/func/send-etn");

  // Handle Send Transaction
  const handleSend = async () => {
    if (!sender || !userPassphrase) {
      alert("Error: Unable to retrieve wallet details.");
      return;
    }

    setLoading(true);

    try {
      const response = await sendTransaction({
        sender,
        reciever: receiverAddress as string,
        userPassphrase,
        amount: amount as string,
      });

      console.log("Transaction Response:", response);

      if (response.result?.status === 1) {
        alert(
          "Transaction successful! 🎉\n\nTx Hash: " +
            response.result.transactionHash
        );
        router.replace("/(SCREENS)/wallet");
      } else {
        alert("Transaction failed: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copySenderAdd = async () => {
    try {
      await Clipboard.setStringAsync(sender as string);
      Toast.show({
        type: "info",
        text1: "Sender Address copied to clipboard",
      });
    } catch (error) {
      console.error("Oops! Failed to copy address", error);
      alert("Failed to copy address. Please try again.");
    }
  };
  const copyRecieverAdd = async () => {
    try {
      await Clipboard.setStringAsync(receiverAddress as string);
      Toast.show({
        type: "info",
        text1: "Receiver Address copied to clipboard",
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
          <Text style={[HEADING_BOLD, { fontSize: 22 }]}>Send {name}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Image source={{ uri: `${icon}` }} width={50} height={50} />
        </View>

        {/* ////////////////////////////////////////////////////////////////// */}
        <View style={{ width: "100%", marginTop: 50 }}>
          {/* Sender */}
          <View style={styles.receiptView}>
            <Text style={[NORMAL_TEXT, { fontFamily: "ManropeSemibold" }]}>
              Sender:
            </Text>
            <TouchableOpacity
              style={styles.addressContainer}
              onPress={copySenderAdd}
            >
              <Text style={[NORMAL_TEXT, { fontSize: 18 }]}>
                {shortenAddress(sender || "Fetching...")}
              </Text>
              <Ionicons
                name="copy-sharp"
                size={15}
                color={COLORS.decentPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* Receiver */}
          <View style={styles.receiptView}>
            <Text style={[NORMAL_TEXT, { fontFamily: "ManropeSemibold" }]}>
              Receiver:
            </Text>
            <TouchableOpacity
              style={styles.addressContainer}
              onPress={copyRecieverAdd}
            >
              <Text style={[NORMAL_TEXT, { fontSize: 18 }]}>
                {shortenAddress(receiverAddress as string)}
              </Text>
              <Ionicons
                name="copy-sharp"
                size={15}
                color={COLORS.decentPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* Amount */}
          <View style={styles.receiptView}>
            <Text style={[NORMAL_TEXT, { fontFamily: "ManropeSemibold" }]}>
              Amount:
            </Text>
            <Text style={[NORMAL_TEXT, { fontSize: 18 }]}>
              {amount} {symbol}
            </Text>
          </View>
        </View>

        {/* //////////////////////////////////////////////////////////////////////////// */}
        {/* BUTTON */}
        <TouchableOpacity
          style={[BUTTONSTYLE, { marginTop: 70, opacity: loading ? 0.5 : 1 }]}
          activeOpacity={0.5}
          onPress={handleSend}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={BUTTON_TEXT}>Send</Text>
          )}
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
  addressContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  receiptView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
