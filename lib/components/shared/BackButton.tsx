import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/lib/constants/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ width: "20%" }}
        onPress={() => router.back()}
      >
        <FontAwesome6 name="arrow-left-long" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
