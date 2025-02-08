import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { HEADING_BOLD, INFO_TEXT } from "@/lib/constants/font";
import { shortenAddress } from "@/lib/utils";
import { COLORS } from "@/lib/constants/colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { TOKENS } from "@/lib/constants/app-data";
import TokenCard from "@/lib/components/shared/TokenCard";

export default function WalletScreen() {
  return (
    <ScreenWrapper>
      <ScrollView>
        {/* Screen Head */}
        <View style={styles.screenHead}>
          <View style={styles.screenHeadCenter}>
            <TouchableOpacity style={styles.addressContainer}>
              <Text style={[HEADING_BOLD, { fontSize: 18 }]}>
                {shortenAddress("0xe0806eC150E90b44122fCcf975A14D9aAafba429")}
              </Text>
              <Ionicons
                name="copy-sharp"
                size={15}
                color={COLORS.decentPrimary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push("/(SCREENS)/settings")}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={COLORS.decentAltText}
            />
          </TouchableOpacity>
        </View>

        {/* Send & Receive Buttons */}
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
        </View>

        {/* Tokens Section */}
        <View style={styles.tokensContainer}>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholderTextColor={COLORS.decentAltText}
              placeholder="Search Tokens ..."
              style={styles.searchInput}
            />
          </View>

          {/* Tokens List */}
          <View style={styles.tokensList}>
            {TOKENS.map((token, index) => (
              <TokenCard
                key={index}
                iconUri={token.iconUri}
                tokenName={token.tokenName}
                tokenSymbol={token.tokenSymbol}
                amount={token.amount}
                onPress={() => router.push("/(SCREENS)/token")}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  screenHead: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 20,
  },
  screenHeadCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  addressContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  sendReceiveContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
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
  tokensContainer: {
    width: "100%",
    marginTop: 30,
  },
  searchBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  searchInput: {
    width: "50%",
    backgroundColor: COLORS.decentInput,
    height: 35,
    paddingHorizontal: 15,
    color: COLORS.white,
    borderRadius: 20,
    fontFamily: "NexaLight",
  },
  tokensList: {
    width: "100%",
    marginTop: 30,
  },
});
