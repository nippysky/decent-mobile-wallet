import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeWalletData } from "./constants/secure-wallet";

const PASSCODE_KEY = "decent_user_passcode";

// FUNCTION TO FORMAT NUMBERS
export function formatNumberCustom(number: number) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return formattedNumber.replace(/,/g, ",").replace(/\./g, ".");
}

// FUNCTION TO SHORTEN WALLET ADDRESS
export function shortenAddress(address: string) {
  if (address.length < 10) {
    return address;
  }

  const start = address.slice(0, 4);
  const end = address.slice(-4);

  return `${start}...${end}`;
}

// FUNCTION TO SAVE USER PASSCODE
export const savePasscode = async (value: string) => {
  try {
    await SecureStore.setItemAsync(PASSCODE_KEY, value);
  } catch (error) {
    console.error("Error saving passcode", error);
  }
};

// FUNCTION TO GET USER PASSCODE
export const getPasscode = async (): Promise<string | null> => {
  try {
    let passcode = await SecureStore.getItemAsync(PASSCODE_KEY);
    return passcode;
  } catch (error) {
    console.error("Error getting passcode", error);
    return null;
  }
};

// FUNCTION TO REMOVE USER PASSCODE
export const removePasscode = async () => {
  try {
    await SecureStore.deleteItemAsync(PASSCODE_KEY);
  } catch (error) {
    console.error("Error removing passcode", error);
  }
};

// FUNCTION TO REMOVE ALL USER DATA

export const deleteUserData = async () => {
  await AsyncStorage.clear();
  removePasscode();
  removeWalletData();
};
