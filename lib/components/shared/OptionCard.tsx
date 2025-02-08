import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/lib/constants/colors";
import { NORMAL_TEXT } from "@/lib/constants/font";
import { AntDesign } from "@expo/vector-icons";
import { OptionCardType } from "@/lib/constants/types";

export default function OptionCard({ title, icon, onPress }: OptionCardType) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {icon}
        <Text style={[NORMAL_TEXT, { fontSize: 18 }]}>{title}</Text>
      </View>

      <AntDesign name="right" size={20} color={COLORS.decentAltText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.decentAltLight,
  },
});
