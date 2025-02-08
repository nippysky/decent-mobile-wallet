import DappActive from "@/assets/images/tab/DappActive";
import DappInactive from "@/assets/images/tab/DappInactive";
import WalletActive from "@/assets/images/tab/WalletActive";
import WalletInactive from "@/assets/images/tab/WalletInactive";
import { COLORS } from "@/lib/constants/colors";
import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.decentPrimary,
        headerShown: false,
        tabBarLabelStyle: { fontFamily: "PoppinsMedium" },
        tabBarIconStyle: {
          marginVertical: 5,
        },
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: 10,
          backgroundColor: COLORS.black,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: COLORS.decentPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ focused }) => {
            return (
              <View>{focused ? <WalletActive /> : <WalletInactive />}</View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="dapp"
        options={{
          title: "D-Apps",
          tabBarIcon: ({ focused }) => {
            return <View>{focused ? <DappActive /> : <DappInactive />}</View>;
          },
        }}
      />
    </Tabs>
  );
}
