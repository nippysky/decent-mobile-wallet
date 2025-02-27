import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { COLORS } from "@/lib/constants/colors";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  BUTTON_TEXT,
  HEADING_BOLD,
  INFO_TEXT,
  NORMAL_TEXT,
} from "@/lib/constants/font";
import * as Clipboard from "expo-clipboard";
import { BUTTONSTYLE } from "@/lib/constants/styles";
import { Modal, Searchbar, Card } from "react-native-paper";
import { getTokenData } from "@/lib/constants/secure-wallet";
import { Token } from "@/lib/constants/types";

export default function Send() {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch saved tokens from Secure Store
  useEffect(() => {
    const fetchTokens = async () => {
      const savedTokens = await getTokenData();
      if (savedTokens) {
        setTokens(savedTokens);
        setSelectedToken(savedTokens[0]); // ✅ Default to the first token
      }
    };

    fetchTokens();
  }, []);

  // Function to paste copied text into Receiver Address
  const pasteReceiverAddress = async (): Promise<void> => {
    try {
      const text = await Clipboard.getStringAsync();
      setReceiverAddress(text);
    } catch (error) {
      console.error("Oops! Failed to paste address", error);
    }
  };

  // Function to handle token selection
  const handleTokenSelection = (token: Token): void => {
    setSelectedToken(token);
    setIsModalVisible(false);
  };

  // Function to handle MAX button
  const handleMax = () => {
    if (selectedToken && selectedToken.balance > 0) {
      setAmount(selectedToken.balance.toString());
    }
  };

  // Function to handle Continue button press
  const handleContinue = () => {
    if (!selectedToken || !amount || !receiverAddress) return;

    const isNativeToken = selectedToken.symbol === "ETN";
    const nextScreen = isNativeToken
      ? "/(SCREENS)/confirmations/send-native-confirm"
      : "/(SCREENS)/confirmations/send-tokens-confirm";

    router.push({
      pathname: nextScreen,
      params: {
        amount,
        receiverAddress,
        name: selectedToken.name,
        symbol: selectedToken.symbol,
        icon: selectedToken.icon,
        balance: selectedToken.balance,
        contractAddress: selectedToken.contractAddress,
      },
    });
  };

  // Disable continue button if inputs are empty or amount is 0
  const isContinueDisabled =
    !amount.trim() || !receiverAddress.trim() || Number(amount) === 0;

  // Disable amount input if balance is 0
  const isAmountDisabled = selectedToken?.balance === 0;

  // Filter tokens based on search query
  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={HEADING_BOLD}>Send</Text>
          </View>

          {/* //////////////SEND COMPONENT //////////////// */}
          <View style={{ width: "100%", marginTop: 50 }}>
            {/* Receiver Address Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Receiver Address"
                  placeholderTextColor={COLORS.decentAltText}
                  value={receiverAddress}
                  onChangeText={setReceiverAddress}
                />
                <TouchableOpacity
                  style={styles.paste}
                  onPress={pasteReceiverAddress}
                >
                  <Text style={NORMAL_TEXT}>Paste</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Amount Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    isAmountDisabled && { opacity: 0.5 }, // ✅ Greyed out when disabled
                  ]}
                  placeholder="Amount"
                  placeholderTextColor={COLORS.decentAltText}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  editable={!isAmountDisabled} // ✅ Disables input if balance is 0
                />

                {/* Select Token */}
                <TouchableOpacity
                  style={styles.selectToken}
                  onPress={() => setIsModalVisible(true)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {selectedToken && (
                      <>
                        <Image
                          source={{ uri: selectedToken.icon }}
                          width={20}
                          height={20}
                        />
                        <Text style={[INFO_TEXT, { color: COLORS.white }]}>
                          {selectedToken.symbol}
                        </Text>
                      </>
                    )}
                  </View>
                  <Entypo name="select-arrows" size={15} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Show Error Message if Balance is 0 */}
            {isAmountDisabled && (
              <Text style={styles.errorText}>
                You do not have enough balance to perform this transaction.
              </Text>
            )}

            {/* Remaining & Max */}
            <View style={styles.remainAmount}>
              <Text style={INFO_TEXT}>
                Remaining{" "}
                {selectedToken ? selectedToken.balance.toFixed(5) : "0"}{" "}
                {selectedToken ? selectedToken.symbol : ""}
              </Text>
              <TouchableOpacity onPress={handleMax} disabled={isAmountDisabled}>
                <Text
                  style={[
                    NORMAL_TEXT,
                    {
                      color: isAmountDisabled
                        ? COLORS.decentAltText
                        : COLORS.decentPrimary,
                    },
                  ]}
                >
                  MAX
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={[
              BUTTONSTYLE,
              { marginTop: 70, opacity: isContinueDisabled ? 0.5 : 1 },
            ]}
            activeOpacity={0.5}
            onPress={handleContinue}
            disabled={isContinueDisabled}
          >
            <Text style={BUTTON_TEXT}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>

      {/* /////////////////////////////////////Token Selection Modal /////////////////////////*/}
      <Modal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Searchbar
            placeholder="Search Token"
            placeholderTextColor={COLORS.decentAltText}
            onChangeText={setSearchQuery}
            value={searchQuery}
            inputStyle={{ fontFamily: "NexaLight", color: COLORS.white }}
            style={styles.searchBar}
          />
          <ScrollView style={styles.cryptoList}>
            {filteredTokens.map((token, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTokenSelection(token)}
              >
                <Card style={styles.cryptoCard}>
                  <Card.Content style={styles.cryptoContent}>
                    <Image
                      source={{ uri: token.icon }}
                      width={30}
                      height={30}
                    />
                    <Text style={[styles.cryptoName, NORMAL_TEXT]}>
                      {token.name}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
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
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.decentAlt,
    paddingHorizontal: 15,
    height: 80,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: COLORS.white,
    fontSize: 20,
    fontFamily: "NexaLight",
  },
  paste: {
    width: "20%",
    backgroundColor: COLORS.decentAltLight,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  remainAmount: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  selectToken: {
    width: "40%",
    backgroundColor: COLORS.decentAltLight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Darker backdrop
  },
  modalContent: {
    width: "100%",
    maxHeight: "100%",
    backgroundColor: COLORS.decentAlt,
    padding: 20,
  },
  searchBar: {
    marginBottom: 10,
    borderRadius: 0,
    backgroundColor: COLORS.decentInput,
    fontFamily: "NexaLight",
  },
  cryptoList: {
    height: "100%",
    marginTop: 50,
  },
  cryptoCard: {
    marginBottom: 15,
    borderRadius: 0,
    backgroundColor: COLORS.decentAltLight,
  },
  cryptoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cryptoName: {
    color: COLORS.white,
    fontSize: 16,
  },
  cryptoSymbol: {
    color: COLORS.decentPrimary,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
  },
});
