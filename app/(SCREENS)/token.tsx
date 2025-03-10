import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { COLORS } from "@/lib/constants/colors";
import { HEADING_BOLD, INFO_TEXT, NORMAL_TEXT } from "@/lib/constants/font";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { formatNumberCustom } from "@/lib/utils";
import * as Linking from "expo-linking";

export default function Token() {
  const { name, balance, symbol, contractAddress, icon } =
    useLocalSearchParams();

  const handleOpenExplorer = () => {
    Linking.openURL(
      `https://blockexplorer.electroneum.com/address/${contractAddress}`
    ).catch((err) => console.error("Failed to open Explorer:", err));
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
          <Text style={HEADING_BOLD}>{name}</Text>
        </View>

        {/* ////PRICE & LOGO ///// */}
        <View style={styles.priceLogo}>
          <View style={{ flexDirection: "column", gap: 5 }}>
            <Text style={HEADING_BOLD}>$-</Text>
            <Text style={[INFO_TEXT, { color: COLORS.decentAltText }]}>
              Current Price
            </Text>
          </View>

          <Image
            source={{
              uri: `${icon}`,
            }}
            width={50}
            height={50}
          />
        </View>

        {/* /////// AMOUNT & AmountInPrice////////  */}
        <View style={styles.amountValue}>
          <Text style={HEADING_BOLD}>
            {formatNumberCustom(Number(balance))} {symbol}
          </Text>
          <Text style={[NORMAL_TEXT, { color: COLORS.decentAltText }]}>-</Text>
        </View>

        {/* //////SEND , RECIEEVE, EXPLORER */}
        <View style={styles.sendReceiveContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/(SCREENS)/send")}
          >
            <FontAwesome6 name="arrow-up-long" size={24} color={COLORS.white} />
            <Text style={INFO_TEXT}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/(SCREENS)/recieve")}
          >
            <FontAwesome6
              name="arrow-down-long"
              size={24}
              color={COLORS.white}
            />
            <Text style={INFO_TEXT}>Receive</Text>
          </TouchableOpacity>

          {symbol !== "ETN" && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleOpenExplorer}
            >
              <Feather name="external-link" size={24} color={COLORS.white} />
              <Text style={INFO_TEXT}>Contract</Text>
            </TouchableOpacity>
          )}
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

  sendReceiveContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 75,
    marginTop: 85,
    paddingBottom: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.decentAltLight,
  },
  actionButton: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  priceLogo: {
    width: "100%",
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amountValue: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
