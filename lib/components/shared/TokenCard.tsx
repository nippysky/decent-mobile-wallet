import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/lib/constants/colors";
import { NORMAL_TEXT, INFO_TEXT } from "@/lib/constants/font";
import { TokenCardProp } from "@/lib/constants/types";

export default function TokenCard({
  iconUri,
  tokenName,
  tokenSymbol,
  amount,
  onPress,
}: TokenCardProp) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.iconName}>
        <Image
          source={{
            uri: iconUri,
          }}
          width={40}
          height={40}
        />
        <View style={styles.tokenName}>
          <Text style={NORMAL_TEXT}>{tokenName}</Text>
          <Text style={INFO_TEXT}>{tokenSymbol}</Text>
        </View>
      </View>

      <Text style={NORMAL_TEXT}>{amount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.decentAlt,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 20,
  },
  iconName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  tokenName: {
    flexDirection: "column",
    gap: 7,
  },
});
