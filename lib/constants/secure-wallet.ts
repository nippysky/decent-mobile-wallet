import * as SecureStore from "expo-secure-store";

const WALLET_ADDRESS_KEY = "wallet_address";
const WALLET_PASSPHRASE = "wallet_passphrase";
const PIN_KEY = "wallet_pin";

// Function to securely save the PIN
export const savePin = async (pin: string) => {
  try {
    await SecureStore.setItemAsync(PIN_KEY, pin);
    console.log("PIN saved successfully");
  } catch (error) {
    console.error("Error saving PIN:", error);
  }
};

// //////////////////////////////////////////////////////////////////////////////////
// SAVE WALLET DATA
export const saveWalletData = async (address: string, passphrase: string) => {
  // Ensure all values are strings
  const addressStr = String(address);
  const passphraseStr = String(passphrase);

  try {
    await SecureStore.setItemAsync(WALLET_ADDRESS_KEY, addressStr);
    await SecureStore.setItemAsync(WALLET_PASSPHRASE, passphraseStr);
  } catch (error) {
    console.error("Error saving wallet data:", error);
  }
};

// ////////////////////////////////////////////////////////////////////////////////
// RETRIEVE WALLET DATA
export const getWalletData = async (): Promise<{
  address: string | null;
  passphrase: string | null;
}> => {
  try {
    const address = await SecureStore.getItemAsync(WALLET_ADDRESS_KEY);
    const passphrase = await SecureStore.getItemAsync(WALLET_PASSPHRASE);

    return { address, passphrase };
  } catch (error) {
    console.error("Error getting wallet data:", error);
    return { address: null, passphrase: null };
  }
};

// /////////////////////////////////////////////////////////////////////////////
// REMOVE WALLET DATA
export const removeWalletData = async () => {
  try {
    await SecureStore.deleteItemAsync(WALLET_ADDRESS_KEY);
    await SecureStore.deleteItemAsync(WALLET_PASSPHRASE);
  } catch (error) {
    console.error("Error removing passcode", error);
  }
};
