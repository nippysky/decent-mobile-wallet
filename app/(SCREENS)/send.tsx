import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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

// Dummy cryptocurrency data
const dummyCryptos = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  },
  {
    id: 3,
    name: "Decent",
    symbol: "DECETN",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2137.png",
  },
  // Add more cryptocurrencies as needed
];

export default function Send() {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(dummyCryptos[2]); // Default to DECETN
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to paste copied text into Receiver Address
  const pasteReceiverAddress = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setReceiverAddress(text);
    } catch (error) {
      console.error("Oops! Failed to paste address", error);
    }
  };

  // Function to handle token selection
  const handleTokenSelection = (
    token: React.SetStateAction<{
      id: number;
      name: string;
      symbol: string;
      icon: string;
    }>
  ) => {
    setSelectedToken(token);
    setIsModalVisible(false);
  };

  // Filter cryptocurrencies based on search query
  const filteredCryptos = dummyCryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
                  style={styles.input}
                  placeholder="Amount"
                  placeholderTextColor={COLORS.decentAltText}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
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
                    <Image
                      source={{ uri: selectedToken.icon }}
                      width={20}
                      height={20}
                    />
                    <Text style={[INFO_TEXT, { color: COLORS.white }]}>
                      {selectedToken.symbol}
                    </Text>
                  </View>
                  <Entypo name="select-arrows" size={15} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remaining & Max */}
            <View style={styles.remainAmount}>
              <Text style={INFO_TEXT}>Remaining {"385, 000, 000"} ETN</Text>
              <TouchableOpacity>
                <Text style={[NORMAL_TEXT, { color: COLORS.decentPrimary }]}>
                  MAX
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={[BUTTONSTYLE, { marginTop: 70 }]}
            activeOpacity={0.5}
            onPress={() => {}}
          >
            <Text style={BUTTON_TEXT}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>

      {/* Token Selection Modal */}
      <Modal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Searchbar
            placeholder="Search Cryptocurrency"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
          <ScrollView style={styles.cryptoList}>
            {filteredCryptos.map((crypto) => (
              <TouchableOpacity
                key={crypto.id}
                onPress={() => handleTokenSelection(crypto)}
              >
                <Card style={styles.cryptoCard}>
                  <Card.Content style={styles.cryptoContent}>
                    <Image
                      source={{ uri: crypto.icon }}
                      width={30}
                      height={30}
                    />
                    <Text style={styles.cryptoName}>{crypto.name}</Text>
                    <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.decentAlt,
    borderRadius: 10,
    padding: 20,
  },
  searchBar: {
    marginBottom: 10,
  },
  cryptoList: {
    maxHeight: 300,
  },
  cryptoCard: {
    marginBottom: 10,
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
});
