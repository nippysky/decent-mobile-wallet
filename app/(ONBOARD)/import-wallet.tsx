import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/lib/components/ScreenWrapper";
import { NORMAL_TEXT } from "@/lib/constants/font";

export default function ImportWallet() {
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, paddingVertical: 20 }}>
        <Text style={NORMAL_TEXT}>ImportWallet</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
