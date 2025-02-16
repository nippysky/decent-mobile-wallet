import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { HEADING_BOLD, INFO_TEXT } from "@/lib/constants/font";
import { shortenAddress } from "@/lib/utils";
import { COLORS } from "@/lib/constants/colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TokenCard from "@/lib/components/shared/TokenCard";
import { getWalletData } from "@/lib/constants/secure-wallet";
import { usePostData } from "@/lib/api";

// Define API response structure
interface Token {
  name: string;
  symbol: string;
  balance: number;
  contractAddress?: string; // Not required for native token
  icon: string;
}

export default function WalletScreen() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [nativeToken, setNativeToken] = useState<Token | null>(null);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [loadingNative, setLoadingNative] = useState(false);

  // Fetch Wallet Address on Component Mount
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const { address } = await getWalletData();
        setWalletAddress(address);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      } finally {
        setLoadingWallet(false);
      }
    };

    fetchWalletAddress();
  }, []);

  // Fetch Native Token (ETN) Balance
  const { mutate: fetchNativeToken } = usePostData<
    { address: string },
    { balance: number }
  >("/api/mainnet");

  useEffect(() => {
    if (walletAddress) {
      setLoadingNative(true);
      fetchNativeToken(
        { address: walletAddress },
        {
          onSuccess: (response) => {
            console.log("Fetched Native Token Balance:", response.balance);
            setNativeToken({
              name: "Electroneum",
              symbol: "ETN",
              balance: response.balance,
              icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2137.png",
            });
          },
          onError: (error) => {
            console.error("Error fetching native token balance:", error);
          },
          onSettled: () => {
            setLoadingNative(false);
          },
        }
      );
    }
  }, [walletAddress]);

  // Fetch Other Tokens Immediately After Wallet Address is Available
  const { mutate: fetchTokens } = usePostData<
    { address: string },
    { tokens: Token[] }
  >("/api/mainnet/tokens");

  useEffect(() => {
    if (walletAddress) {
      setLoadingTokens(true);
      fetchTokens(
        { address: walletAddress },
        {
          onSuccess: (response) => {
            console.log("Fetched Tokens:", response.tokens);
            setTokens(response.tokens);
          },
          onError: (error) => {
            console.error("Error fetching tokens:", error);
          },
          onSettled: () => {
            setLoadingTokens(false);
          },
        }
      );
    }
  }, [walletAddress]);

  return (
    <ScreenWrapper>
      <ScrollView>
        {/* Screen Head */}
        <View style={styles.screenHead}>
          <View style={styles.screenHeadCenter}>
            <TouchableOpacity style={styles.addressContainer}>
              {loadingWallet ? (
                <ActivityIndicator color={COLORS.decentPrimary} />
              ) : (
                <Text style={[HEADING_BOLD, { fontSize: 18 }]}>
                  {walletAddress
                    ? shortenAddress(walletAddress)
                    : "No Wallet Found"}
                </Text>
              )}
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
            {loadingNative ? (
              <ActivityIndicator size="large" color={COLORS.decentPrimary} />
            ) : nativeToken ? (
              <TokenCard
                key="native-token"
                iconUri={nativeToken.icon}
                tokenName={nativeToken.name}
                tokenSymbol={nativeToken.symbol}
                amount={String(nativeToken.balance)}
                onPress={() => router.push("/(SCREENS)/token")}
              />
            ) : null}

            {loadingTokens ? (
              <ActivityIndicator size="large" color={COLORS.decentPrimary} />
            ) : tokens.length > 0 ? (
              tokens.map((token, index) => (
                <TokenCard
                  key={index}
                  iconUri={token.icon}
                  tokenName={token.name}
                  tokenSymbol={token.symbol}
                  amount={String(token.balance)}
                  onPress={() => router.push("/(SCREENS)/token")}
                />
              ))
            ) : (
              <Text style={styles.noTokensText}>No Tokens Found</Text>
            )}
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
  noTokensText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.decentAltText,
    marginTop: 20,
  },
});
