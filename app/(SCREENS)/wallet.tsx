import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { HEADING_BOLD, INFO_TEXT } from "@/lib/constants/font";
import { shortenAddress } from "@/lib/utils";
import { COLORS } from "@/lib/constants/colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TokenCard from "@/lib/components/shared/TokenCard";
import { getWalletData } from "@/lib/constants/secure-wallet";
import { usePostData } from "@/lib/api";
import { Token } from "@/lib/constants/types";

export default function WalletScreen() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [nativeToken, setNativeToken] = useState<Token | null>(null);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Fetch Native Token (ETN)
  const { mutateAsync: fetchNativeToken, isLoading: isLoadingNative } =
    usePostData<{ address: string }, { balance: number }>("/api/mainnet");

  const fetchNative = useCallback(async () => {
    if (walletAddress) {
      try {
        const response = await fetchNativeToken({ address: walletAddress });
        console.log("Fetched Native Token Balance:", response.balance);
        setNativeToken({
          name: "Electroneum",
          symbol: "ETN",
          balance: response.balance,
          icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2137.png",
        });
      } catch (error) {
        console.error("Error fetching native token balance:", error);
      }
    }
  }, [walletAddress]);

  // Fetch Other Tokens
  const { mutateAsync: fetchTokens, isLoading: isLoadingTokens } = usePostData<
    { address: string },
    { tokens: Token[] }
  >("/api/mainnet/tokens");

  const fetchAllTokens = useCallback(async () => {
    if (walletAddress) {
      try {
        const response = await fetchTokens({ address: walletAddress });
        console.log("Fetched Tokens:", response.tokens);
        setTokens(response.tokens);
        setFilteredTokens(response.tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchNative();
    fetchAllTokens();
  }, [walletAddress]);

  // Pull-to-Refresh Handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNative();
    await fetchAllTokens();
    setRefreshing(false); // Stop refreshing only after API calls complete
  }, [fetchNative, fetchAllTokens]);

  // Search Functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTokens(tokens);
    } else {
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTokens(filtered);
    }
  }, [searchQuery, tokens]);

  // ✅ Unified Loading State (only one loader)
  const isLoading = isLoadingNative || isLoadingTokens;

  return (
    <ScreenWrapper>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.decentPrimary]}
          />
        }
      >
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* ✅ Unified Loading Indicator */}
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.decentPrimary}
              style={styles.loadingIndicator}
            />
          ) : (
            <View style={styles.tokensList}>
              {/* Native Token (ETN) */}
              {nativeToken && (
                <TokenCard
                  key="native-token"
                  iconUri={nativeToken.icon}
                  tokenName={nativeToken.name}
                  tokenSymbol={nativeToken.symbol}
                  amount={String(nativeToken.balance)}
                  onPress={() =>
                    router.push({
                      pathname: "/(SCREENS)/token",
                      params: {
                        name: nativeToken.name,
                        balance: nativeToken.balance,
                        symbol: nativeToken.symbol,
                        contractAddress: nativeToken.contractAddress,
                        icon: nativeToken.icon,
                      },
                    })
                  }
                />
              )}

              {/* Other Tokens */}
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token, index) => (
                  <TokenCard
                    key={index}
                    iconUri={token.icon}
                    tokenName={token.name}
                    tokenSymbol={token.symbol}
                    amount={String(token.balance)}
                    onPress={() =>
                      router.push({
                        pathname: "/(SCREENS)/token",
                        params: {
                          name: token.name,
                          balance: token.balance,
                          symbol: token.symbol,
                          contractAddress: token.contractAddress,
                          icon: token.icon,
                        },
                      })
                    }
                  />
                ))
              ) : (
                <Text style={styles.noTokensText}>No Tokens Found</Text>
              )}
            </View>
          )}
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
  loadingIndicator: {
    marginTop: 20,
    alignSelf: "center",
  },
  noTokensText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.decentAltText,
    marginTop: 20,
  },
});
